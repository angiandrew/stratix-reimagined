

## Overview

Two changes to the site:

1. **Tone down the stat cards** in the Popular Agents section -- reduce the font size and switch from bright red to a subtler color so they feel informative rather than alarming.

2. **Make "Book a Demo" functional** -- when a visitor enters their email and clicks "Book a Demo" (in the hero or contact section), send you an email notification at contact@stratixos.com with the visitor's details.

---

## 1. Stat Cards Styling Fix

In `AgentShowcaseSection.tsx`, the stat values (e.g. "$126,000+", "Up to 85%") currently use:
- `text-2xl md:text-3xl font-black` sizing
- `color: hsl(var(--destructive))` (bright red)

Changes:
- Reduce to `text-xl md:text-2xl font-bold`
- Change color from destructive red to the primary teal: `color: hsl(var(--primary))`
- This keeps them emphasized but in a way that's consistent with the brand and not jarring

---

## 2. "Book a Demo" Email Notification

Since there's no backend connected yet, we need to set up Lovable Cloud to handle this.

### Step 1: Enable Lovable Cloud
Connect the project to Lovable Cloud so we can create an edge function and store secrets.

### Step 2: Create a Supabase Edge Function
Build an edge function (`send-demo-request`) that:
- Receives the visitor's email via POST
- Validates the email format using zod
- Sends a notification email to contact@stratixos.com using the Resend API (a simple email sending service)
- Returns a success/error response

### Step 3: Set Up Resend
You'll need a free Resend account (resend.com) to send emails. We'll store the API key as a secret. Resend's free tier allows 100 emails/day which is plenty for demo requests.

### Step 4: Update Frontend Components
- **HeroSection.tsx**: Add form submission handler that calls the edge function, shows a loading state on the button, and displays a success toast ("We'll be in touch shortly!")
- **ContactSection.tsx**: Same treatment for the bottom CTA
- Add email validation before submission (no empty/invalid emails)
- Disable the button while submitting to prevent double-clicks

### Email Content
The notification email to you would include:
- Subject: "New Demo Request - StratixOS"
- Visitor's email address
- Timestamp
- Which page/section they submitted from (hero vs contact)

---

## Technical Details

Files to modify:
- `src/components/AgentShowcaseSection.tsx` -- stat card styling
- `src/components/HeroSection.tsx` -- form submission logic
- `src/components/ContactSection.tsx` -- form submission logic

Files to create:
- `supabase/functions/send-demo-request/index.ts` -- edge function

Secrets needed:
- `RESEND_API_KEY` -- for sending emails via Resend

