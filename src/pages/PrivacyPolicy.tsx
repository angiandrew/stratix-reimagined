import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col section-light">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "hsl(var(--light-fg))" }}>
        Privacy Policy
      </h1>
      <p className="text-sm mb-10" style={{ color: "hsl(var(--light-muted))" }}>
        Last updated: March 8, 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: "hsl(var(--light-fg))" }}>
        <p>
          StratixOS LLC ("we," "us," or "our") operates an AI-powered appointment booking service.
          This Privacy Policy explains how we collect, use, and protect your information when you
          interact with our voice agents and receive SMS communications from us.
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-3">Information We Collect</h2>
          <p className="mb-2">
            When you call one of our business clients and book an appointment, we may collect the
            following information:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2" style={{ color: "hsl(var(--light-muted))" }}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Appointment details (date, time, service type)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">How We Use Your Information</h2>
          <p className="mb-2">We use the information collected solely to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mb-3" style={{ color: "hsl(var(--light-muted))" }}>
            <li>Confirm your appointment via SMS</li>
            <li>Send appointment reminders</li>
            <li>Maintain records for the business you booked with</li>
          </ul>
          <p>
            We do not use your information for marketing purposes. We do not sell, trade, share, or
            transfer your personal information to any third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">SMS Communications</h2>
          <p>
            By verbally consenting during a phone call with one of our agents, you agree to receive
            one or more SMS messages related to your appointment. Message and data rates may apply.
            You can opt out at any time by replying <strong>STOP</strong> to any message you receive
            from us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Data Retention</h2>
          <p>
            Your information is retained only as long as necessary to fulfill the appointment and is
            not stored beyond that purpose without your consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Third-Party Services</h2>
          <p>
            We use industry-standard third-party platforms (including Twilio for SMS delivery) to
            operate our service. These platforms are bound by their own privacy policies and do not
            have permission to use your data for any purpose other than delivering our service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal
            information at any time by contacting us at the information below.
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

        <section>
          <h2 className="text-lg font-semibold mb-3">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be posted at this URL with
            an updated effective date.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
