import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VerbalOptInScript = () => (
  <div className="min-h-screen flex flex-col section-light">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "hsl(var(--light-muted))" }}>
        StratixOS · SMS Compliance Documentation
      </p>
      <h1 className="text-3xl font-bold mb-2" style={{ color: "hsl(var(--light-fg))" }}>
        Verbal SMS Opt-In Consent Script
      </h1>
      <p className="text-sm mb-10" style={{ color: "hsl(var(--light-muted))" }}>
        Last updated: March 20, 2026 &nbsp;|&nbsp; Document version: 1.0
      </p>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: "hsl(var(--light-fg))" }}>

        <section>
          <h2 className="text-lg font-semibold mb-3">Overview</h2>
          <p>
            StratixOS provides AI-powered receptionist and scheduling services to service-based
            businesses. When a customer calls in to book or confirm an appointment, our AI
            receptionist verbally collects SMS consent before any text messages are sent. This page
            documents the exact script used, the consent flow, opt-out instructions, and how
            consent is recorded.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">How Verbal Opt-In Is Collected</h2>
          <p className="mb-4">
            Consent is collected during a live phone call handled by the StratixOS AI receptionist.
            The opt-in occurs only after the customer has scheduled or confirmed an appointment and
            before any SMS is sent.
          </p>

          <div className="rounded-xl border p-6 space-y-4" style={{ background: "hsl(var(--light-surface, 0 0% 96%))", borderColor: "hsl(var(--border))" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(var(--light-muted))" }}>
              Verbatim AI Script
            </p>

            <div className="flex gap-3">
              <span className="font-bold whitespace-nowrap" style={{ color: "hsl(var(--light-fg))" }}>AI:</span>
              <p style={{ color: "hsl(var(--light-fg))" }}>
                "Great, your appointment has been noted. Would you like to receive your confirmation
                and any appointment updates via SMS text message or email?"
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold whitespace-nowrap" style={{ color: "hsl(var(--light-muted))" }}>Customer:</span>
              <p style={{ color: "hsl(var(--light-muted))" }}><em>[Customer selects SMS / text message]</em></p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold whitespace-nowrap" style={{ color: "hsl(var(--light-fg))" }}>AI:</span>
              <p style={{ color: "hsl(var(--light-fg))" }}>
                "What's the best phone number to send that to?"
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold whitespace-nowrap" style={{ color: "hsl(var(--light-muted))" }}>Customer:</span>
              <p style={{ color: "hsl(var(--light-muted))" }}><em>[Customer provides their phone number]</em></p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold whitespace-nowrap" style={{ color: "hsl(var(--light-fg))" }}>AI:</span>
              <p style={{ color: "hsl(var(--light-fg))" }}>
                "Perfect. Just so you know, you'll only receive appointment-related messages — things
                like your confirmation, reminders, or any schedule changes. You can reply{" "}
                <strong>STOP</strong> at any time to stop receiving messages. Do you have any
                questions?"
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">What the Customer Is Consenting To</h2>
          <ul className="list-disc list-inside space-y-1 ml-2" style={{ color: "hsl(var(--light-muted))" }}>
            <li>Receiving SMS appointment confirmation messages</li>
            <li>Receiving SMS appointment reminder messages</li>
            <li>Receiving SMS messages about reschedules or cancellations related to their booking</li>
            <li><strong style={{ color: "hsl(var(--light-fg))" }}>Not</strong> marketing messages, promotions, or unrelated communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">How Consent Is Recorded</h2>
          <p className="mb-3">
            Every call handled by the StratixOS AI receptionist is logged. When a customer verbally
            agrees to SMS, the following data points are captured and stored:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2" style={{ color: "hsl(var(--light-muted))" }}>
            <li>Date and time of the call</li>
            <li>Phone number provided by the customer for SMS delivery</li>
            <li>Appointment details associated with the consent event</li>
            <li>A record indicating verbal SMS opt-in was obtained during the call</li>
          </ul>
          <p className="mt-3">
            These records are retained in the StratixOS platform and are available to the business
            operator for compliance review.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Opt-Out Instructions</h2>
          <p className="mb-3">
            Customers are informed of opt-out options verbally during the call and in every SMS
            message sent. To opt out at any time, a customer may:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2" style={{ color: "hsl(var(--light-muted))" }}>
            <li>Reply <strong style={{ color: "hsl(var(--light-fg))" }}>STOP</strong> to any SMS message to immediately unsubscribe</li>
            <li>Reply <strong style={{ color: "hsl(var(--light-fg))" }}>HELP</strong> to any SMS message for assistance</li>
            <li>Contact the business directly to request removal</li>
          </ul>
          <p className="mt-3">
            All STOP requests are processed immediately and no further messages will be sent to that number.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Confirmation Message</h2>
          <p className="mb-3">
            Immediately after verbal consent is collected, the customer receives a confirmation SMS:
          </p>
          <div className="rounded-xl border p-5 font-mono text-sm" style={{ background: "hsl(var(--light-surface, 0 0% 96%))", borderColor: "hsl(var(--border))", color: "hsl(var(--light-fg))" }}>
            Hey [Name], your appointment has been confirmed for [Date] at [Time]. You'll receive
            appointment updates at this number. Reply STOP to opt out at any time.
          </div>
        </section>

      </div>
    </main>
    <Footer />
  </div>
);

export default VerbalOptInScript;
