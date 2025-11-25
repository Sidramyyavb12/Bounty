📘 Bounty Creation Wizard – README

A fully functional multi-step Bounty Creation Wizard built using React, TypeScript, Redux Toolkit, and React Router.
This application replicates a real-world bounty creation flow similar to ImpactMiner/Superteam-style bounties with a clean mobile-first UI, reusable components, validation, and state persistence across pages.

🚀 Features
✅ Multi-Step Form Wizard

The flow includes the following pages:

Step 1 — Basics

Step 2 — Backer / Sponsor

Step 3 — Rewards & Timeline

Confirmation Page

Result (Final JSON Payload)

Published (Success Screen)

✅ State Management (Redux Toolkit)

All step data is stored inside a single Redux slice (bountySlice).

Every page automatically syncs Redux and local state.

Final payload is compiled and shown on result page.

✅ Mobile-First UI (PIXEL-Perfect)

Inspired by real mobile bounty creation UI.

Custom components ensure consistent design:

Input, Textarea, Select, Toggle, Checkbox, Button

PageShell provides mobile layout + header.

Clean cards, spacing, typography, and pill UI elements.

✅ Map Picker (Physical bounty mode)

Integrated Leaflet map using react-leaflet.

Allows:

Dragging marker

Selecting location

Controlling radius

Autocomplete search

✅ File Upload (Sponsor Logos)

Validates:

File size

File type

Live preview

Edit/remove support

✅ Strong Validation

Step-wise validation for:

Title / description

Reward logic

SDG limit (max 4)

Impact certificate

Backer name & logo

Terms & conditions

✅ Clean Routing

Using React Router v6 with paths:

/step-1
/step-2
/step-3
/confirm
/result
/published

📂 Folder Structure
src/
 ├── components/
 │   ├── layout/
 │   │   ├── MobileHeader.tsx
 │   │   └── PageShell.tsx
 │   └── ui/
 │       ├── Button.tsx
 │       ├── Input.tsx
 │       ├── Select.tsx
 │       ├── Textarea.tsx
 │       ├── Toggle.tsx
 │       ├── Checkbox.tsx
 │       └── MapPicker.tsx
 │
 ├── pages/
 │   ├── Step1Basics.tsx
 │   ├── Step2Backer.tsx
 │   ├── Step3Rewards.tsx
 │   ├── Confirmation.tsx
 │   ├── ResultPage.tsx
 │   └── Published.tsx
 │
 ├── store/
 │   ├── store.ts
 │   └── bountySlice.ts
 │
 ├── utils/
 │   └── validation.ts
 │
 ├── App.tsx
 └── index.tsx

🛠️ Tech Stack
Category	Tools
Framework	React + TypeScript
State	Redux Toolkit
Router	React Router v6
Map	Leaflet + react-leaflet
Styling	Custom CSS + Bootstrap Icons
File Handling	Local preview using URL.createObjectURL
🧩 How It Works
🌟 Step 1 — Basics

User enters:

Title

Description

Type

Dominant Impact Core

Digital / Physical

Map selection (for physical)

🌟 Step 2 — Backer

User can toggle sponsor:

Upload logo

Enter name

Add message

Accept T&C

🌟 Step 3 — Rewards

User selects:

Currency

Reward amount

Winners

SDGs

Impact certificate

Timeline

🌟 Confirmation

A clean summary of all data.

🌟 Result

Full JSON payload displayed (JSON.stringify(payload, null, 2)).

🌟 Published

Success screen with a celebration GIF.

▶️ Running the Project
Install Dependencies
npm install

Start the app
npm start

Build for Production
npm run build

📌 Notes / Decisions

Uploaded images are not stored in Redux (only filename stored for assignment compliance).

For preview, URL.createObjectURL() is used (no server storage).

Mobile UI is strictly followed as per assignment requirement.