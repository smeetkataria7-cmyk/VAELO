# VAELO — Agency Operating System

Internal platform for **VAELO Creative**, a digital marketing agency that delivers
**AI photoshoots, Instagram management, and paid advertising** for its clients.

This is an **internal tool** (not a SaaS product). VAELO is the only agency that
uses it. It runs the full client lifecycle in one place: capturing leads, sending
proposals, billing, delivering creative, and giving clients a portal to track it all.

> **North star:** *"If VAELO stops using this platform, the agency becomes slower
> and clients become harder to manage."* The platform should be the system VAELO
> runs its entire business on.

---

## What this platform does

| Stage | What happens |
|-------|--------------|
| **Attract** | Public website + lead form ("free AI sample" hook) |
| **Pitch** | Proposals created, sent, accepted online |
| **Onboard** | Auto-create project + client login, collect brand assets |
| **Deliver** | AI creatives delivered, versioned, approved by client |
| **Get paid** | Invoices, retainers, auto reminders |
| **Retain** | Brand Brain, asset vault, health score, reports |

---

## Documentation index

Read in this order:

| # | Doc | What it covers |
|---|-----|----------------|
| 1 | [Product Requirements (PRD)](docs/01-PRD.md) | Vision, users, scope, goals, success metrics |
| 2 | [Features](docs/02-FEATURES.md) | Every feature with acceptance criteria |
| 3 | [Architecture](docs/03-ARCHITECTURE.md) | Tech stack, project structure, decisions |
| 4 | [Data Model](docs/04-DATA-MODEL.md) | Database entities, fields, relationships |
| 5 | [Integrations](docs/05-INTEGRATIONS.md) | Third-party services, APIs, keys, costs |
| 6 | [User Flows](docs/06-USER-FLOWS.md) | Step-by-step journeys for owner + client |
| 7 | [Roadmap](docs/07-ROADMAP.md) | Phased build plan with milestones |
| 8 | [Security & Leakage](docs/08-SECURITY.md) | Lead/revenue/data leak prevention |
| 9 | [Setup & Procurement](docs/09-SETUP.md) | Dev environment + accounts to create |
| 10 | [Brand Brain Spec](docs/10-BRAND-BRAIN.md) | The core differentiator, in detail |

---

## Quick context for the developer

- **One user (owner)** runs the agency side. **Clients** get limited portal logins.
- **Region: India.** Payments, WhatsApp, and pricing assume the Indian market
  (Razorpay, WhatsApp-first communication, INR).
- **AI-first:** AI generates creatives, status updates, proposals, and onboarding.
- **Mobile matters:** clients will mostly open the portal on their phones.
- Built so a future multi-agency version is *possible* but **not** built now —
  keep data cleanly scoped, avoid hardcoding "VAELO" into logic.

See [Setup & Procurement](docs/09-SETUP.md) to get started.
