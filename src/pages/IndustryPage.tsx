import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Plus, Minus, Star, Check } from "lucide-react";
import {
  SiSlack, SiGmail, SiHubspot, SiSalesforce, SiGooglecalendar,
  SiAirtable, SiZapier, SiTwilio, SiShopify, SiStripe,
  SiNotion, SiZoho, SiInstagram, SiDropbox, SiLinear,
} from "react-icons/si";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoiCalculatorSection from "@/components/RoiCalculatorSection";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Theme = {
  accent: string;       // e.g. "#92400e" — used for pill text, borders
  accentBg: string;     // e.g. "#fef3c7" — pill background
  heroDark: string;     // hero background
  statsBg: string;      // stats bar background
};

type PainPoint = { title: string; body: string };
type Feature   = { name: string; bullets: string[]; description: string };
type Testimonial = { quote: string; name: string; title: string; initials: string };
type FAQ = { q: string; a: string };
type Stat = { value: string; label: string };

type IndustryData = {
  label: string;
  headline: string;
  subheadline: string;
  theme: Theme;
  marqueeItems: string[];
  painPointsLabel: string;
  painPointsHeadline: string;
  painPoints: PainPoint[];
  featuresHeadline: string;
  featuresSub: string;
  features: Feature[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  ctaHeadline: string;
};

/* ─────────────────────────────────────────────
   Industry data
───────────────────────────────────────────── */
const DATA: Record<string, IndustryData> = {

  /* ── HOME SERVICES ── */
  "home-services": {
    label: "Home Services",
    headline: "Every call answered.\nEvery job booked.",
    subheadline: "StratixOS gives HVAC, plumbing, and electrical businesses an AI that works the phones 24/7 — qualifying leads, scheduling jobs, and following up so your technicians can stay on the tools.",
    theme: {
      accent: "#92400e",
      accentBg: "#fef3c7",
      heroDark: "#0d0a06",
      statsBg: "#111009",
    },
    marqueeItems: ["ServiceTitan", "Jobber", "Housecall Pro", "Angi", "HomeAdvisor", "Thumbtack", "FieldEdge", "mHelpDesk", "Service Fusion", "Dispatch"],
    painPointsLabel: "The Problem",
    painPointsHeadline: "What's costing you jobs right now",
    painPoints: [
      { title: "Missed calls after hours", body: "The average home service business misses 30% of inbound calls. Every missed call is a job going to your competitor." },
      { title: "Slow lead follow-up", body: "Web form leads go cold in minutes. The industry average follow-up time is 47 hours. Your competitors are closing jobs you never called back." },
      { title: "Dispatchers buried in admin", body: "Your best dispatchers spend hours a day doing intake, scheduling, and data entry instead of coordinating field operations." },
      { title: "No system for after-hours", body: "Homeowners need service at inconvenient times. Without automation, you lose every lead that comes in evenings and weekends." },
    ],
    featuresHeadline: "Built to fill your schedule without adding headcount",
    featuresSub: "Three AI systems that handle every stage of your customer lifecycle — so your team focuses on doing the work, not managing the phones.",
    features: [
      {
        name: "AI Voice Agent",
        bullets: ["Answers every call in under 500ms", "Qualifies job type, location, and urgency", "Books directly to your dispatch calendar"],
        description: "Your AI receptionist works 24/7 — no hold times, no missed calls. It sounds natural, captures every job detail, and books the appointment before the customer hangs up.",
      },
      {
        name: "Lead Capture & Follow-Up",
        bullets: ["Follows up on web forms in under 2 seconds", "Sends SMS + email sequences automatically", "Scores and prioritizes leads by job value"],
        description: "Every form submission, ad lead, and portal inquiry gets an immediate personalized response. High-value jobs get flagged. Everyone else goes into a nurture sequence.",
      },
      {
        name: "CRM & Dispatch Sync",
        bullets: ["Syncs with ServiceTitan, Jobber, and more", "Zero manual data entry ever", "Real-time calendar and pipeline updates"],
        description: "Your field software, CRM, and calendar stay in perfect sync automatically. Your dispatchers see accurate job data without touching a keyboard.",
      },
    ],
    stats: [
      { value: "85%", label: "of callers who hit voicemail never call back" },
      { value: "62%", label: "of customers hire whoever responds first" },
      { value: "391%", label: "more conversions when you respond in under 1 min" },
      { value: "$1,200+", label: "average revenue lost per missed service call" },
    ],
    testimonials: [
      { quote: "We booked 40% more appointments in the first month without hiring anyone. The AI handles everything we used to miss after hours.", name: "David Osei", title: "Owner, Premier HVAC Services", initials: "DO" },
      { quote: "Before StratixOS, we'd miss 30% of calls after 5pm. Now every call gets answered and booked automatically.", name: "Kevin Marsh", title: "GM, Reliable Plumbing Co.", initials: "KM" },
      { quote: "Implementation took less than a week. ROI was visible in the first 30 days.", name: "Tom Walsh", title: "VP Sales, Pinnacle Services", initials: "TW" },
      { quote: "Our dispatchers used to spend 4 hours a day on the phone. Now they manage exceptions while AI handles everything else.", name: "Maria Lopez", title: "Operations Lead, FastFix Electric", initials: "ML" },
      { quote: "The voice agent sounds completely natural. Customers can't tell it's AI — and our close rate actually went up.", name: "James Nguyen", title: "Founder, CoolAir HVAC", initials: "JN" },
      { quote: "Every web form lead now gets a call back in under 2 seconds. Our competitors take 47 hours on average.", name: "Sandra Hill", title: "CEO, HomePro Services", initials: "SH" },
    ],
    faqs: [
      { q: "Who is StratixOS built for in home services?", a: "StratixOS is built for HVAC, plumbing, electrical, roofing, and general home service businesses. If you're missing calls, losing leads to slow follow-up, or spending too many labor hours on scheduling — StratixOS was built for you." },
      { q: "What are the most common use cases?", a: "The biggest wins: AI voice agents that answer every call and book jobs, lead capture that follows up on web forms in under 2 seconds, and CRM sync that keeps your field software updated without manual entry." },
      { q: "How does StratixOS integrate with my existing software?", a: "StratixOS connects with ServiceTitan, Jobber, Housecall Pro, HubSpot, Google Calendar, and 100+ other platforms. Two-way sync keeps your CRM and dispatch calendar updated in real time." },
      { q: "How quickly can we go live?", a: "Most home service businesses are live within 3–5 business days. We handle setup, AI training, CRM integration, and testing before you go live." },
    ],
    ctaHeadline: "Stop leaving jobs on the table.",
  },

  /* ── FINANCIAL SERVICES ── */
  "financial-services": {
    label: "Financial Services",
    headline: "Speed to lead\nis everything.",
    subheadline: "StratixOS ensures every inbound inquiry from a prospective client — web, phone, or social — is responded to in seconds, qualified to your criteria, and routed to the right advisor automatically.",
    theme: {
      accent: "#1e3a8a",
      accentBg: "#eff6ff",
      heroDark: "#060912",
      statsBg: "#07091a",
    },
    marqueeItems: ["Salesforce", "HubSpot", "Redtail", "Wealthbox", "Riskalyze", "Orion", "Morningstar", "Envestnet", "Docupace", "SmartOffice"],
    painPointsLabel: "The Problem",
    painPointsHeadline: "Where high-value leads are slipping through",
    painPoints: [
      { title: "Leads go cold in minutes", body: "Studies show 78% of leads go to the first firm that responds. Advisors in client meetings miss this window every single day." },
      { title: "Unqualified calls waste advisor hours", body: "Advisors spend hours each week on prospects who don't meet minimum asset thresholds or aren't a fit — time that should go to existing clients." },
      { title: "Inconsistent follow-up", body: "Without an automated system, follow-up cadence depends on whoever has bandwidth. High-value prospects fall through the cracks." },
      { title: "CRM data is always stale", body: "Manual data entry means your pipeline never reflects reality. Decision-making is based on guesswork, not accurate data." },
    ],
    featuresHeadline: "Built to make every advisor hour count",
    featuresSub: "Three AI systems that handle intake, qualification, and pipeline management — so your advisors spend every hour on revenue-generating work.",
    features: [
      {
        name: "Instant Lead Response",
        bullets: ["Responds to every inquiry in under 2 seconds", "Works across web, phone, email, and social", "Captures lead intent and initial context automatically"],
        description: "Every inbound inquiry — regardless of channel or time of day — gets a personalized, on-brand response before your competitors even see the notification.",
      },
      {
        name: "AI Qualification Engine",
        bullets: ["Screens by AUM, income, and product interest", "Routes hot leads to the right advisor instantly", "Filters out unqualified prospects before they reach your team"],
        description: "Your qualification criteria become the AI's ruleset. Only warm, properly-screened prospects make it through — each one arriving with full context attached.",
      },
      {
        name: "Pipeline & CRM Automation",
        bullets: ["Every interaction logged automatically", "Long-term nurture for not-yet-ready prospects", "Real-time pipeline accuracy with zero manual entry"],
        description: "Your CRM reflects reality at all times. Prospects not ready today go into intelligent nurture sequences. You'll be top of mind when their situation changes.",
      },
    ],
    stats: [
      { value: "78%", label: "of leads go to the first firm that responds — HBR" },
      { value: "47 hrs", label: "average industry lead response time" },
      { value: "27%", label: "of inbound leads ever get contacted at all" },
      { value: "50%", label: "of sales go to the vendor who responds first" },
    ],
    testimonials: [
      { quote: "The ROI was immediate. Every lead is now followed up within seconds. We've seen a 3x increase in qualified bookings since going live.", name: "James Okafor", title: "Founder, Peak Financial Advisors", initials: "JO" },
      { quote: "We used to lose leads because advisors were in meetings. Now every inquiry is captured and qualified automatically.", name: "Patricia Moore", title: "Managing Partner, Summit Wealth", initials: "PM" },
      { quote: "The AI handles intake exactly the way we'd want a human to — it asks the right questions and routes leads correctly every time.", name: "Susan Lee", title: "Director of Client Services, Apex Capital", initials: "SL" },
      { quote: "Before StratixOS, our CRM was a mess. Now every lead interaction is logged automatically. Zero manual entry.", name: "Michael Tan", title: "COO, Heritage Financial Group", initials: "MT" },
      { quote: "Our advisors used to spend 2 hours a day on unqualified calls. Now those hours go to revenue-generating conversations.", name: "Rebecca Strand", title: "VP Growth, ClearPath Advisors", initials: "RS" },
      { quote: "Implementation took less than a week. ROI was visible in the first 30 days. I wish we'd done this two years ago.", name: "Tom Walsh", title: "VP Sales, Pinnacle Financial", initials: "TW" },
    ],
    faqs: [
      { q: "Who is StratixOS built for in financial services?", a: "StratixOS is built for financial advisors, RIAs, mortgage brokers, insurance agencies, and fintech companies. If speed to lead matters — and in financial services it always does — StratixOS was built for you." },
      { q: "What are the most common use cases?", a: "The biggest wins: instant lead response under 2 seconds, AI qualification that screens by AUM and product interest before connecting with an advisor, and automated follow-up for prospects who aren't ready yet." },
      { q: "How does StratixOS handle compliance requirements?", a: "Every interaction is logged and timestamped. StratixOS handles administrative intake and scheduling — not financial advice. We work with your compliance team to ensure all sequences meet your firm's requirements." },
      { q: "How quickly can we go live?", a: "Most financial services firms are live within 3–5 business days. We handle AI training, CRM integration, qualification criteria, and routing before you go live." },
    ],
    ctaHeadline: "Stop losing clients to the firm that picked up the phone first.",
  },

  /* ── HOSPITALITY ── */
  "hospitality": {
    label: "Hospitality",
    headline: "Automate the routine.\nElevate the guest experience.",
    subheadline: "StratixOS handles guest inquiries, booking confirmations, upsell sequences, and check-in coordination 24/7 — so your team is free to deliver exceptional hospitality where it counts.",
    theme: {
      accent: "#7c2d12",
      accentBg: "#fff7ed",
      heroDark: "#0d0805",
      statsBg: "#100906",
    },
    marqueeItems: ["Mews", "Guesty", "Cloudbeds", "Hostaway", "Lodgify", "Airbnb", "VRBO", "Opera PMS", "Apaleo", "Booking.com"],
    painPointsLabel: "The Problem",
    painPointsHeadline: "Where hospitality businesses lose revenue every day",
    painPoints: [
      { title: "Guest inquiries go unanswered overnight", body: "Most bookings are decided within the first response. Guests who don't hear back in minutes move on — to OTAs or your competitors." },
      { title: "Staff overwhelmed with repetitive questions", body: "Check-in times, parking, amenities, local recommendations. Your team answers the same questions hundreds of times a month instead of delivering real hospitality." },
      { title: "Missed upsell opportunities", body: "Room upgrades, dining reservations, spa packages — the window to upsell is narrow and happens before arrival. Manual outreach misses most of it." },
      { title: "No systematic post-stay follow-up", body: "Review requests, rebooking offers, and loyalty outreach require consistency. Without automation, most guests leave and are never contacted again." },
    ],
    featuresHeadline: "Built to maximize every guest interaction",
    featuresSub: "Three AI systems that handle every touchpoint in the guest journey — from first inquiry to post-stay review — without adding to your labor bill.",
    features: [
      {
        name: "24/7 Guest Communication AI",
        bullets: ["Answers inquiries across SMS, email, and chat instantly", "Handles check-in instructions, FAQs, and local recs automatically", "Escalates genuine service issues to your team immediately"],
        description: "Your AI guest services agent knows your property inside and out. It answers every question instantly, 24/7 — and only escalates when a human touch is genuinely needed.",
      },
      {
        name: "Booking & Confirmation Automation",
        bullets: ["Instant booking confirmations with property details", "Pre-arrival sequences with upsell opportunities", "Check-in reminders, parking info, and arrival instructions"],
        description: "Every guest gets a seamless pre-arrival experience. Confirmations go out immediately, upsell offers hit at the right moment, and check-in logistics are handled automatically.",
      },
      {
        name: "Post-Stay Revenue Sequences",
        bullets: ["Automated review requests sent at peak response windows", "Rebooking offers for direct channel conversions", "Loyalty program enrollment and follow-up sequences"],
        description: "The relationship doesn't end at checkout. Automated post-stay sequences drive reviews, direct rebookings, and long-term guest loyalty — without your team lifting a finger.",
      },
    ],
    stats: [
      { value: "7×", label: "more bookings when responding in under 1 hour vs 2+" },
      { value: "68%", label: "of guests won't rebook after poor communication" },
      { value: "23%", label: "average ADR lift from pre-arrival upsell automation" },
      { value: "$18K+", label: "annual revenue lost per property from slow guest comms" },
    ],
    testimonials: [
      { quote: "Our long-term mission is that if you're not on the property or interacting with a guest, you're AI. StratixOS made that real.", name: "Ryan Caldwell", title: "Revenue Director, Cascadia Stays", initials: "RC" },
      { quote: "We handle 3x the guest inquiries we did before without adding a single staff member.", name: "Aidan Cole", title: "GM, Blue Gems Properties", initials: "AC" },
      { quote: "The upsell automation alone added $8,000 in monthly revenue. Room upgrades and dining packages sell themselves now.", name: "Megan Torres", title: "Owner, Haven Lux Rentals", initials: "MT" },
      { quote: "What StratixOS built is exactly what hospitality needed. Guests get instant responses, staff get their time back.", name: "Nick Curtis", title: "Founder, Bacobay Collection", initials: "NC" },
      { quote: "Post-stay review requests run automatically. Our average rating went from 4.2 to 4.8 in three months.", name: "Jordan Flynn", title: "Co-Founder, Renjoy Stays", initials: "JF" },
      { quote: "Our team now focuses on high-value guest interactions. Everything repetitive is handled by StratixOS.", name: "Charles Webb", title: "Director of Ops, Moxxi Properties", initials: "CW" },
    ],
    faqs: [
      { q: "Who is StratixOS built for in hospitality?", a: "StratixOS is built for hotels, boutique properties, short-term rental operators, and vacation rental management companies. If you're handling high volumes of guest communication across multiple channels and properties — StratixOS was built for you." },
      { q: "What are the most common use cases?", a: "The biggest wins: 24/7 AI guest communication across SMS, email and chat, pre-arrival upsell sequences for upgrades and packages, and automated post-stay review requests and rebooking offers." },
      { q: "How does StratixOS integrate with my PMS?", a: "StratixOS connects with Mews, Guesty, Cloudbeds, Hostaway, Opera PMS, and 100+ other platforms. Guest data and booking details sync automatically — no manual entry required." },
      { q: "How quickly can we go live?", a: "Most hospitality operators are live within 3–5 business days. We train the AI on your property details, house rules, FAQs, and upsell inventory before launch." },
    ],
    ctaHeadline: "Every guest deserves an instant response.",
  },

  /* ── GOLF COURSES ── */
  "golf-courses": {
    label: "Golf Courses",
    headline: "Fill your tee sheet.\nAutomate your club.",
    subheadline: "StratixOS gives golf courses and country clubs an AI that handles tee time inquiries, membership questions, event bookings, and member communication — 24/7, without adding staff.",
    theme: {
      accent: "#14532d",
      accentBg: "#f0fdf4",
      heroDark: "#040d06",
      statsBg: "#050f07",
    },
    marqueeItems: ["Lightspeed Golf", "Club Prophet", "GolfNow", "Jonas Club", "Foreup", "EZLinks", "Club Caddie", "MembersFirst", "Jonas Software", "Supreme Golf"],
    painPointsLabel: "The Problem",
    painPointsHeadline: "Where golf courses lose revenue every season",
    painPoints: [
      { title: "Tee sheet gaps cost thousands per week", body: "Empty tee times that could have been filled with a faster follow-up or an automated last-minute offer represent pure lost revenue." },
      { title: "Staff buried in repetitive member calls", body: "Pro shop staff spend hours fielding the same questions about tee times, events, lesson availability, and dress codes instead of serving members on-site." },
      { title: "Membership inquiries go uncontacted", body: "Prospective members who reach out after hours or on weekends rarely hear back before they've joined a competitor club." },
      { title: "Event and tournament coordination is manual", body: "Corporate outings, tournaments, and member-guest events require enormous coordination. Most of it still happens through email chains and spreadsheets." },
    ],
    featuresHeadline: "Built to maximize revenue from every tee time",
    featuresSub: "Three AI systems that fill your tee sheet, handle member communication, and automate event bookings — so your staff stays focused on the course experience.",
    features: [
      {
        name: "Tee Time & Booking AI",
        bullets: ["Handles tee time inquiries and bookings 24/7", "Sends automated last-minute tee time offers to fill gaps", "Integrates with your tee sheet software directly"],
        description: "Never leave a tee time empty. Your AI handles inquiries, confirms bookings, and automatically promotes available slots to members and guests when your sheet has gaps.",
      },
      {
        name: "Member Communication Automation",
        bullets: ["Instant responses to membership inquiries", "Automated event reminders and tournament updates", "Pro shop and lesson scheduling without staff involvement"],
        description: "Every member and prospective member gets an immediate, personalized response. Routine questions, event communications, and lesson bookings are handled automatically.",
      },
      {
        name: "Event & Outing Management",
        bullets: ["Corporate outing inquiry capture and follow-up", "Automated tournament coordination sequences", "Post-event surveys and rebooking offers"],
        description: "Corporate outings and tournaments are high-revenue opportunities. Your AI captures every inquiry, handles follow-up, and coordinates logistics without adding to your event staff's workload.",
      },
    ],
    stats: [
      { value: "35%", label: "of tee times sit empty on an average weekday" },
      { value: "$50K+", label: "annual revenue lost to unfilled tee times per course" },
      { value: "72%", label: "of members cite poor communication as their top frustration" },
      { value: "1 in 3", label: "corporate outing inquiries never receive a response" },
    ],
    testimonials: [
      { quote: "We stopped having empty tee times on weekday mornings. The automated last-minute offers fill gaps we never could have manually.", name: "Brad Morrison", title: "GM, Fairway National Golf Club", initials: "BM" },
      { quote: "Membership inquiries used to sit in an inbox over the weekend. Now every prospect hears from us in seconds.", name: "Carol Stevens", title: "Membership Director, Pinecrest Country Club", initials: "CS" },
      { quote: "Our pro shop staff went from fielding 80 calls a day to focusing on member experience. Revenue per staff member went up 40%.", name: "Derek Han", title: "Head Pro, Highlands Golf Course", initials: "DH" },
      { quote: "Corporate outing bookings doubled. Every inquiry now gets followed up immediately with a full proposal and pricing.", name: "Lisa Grant", title: "Events Director, Summit Links", initials: "LG" },
      { quote: "The tournament automation is incredible. Registration, reminders, pairings, results — all automated. My team used to spend weeks on this.", name: "Patrick Quinn", title: "Tournament Coordinator, Lakeside CC", initials: "PQ" },
      { quote: "StratixOS paid for itself in the first week just from the tee times it filled that would have otherwise sat empty.", name: "Mike Harrington", title: "Owner, Green Valley Golf", initials: "MH" },
    ],
    faqs: [
      { q: "Who is StratixOS built for in golf?", a: "StratixOS is built for public golf courses, private clubs, country clubs, and resort golf operations that want to fill more tee times, automate member communication, and convert more corporate outing inquiries without adding staff." },
      { q: "What are the most common use cases for golf courses?", a: "The biggest wins: last-minute tee time promotions that fill gaps automatically, instant responses to membership and corporate outing inquiries, and automated event coordination for tournaments and outings." },
      { q: "How does StratixOS integrate with my tee sheet and club software?", a: "StratixOS connects with Foreup, EZLinks, Club Caddie, Jonas Club, Lightspeed Golf, and other tee sheet and club management platforms. Bookings, member data, and calendar availability sync automatically." },
      { q: "How quickly can we go live?", a: "Most golf courses are live within 3–5 business days. We train the AI on your course details, pricing, membership tiers, event offerings, and club rules before launch." },
    ],
    ctaHeadline: "Stop leaving tee times and memberships on the table.",
  },

  /* ── HEALTHCARE ── */
  "healthcare": {
    label: "Healthcare & Med Spas",
    headline: "Your front desk,\nworking 24/7.",
    subheadline: "StratixOS handles appointment scheduling, patient qualification, and follow-up sequences automatically — so your clinical staff focuses entirely on patient care.",
    theme: {
      accent: "#831843",
      accentBg: "#fdf2f8",
      heroDark: "#0c0508",
      statsBg: "#0f0609",
    },
    marqueeItems: ["Jane App", "Mindbody", "Vagaro", "Aesthetic Record", "Nextech", "Athenahealth", "Weave", "PatientPop", "Boulevard", "Zenoti"],
    painPointsLabel: "The Problem",
    painPointsHeadline: "What's preventing your practice from growing",
    painPoints: [
      { title: "Front desk can't handle call volume", body: "Patients are put on hold or sent to voicemail during peak hours. Every missed call is a potential patient lost to a practice that picked up." },
      { title: "No-shows drain revenue and capacity", body: "The average practice loses 5–8% of revenue to no-shows. Without automated confirmations and reminders, that number only grows." },
      { title: "Ad leads never get called back promptly", body: "Patients who inquire about elective treatments decide within minutes. A slow follow-up means they've already booked with someone else." },
      { title: "Rebooking and reviews happen inconsistently", body: "Post-appointment follow-up, review requests, and rebooking offers depend on whoever has time. Most patients leave and are never re-engaged." },
    ],
    featuresHeadline: "Built to grow your practice without growing your staff",
    featuresSub: "Three AI systems that handle patient communication from the first inquiry through post-visit follow-up — freeing your team for the work that requires their training.",
    features: [
      {
        name: "AI Appointment Scheduling",
        bullets: ["Answers inbound calls and web inquiries 24/7", "Qualifies patients and books directly to your calendar", "Handles reschedules and cancellations automatically"],
        description: "Every patient inquiry gets handled immediately — regardless of when they reach out. Qualification, booking, and calendar management happen without front desk involvement.",
      },
      {
        name: "No-Show Prevention System",
        bullets: ["Multi-channel confirmation sequences via SMS and email", "Automated reminders at 48h, 24h, and day-of", "Easy reschedule links that fill the slot automatically"],
        description: "Dramatically reduce the no-shows that drain your revenue and block your schedule. Automated sequences keep patients informed and engaged from booking to appointment.",
      },
      {
        name: "Post-Visit Revenue Sequences",
        bullets: ["Review requests sent at peak response windows", "Post-care instructions delivered automatically", "Rebooking offers and package upsells on autopilot"],
        description: "The patient relationship continues after checkout. Reviews are requested at the right moment, care instructions are delivered automatically, and rebooking offers convert at scale.",
      },
    ],
    stats: [
      { value: "$150B", label: "lost annually to no-shows in US healthcare" },
      { value: "5–8%", label: "of practice revenue lost to no-shows every month" },
      { value: "44%", label: "of patients choose providers based on booking speed" },
      { value: "67%", label: "of patients prefer booking without calling the front desk" },
    ],
    testimonials: [
      { quote: "The voice agent sounds completely natural. Patients can't tell it's AI — and our booking accuracy actually improved.", name: "Lisa Hernandez", title: "CEO, MedSpa Collective", initials: "LH" },
      { quote: "We reduced no-shows by 60% in the first 30 days just from automated confirmations and reminders.", name: "Dr. Alyssa Grant", title: "Founder, Revive Aesthetics", initials: "AG" },
      { quote: "Our front desk was drowning in calls. Now they handle exceptions while StratixOS manages everything routine.", name: "Marcus Webb", title: "Practice Manager, Elite Dermatology", initials: "MW" },
      { quote: "We booked 40% more appointments monthly without adding staff. StratixOS paid for itself in the first week.", name: "Tanya Rhodes", title: "Owner, Glow Med Spa", initials: "TR" },
      { quote: "Patients actually prefer the AI for booking — it's faster, available at midnight, and never puts them on hold.", name: "Dr. Kevin Liu", title: "Director, ClearSkin Clinic", initials: "KL" },
      { quote: "Our Google rating went from 4.1 to 4.8 in two months just from the automated post-visit review requests.", name: "Carla Nguyen", title: "COO, Prestige Wellness", initials: "CN" },
    ],
    faqs: [
      { q: "Who is StratixOS built for in healthcare and med spas?", a: "StratixOS is built for medical practices, med spas, dental offices, chiropractic clinics, and wellness businesses that want to automate patient scheduling, reduce no-shows, and follow up with leads without adding front desk staff." },
      { q: "What are the most common use cases?", a: "The biggest wins: 24/7 AI scheduling for inbound calls and web inquiries, automated no-show prevention via multi-channel reminders, and post-visit review and rebooking sequences." },
      { q: "How does StratixOS handle patient data privacy?", a: "StratixOS uses enterprise-grade encryption (AES-256 at rest, TLS 1.3 in transit). Patient data is fully isolated within your account. We work with your team to ensure all automations meet your compliance requirements." },
      { q: "How quickly can we go live?", a: "Most practices are live within 3–5 business days. We handle AI training, practice management integration, appointment routing, and testing before go-live." },
    ],
    ctaHeadline: "Your patients deserve an immediate response.",
  },

  /* ── REAL ESTATE ── */
  "real-estate": {
    label: "Real Estate",
    headline: "From first inquiry\nto closed deal.",
    subheadline: "StratixOS gives real estate agents and property managers an AI that captures every lead, qualifies buyer and tenant intent, and schedules showings automatically — so your team focuses on closings, not phones.",
    theme: {
      accent: "#1e3a5f",
      accentBg: "#f0f4ff",
      heroDark: "#040810",
      statsBg: "#060a14",
    },
    marqueeItems: ["Zillow", "Realtor.com", "Follow Up Boss", "Chime", "BoomTown", "kvCORE", "LionDesk", "Buildium", "AppFolio", "Yardi"],
    painPointsLabel: "The Problem",
    painPointsHeadline: "Where real estate professionals lose deals every week",
    painPoints: [
      { title: "Portal leads go cold in minutes", body: "Zillow and Realtor.com leads have a contact window measured in minutes, not hours. Agents in showings miss that window constantly." },
      { title: "Agents spend hours on unqualified prospects", body: "Tire-kickers and window shoppers consume the same agent time as serious buyers. Without automated qualification, it's impossible to tell them apart." },
      { title: "Showing scheduling is a back-and-forth nightmare", body: "Coordinating availability between buyers, sellers, and agents through text and email wastes hours every week and creates scheduling errors." },
      { title: "Property managers buried in maintenance and tenant requests", body: "Maintenance requests, lease renewal questions, and tenant inquiries pile up during peak hours and after hours — overwhelming property management staff." },
    ],
    featuresHeadline: "Built for agents and property managers who scale without adding headcount",
    featuresSub: "Three AI systems covering the full real estate lifecycle — lead capture to signed lease — for both sales agents and property management operations.",
    features: [
      {
        name: "Lead Capture & Qualification",
        bullets: ["Instant response to Zillow, portal, and ad leads", "Qualifies buyer timeline, budget, and motivation", "Routes serious prospects to agents with full context"],
        description: "Every lead from every portal and ad gets an immediate, personalized response. Your AI qualifies intent and surfaces serious buyers — so agents make contact knowing exactly what they're walking into.",
      },
      {
        name: "Automated Showing Scheduler",
        bullets: ["Prospects self-book showings to your calendar", "Automated confirmations and reminders", "Smart rescheduling that fills cancelled slots"],
        description: "The scheduling back-and-forth disappears. Qualified buyers book directly into your showing calendar. Confirmations and reminders run automatically, and cancellations are rerouted instantly.",
      },
      {
        name: "Tenant & Property Management AI",
        bullets: ["Handles maintenance requests and routing 24/7", "Automates lease renewal outreach and follow-up", "Answers tenant questions without staff involvement"],
        description: "Property managers get their time back. Maintenance is captured, triaged, and routed automatically. Lease renewals are handled proactively. Tenant inquiries are answered instantly, around the clock.",
      },
    ],
    stats: [
      { value: "44%", label: "of Zillow leads never receive any response" },
      { value: "21×", label: "more likely to qualify a lead if you respond within 5 min" },
      { value: "15 hrs", label: "average time agents spend on admin work every week" },
      { value: "25%", label: "less tenant turnover with automated maintenance response" },
    ],
    testimonials: [
      { quote: "We stopped losing Zillow leads to competitors because our response time is now under 2 seconds, day or night.", name: "Rachel Kim", title: "Founder, Elite Realty Partners", initials: "RK" },
      { quote: "Our agents went from spending 3 hours on admin to focusing entirely on showings and closings. Pipeline doubled in 60 days.", name: "Angela Torres", title: "Broker-Owner, Horizon Real Estate", initials: "AT" },
      { quote: "Within 30 days, StratixOS was handling over 80% of our inbound inquiries and booking showings automatically.", name: "Sarah Chen", title: "Director of Ops, Premier Realty Group", initials: "SC" },
      { quote: "The qualification AI surfaces serious buyers and filters out tire-kickers. Our agents only touch prospects worth their time.", name: "Marcus Reid", title: "CEO, ReliableHomes Co.", initials: "MR" },
      { quote: "Property management used to feel like firefighting. Now maintenance requests are triaged, tenant questions are answered, and renewals go out automatically.", name: "Daniel Park", title: "Portfolio Manager, Urban Living Properties", initials: "DP" },
      { quote: "Lease renewal automation alone added 18% to our retention rate. That's millions in AUM we would have lost.", name: "Brittany Owens", title: "VP Operations, SkyView Properties", initials: "BO" },
    ],
    faqs: [
      { q: "Who is StratixOS built for in real estate?", a: "StratixOS is built for individual agents, teams, brokerages, and property management companies. Whether your challenge is converting portal leads faster or automating tenant communication at scale — StratixOS has purpose-built workflows for both." },
      { q: "What are the most common use cases for agents vs. property managers?", a: "For agents: instant lead response and qualification from Zillow and portals, automated showing scheduling, and pipeline management. For property managers: maintenance request triaging, tenant inquiry handling, and lease renewal automation." },
      { q: "How does StratixOS integrate with my CRM and listing tools?", a: "StratixOS connects with Follow Up Boss, Chime, BoomTown, kvCORE, LionDesk, Buildium, AppFolio, Yardi, and all major real estate CRMs. Leads and interactions are logged automatically." },
      { q: "How quickly can we go live?", a: "Most real estate teams and property management companies are live within 3–5 business days. We handle AI training, CRM integration, qualification criteria, and routing rules before go-live." },
    ],
    ctaHeadline: "Stop losing deals to the agent who responded first.",
  },
};

/* ─────────────────────────────────────────────
   Integration logos
───────────────────────────────────────────── */
const LOGOS = [
  { Icon: SiSlack,          color: "#4A154B", name: "Slack" },
  { Icon: SiGmail,          color: "#EA4335", name: "Gmail" },
  { Icon: SiSalesforce,     color: "#00A1E0", name: "Salesforce" },
  { Icon: SiHubspot,        color: "#FF7A59", name: "HubSpot" },
  { Icon: SiStripe,         color: "#635BFF", name: "Stripe" },
  { Icon: SiNotion,         color: "#374151", name: "Notion" },
  { Icon: SiGooglecalendar, color: "#4285F4", name: "Google Cal" },
  { Icon: SiAirtable,       color: "#18BFFF", name: "Airtable" },
  { Icon: SiZapier,         color: "#FF4A00", name: "Zapier" },
  { Icon: SiShopify,        color: "#96BF48", name: "Shopify" },
  { Icon: SiZoho,           color: "#E42527", name: "Zoho" },
  { Icon: SiDropbox,        color: "#0061FF", name: "Dropbox" },
  { Icon: SiInstagram,      color: "#C13584", name: "Instagram" },
  { Icon: SiLinear,         color: "#5E6AD2", name: "Linear" },
  { Icon: SiTwilio,         color: "#F22F46", name: "Twilio" },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12} fill="#0f172a" stroke="none" />
    ))}
  </div>
);

const FAQItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => (
  <div className="border-b cursor-pointer" style={{ borderColor: "#e5e7eb" }} onClick={onToggle}>
    <div className="flex items-center justify-between py-5 gap-4">
      <span className="text-base font-semibold text-left" style={{ color: "#0f172a" }}>{q}</span>
      <div className="shrink-0 text-gray-400">{open ? <Minus size={15} /> : <Plus size={15} />}</div>
    </div>
    {open && <div className="pb-6"><p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{a}</p></div>}
  </div>
);

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? DATA[slug] : null;
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-40 text-center px-6">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>Page Not Found</h1>
          <Link to="/" className="underline" style={{ color: "#6366f1" }}>Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { theme } = data;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ── HERO (dark) ── */}
      <section
        className="relative pt-36 pb-28 px-6 text-center overflow-hidden"
        style={{ backgroundColor: theme.heroDark }}
      >
        {/* Subtle radial glow behind headline */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 60%, ${theme.accent}22 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Industry label */}
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-8"
            style={{ backgroundColor: `${theme.accent}28`, color: theme.accent, border: `1px solid ${theme.accent}40` }}
          >
            {data.label}
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-white whitespace-pre-line"
          >
            {data.headline}
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-12" style={{ color: "#94a3b8" }}>
            {data.subheadline}
          </p>

          {/* Email CTA */}
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto"
            onSubmit={e => { e.preventDefault(); window.location.href = "/book-demo"; }}
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 w-full rounded-xl px-5 py-3.5 text-sm outline-none transition-all"
              style={{ backgroundColor: "#ffffff0f", border: "1px solid #ffffff18", color: "#fff" }}
            />
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme.accent }}
            >
              See StratixOS in action <ArrowRight size={14} />
            </Link>
          </form>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-8 border-b overflow-hidden bg-white" style={{ borderColor: "#f1f5f9" }}>
        <p className="text-center text-[10px] font-semibold uppercase tracking-widest mb-5" style={{ color: "#94a3b8" }}>
          500+ businesses automate with StratixOS
        </p>
        <div className="relative flex overflow-hidden">
          {[0, 1].map(set => (
            <div
              key={set}
              className="flex gap-12 items-center shrink-0 pr-12"
              style={{ animation: "marqueeScroll 24s linear infinite" }}
            >
              {data.marqueeItems.map(item => (
                <span key={item} className="text-sm font-semibold whitespace-nowrap" style={{ color: "#cbd5e1" }}>
                  {item}
                </span>
              ))}
            </div>
          ))}
          <style>{`@keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-100%)} }`}</style>
        </div>
      </section>

      {/* ── PAIN POINTS (off-white) ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#fafafa" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>
              {data.painPointsLabel}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
              {data.painPointsHeadline}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.painPoints.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-2xl p-7"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8edf3",
                  borderLeft: `3px solid ${theme.accent}`,
                }}
              >
                <h3 className="text-base font-bold mb-2" style={{ color: "#0f172a" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (white) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0f172a" }}>
              {data.featuresHeadline}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">{data.featuresSub}</p>
          </div>

          <div className="flex flex-col gap-5">
            {data.features.map(({ name, bullets, description }, idx) => (
              <div
                key={name}
                className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 sm:gap-16"
                style={{
                  backgroundColor: idx % 2 === 0 ? "#fafafa" : "#ffffff",
                  border: "1px solid #e8edf3",
                }}
              >
                {/* Left: number + name + description */}
                <div className="sm:w-1/2">
                  <div
                    className="text-5xl font-black mb-4 leading-none select-none"
                    style={{ color: `${theme.accent}18` }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>{name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{description}</p>
                </div>
                {/* Right: bullet list */}
                <div className="sm:w-1/2 flex flex-col justify-center gap-3">
                  {bullets.map(b => (
                    <div key={b} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${theme.accent}14` }}
                      >
                        <Check size={11} style={{ color: theme.accent }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#374151" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS (dark) ── */}
      <section className="py-20 px-6" style={{ backgroundColor: theme.statsBg }}>
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {data.stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-4xl font-bold text-white mb-2">{value}</div>
              <div className="text-sm" style={{ color: "#64748b" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS (white) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0f172a" }}>
              Don't just take our word for it.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Straight from the teams who rely on StratixOS to run their customer journey end-to-end.
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {data.testimonials.map(({ quote, name, title, initials }) => (
              <div
                key={name}
                className="break-inside-avoid rounded-2xl border p-6"
                style={{ borderColor: "#e8edf3" }}
              >
                <Stars />
                <p className="text-sm leading-relaxed text-gray-700 mb-5">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS (off-white) ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#fafafa" }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight" style={{ color: "#0f172a" }}>
            Integrates with your entire tech stack
          </h2>
          <p className="text-gray-500 mb-12 max-w-lg mx-auto text-sm">
            Connect your CRM, calendar, communication tools, and more. Enterprise-grade security included.
          </p>
          <div className="grid grid-cols-5 gap-4">
            {LOGOS.map(({ Icon, color, name }) => (
              <div
                key={name}
                className="rounded-xl border bg-white flex flex-col items-center gap-2 py-4 px-2 transition-shadow hover:shadow-sm"
                style={{ borderColor: "#e8edf3" }}
              >
                <Icon size={22} style={{ color }} />
                <span className="text-[11px] font-medium text-gray-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <RoiCalculatorSection />

      {/* ── FAQ (white) ── */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: "#0f172a" }}>
              Frequently asked questions
            </h2>
            <p className="text-gray-500 text-sm">Everything you need to know before getting started.</p>
          </div>
          <div className="rounded-2xl bg-white border overflow-hidden px-6" style={{ borderColor: "#e5e7eb" }}>
            {data.faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
      <section className="py-24 px-6" style={{ backgroundColor: theme.heroDark }}>
        <div
          className="relative mx-auto max-w-3xl text-center rounded-3xl px-8 py-16 overflow-hidden"
          style={{ border: `1px solid ${theme.accent}30` }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${theme.accent}18 0%, transparent 70%)` }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {data.ctaHeadline}
            </h2>
            <p className="text-base mb-10" style={{ color: "#64748b" }}>
              Book a 30-minute demo and see exactly how StratixOS works for {data.label.toLowerCase()} businesses.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.accent }}
              >
                Book a Demo <ArrowRight size={14} />
              </Link>
              <Link
                to="/roi-calculator"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors"
                style={{ border: `1px solid ${theme.accent}35`, color: "#64748b" }}
              >
                Calculate your ROI
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryPage;
