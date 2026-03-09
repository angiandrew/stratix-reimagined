import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen flex flex-col section-light">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "hsl(var(--light-fg))" }}>
        Terms and Conditions — SMS Messaging
      </h1>
      <p className="text-sm mb-10" style={{ color: "hsl(var(--light-muted))" }}>
        Last updated: March 8, 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: "hsl(var(--light-fg))" }}>
        <section>
          <h2 className="text-lg font-semibold mb-3">Program Description</h2>
          <p>
            StratixOS LLC provides AI-powered appointment booking and confirmation services on behalf
            of its business clients. By interacting with one of our voice agents and booking an
            appointment, you may receive SMS messages related to your booking.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Message Frequency</h2>
          <p>
            You will receive one SMS confirmation per appointment booked. Additional reminder
            messages may be sent depending on the business you booked with.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Message and Data Rates</h2>
          <p>
            Message and data rates may apply depending on your mobile carrier and plan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">How to Get Help</h2>
          <p>
            Reply <strong>HELP</strong> to any message you receive from us for assistance, or
            contact us directly at{" "}
            <a
              href="mailto:contact@stratixos.com"
              className="text-[hsl(var(--primary))] hover:underline"
            >
              contact@stratixos.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">How to Opt Out</h2>
          <p>
            Reply <strong>STOP</strong> to any message you receive from us at any time to
            unsubscribe. You will receive one final confirmation that you have been unsubscribed.
            After that, no further messages will be sent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Eligibility</h2>
          <p>
            This service is intended for individuals who have initiated contact with one of our
            business clients by phone and have verbally consented to receive SMS communications
            related to their appointment.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Limitation of Liability</h2>
          <p>
            StratixOS LLC is not responsible for any delays in SMS delivery caused by third-party
            carriers or technical issues outside of our control.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Changes to These Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Changes will be posted at this
            URL with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <p>StratixOS LLC</p>
          <p>
            Email:{" "}
            <a
              href="mailto:contact@stratixos.com"
              className="text-[hsl(var(--primary))] hover:underline"
            >
              contact@stratixos.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://stratixos.com"
              className="text-[hsl(var(--primary))] hover:underline"
            >
              stratixos.com
            </a>
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
