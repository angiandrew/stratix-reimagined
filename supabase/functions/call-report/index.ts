import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function detectAppointment(transcript: string): Promise<boolean> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY || !transcript || transcript.length < 20) return false;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: "You are a classifier. Given a phone call transcript, determine if an appointment, meeting, or calendar booking was confirmed during the call. Respond with ONLY 'yes' or 'no'.",
          },
          { role: "user", content: transcript },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "classify_appointment",
              description: "Classify whether an appointment was booked",
              parameters: {
                type: "object",
                properties: {
                  booked: { type: "boolean", description: "true if an appointment was confirmed" },
                },
                required: ["booked"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "classify_appointment" } },
      }),
    });

    if (!response.ok) return false;
    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const args = JSON.parse(toolCall.function.arguments);
      return args.booked === true;
    }
    return false;
  } catch (e) {
    console.error("Appointment detection error:", e);
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    if (body.event !== "call_analyzed") {
      return new Response(
        JSON.stringify({ message: "Event ignored", event: body.event }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const call = body.call;
    if (!call?.agent_id) {
      return new Response(
        JSON.stringify({ error: "Missing agent_id in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const org_id = call.agent_id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("org_id", org_id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile lookup error:", profileError);
      return new Response(
        JSON.stringify({ error: "Database error looking up user" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "No user found with org_id: " + org_id }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isInbound = call.direction === "inbound";

    let start_time: string | null = null;
    if (call.start_timestamp) {
      start_time = new Date(call.start_timestamp).toISOString();
    } else if (call.end_timestamp && call.duration_ms) {
      start_time = new Date(call.end_timestamp - call.duration_ms).toISOString();
    }

    // Deduplicate
    const { data: existing } = await supabase
      .from("calls")
      .select("call_id")
      .eq("org_id", org_id)
      .eq("start_time", start_time)
      .eq("duration_seconds", call.duration_ms ? Math.round(call.duration_ms / 1000) : 0)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ success: true, message: "Duplicate call, skipped" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract sentiment from Retell's call_analysis
    const sentiment = call.call_analysis?.user_sentiment || null;

    // Detect appointment from transcript
    const transcript = call.transcript || null;
    const appointmentBooked = await detectAppointment(transcript || "");

    const callRecord = {
      user_id: profile.id,
      org_id,
      assistant_name: call.agent_name || null,
      assistant_phone_number: isInbound ? call.to_number : call.from_number,
      customer_phone_number: isInbound ? call.from_number : call.to_number,
      transcript,
      call_type: call.call_type || null,
      ended_reason: call.disconnection_reason || null,
      start_time,
      duration_seconds: call.duration_ms ? Math.round(call.duration_ms / 1000) : null,
      cost_usd: call.call_cost?.combined_cost ?? null,
      user_sentiment: sentiment,
      appointment_booked: appointmentBooked,
    };

    const { error: insertError } = await supabase.from("calls").insert(callRecord);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to insert call record" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, call_id: call.call_id, sentiment, appointmentBooked }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
