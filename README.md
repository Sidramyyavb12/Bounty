<h1>📘 Bounty Creation Wizard – README</h1>

<p>
A fully functional multi-step <strong>Bounty Creation Wizard</strong> built using 
<strong>React, TypeScript, Redux Toolkit, and React Router</strong>.  
This application replicates a real-world bounty creation flow similar to 
ImpactMiner/Superteam-style bounties with a clean mobile-first UI, reusable components, 
validation, and state persistence across pages.
</p>

<hr/>

<h2>🚀 Features</h2>

<h3>✅ Multi-Step Form Wizard</h3>
<p>The flow includes the following pages:</p>
<ul>
  <li><strong>Step 1 — Basics</strong></li>
  <li><strong>Step 2 — Backer / Sponsor</strong></li>
  <li><strong>Step 3 — Rewards & Timeline</strong></li>
  <li><strong>Confirmation Page</strong></li>
  <li><strong>Result (Final JSON Payload)</strong></li>
  <li><strong>Published (Success Screen)</strong></li>
</ul>

<h3>✅ State Management (Redux Toolkit)</h3>
<ul>
  <li>All step data is stored inside a single <code>bountySlice</code>.</li>
  <li>Every page automatically syncs Redux and local state.</li>
  <li>Final payload is compiled and displayed on the <strong>Result</strong> page.</li>
</ul>

<h3>✅ Mobile-First UI (Pixel Perfect)</h3>
<ul>
  <li>Inspired by real mobile bounty creation interfaces.</li>
  <li>Reusable UI components:</li>
  <ul>
    <li>Input</li>
    <li>Textarea</li>
    <li>Select</li>
    <li>Toggle</li>
    <li>Checkbox</li>
    <li>Button</li>
  </ul>
  <li><code>PageShell</code> provides mobile layout + header.</li>
  <li>Clean spacing, cards, typography, and pill elements.</li>
</ul>

<h3>✅ Map Picker (Physical Bounty Mode)</h3>
<p>Integrated with <strong>Leaflet + react-leaflet</strong>. Includes:</p>
<ul>
  <li>Draggable marker</li>
  <li>Location selection</li>
  <li>Radius control</li>
  <li>Autocomplete search</li>
</ul>

<h3>✅ File Upload (Sponsor Logos)</h3>
<p>Includes validation for:</p>
<ul>
  <li>File size</li>
  <li>File type</li>
  <li>Live preview</li>
  <li>Edit or remove logo</li>
</ul>

<h3>✅ Strong Validation</h3>
<p>Validates fields across all steps including:</p>
<ul>
  <li>Title and description</li>
  <li>Reward logic</li>
  <li>SDG limit (max 4)</li>
  <li>Impact certificate</li>
  <li>Backer name and logo</li>
  <li>Terms & conditions</li>
</ul>

<h3>✅ Clean Routing</h3>
<p>Using React Router v6 with the following paths:</p>
<code>
/step-1 <br/>
/step-2 <br/>
/step-3 <br/>
/confirm <br/>
/result <br/>
/published
</code>

<hr/>

<h2>📂 Folder Structure</h2>

<pre>
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
</pre>

<hr/>

<h2>🛠️ Tech Stack</h2>

<table>
  <tr><td><strong>Framework</strong></td><td>React + TypeScript</td></tr>
  <tr><td><strong>State</strong></td><td>Redux Toolkit</td></tr>
  <tr><td><strong>Router</strong></td><td>React Router v6</td></tr>
  <tr><td><strong>Map</strong></td><td>Leaflet + react-leaflet</td></tr>
  <tr><td><strong>Styling</strong></td><td>Custom CSS + Bootstrap Icons</td></tr>
  <tr><td><strong>File Handling</strong></td><td>URL.createObjectURL()</td></tr>
</table>

<hr/>

<h2>🧩 How It Works</h2>

<h3>🌟 Step 1 — Basics</h3>
<ul>
  <li>Title</li>
  <li>Description</li>
  <li>Type</li>
  <li>Dominant Impact Core</li>
  <li>Digital / Physical selection</li>
  <li>Map picker (for physical)</li>
</ul>

<h3>🌟 Step 2 — Backer</h3>
<ul>
  <li>Upload sponsor logo</li>
  <li>Enter name</li>
  <li>Add message</li>
  <li>Accept terms</li>
</ul>

<h3>🌟 Step 3 — Rewards</h3>
<ul>
  <li>Currency</li>
  <li>Reward amount</li>
  <li>Winners</li>
  <li>SDGs (max 4)</li>
  <li>Impact certificate</li>
  <li>Timeline</li>
</ul>

<h3>🌟 Confirmation</h3>
<p>A clean summary of all data before submission.</p>

<h3>🌟 Result</h3>
<p>Final JSON payload displayed using <code>JSON.stringify(payload, null, 2)</code>.</p>

<h3>🌟 Published</h3>
<p>Success screen with a celebration GIF.</p>

<hr/>

<h2>▶️ Running the Project</h2>

<h3>Install Dependencies</h3>
<pre>npm install</pre>

<h3>Start the App</h3>
<pre>npm start</pre>

<h3>Build for Production</h3>
<pre>npm run build</pre>

<hr/>

<h2>📌 Notes / Decisions</h2>
<ul>
  <li>Uploaded images are <strong>not stored in Redux</strong> (assignment requirement).</li>
  <li>Preview uses <code>URL.createObjectURL()</code> (no backend upload).</li>
  <li>UI is fully mobile-first, replicating the assignment layout.</li>
</ul>
