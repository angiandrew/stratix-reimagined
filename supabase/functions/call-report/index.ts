import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Only process call_analyzed events
    if (body.event !== "call_analyzed") {
      return new Response(
        JSON.stringify({ message: "Event ignored", event: body.event }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const call = body.call;
    if (!call?.agent_id) {
      return new Response(
        JSON.stringify({ error: "Missing agent_id (org_id) in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const org_id = call.agent_id;

    // Look up user by org_id
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

    // Calculate start_time
    let start_time: string | null = null;
    if (call.start_timestamp) {
      start_time = new Date(call.start_timestamp).toISOString();
    } else if (call.end_timestamp && call.duration_ms) {
      start_time = new Date(call.end_timestamp - call.duration_ms).toISOString();
    }

    const callRecord = {
      user_id: profile.id,
      org_id,
      assistant_name: call.agent_name || null,
      assistant_phone_number: isInbound ? call.to_number : call.from_number,
      customer_phone_number: isInbound ? call.from_number : call.to_number,
      transcript: call.transcript || null,
      call_type: call.call_type || null,
      ended_reason: call.disconnection_reason || null,
      start_time,
      duration_seconds: call.duration_ms ? Math.round(call.duration_ms / 1000) : null,
      cost_usd: call.call_cost?.combined_cost ?? null,
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
      JSON.stringify({ success: true, call_id: call.call_id }),
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
