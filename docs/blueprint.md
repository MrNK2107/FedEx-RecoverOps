# **App Name**: FedEx DCA-OS: Vendor Governance and Recovery Intelligence Platform

## Core Features:

- Centralized Case Registry: Enable FedEx Admin to ingest overdue cases manually or via mock API into a single database with lifecycle states.
- ML-Based Case Prioritization: Implement a simulated ML or rule-based scoring function that calculates recovery probability and urgency using amount, ageingDays, and mock historical success. Store and display scores in the UI to drive prioritization.
- Recovery Strategy Engine: Recommend a recovery approach for each case (soft reminder, aggressive follow-up, settlement offer, legal escalation). Use rules and LLM text generation to provide explainable recommendations. Display strategy and explanation in the case view, acting as a tool to the user.
- Agentic Allocation Engine: Automatically assign and reassign cases to DCAs based on agency reputation score, current load vs capacity, and SLA breach risk. Reallocate cases when risk increases. Generate human-readable explanations for every automated decision, stored immutably in activity log, acting as a tool to the user.
- DCA Reputation Scoring: Implement dynamic reputation scoring for each agency based on SLA compliance, recovery success, and discipline of status updates. Adjust case flow based on scores, and display reputation trends to FedEx Admin.
- SLA Monitoring and Early Warning: Track SLA due dates, predict breach risk using simple heuristics. Highlight at-risk cases and trigger escalation, reassignment, or alerts when thresholds are crossed.
- Role-Based Dashboards: Implement role-based dashboards for FedEx Admin, DCA Admin, and DCA Employee, showing relevant cases, performance metrics, and SLA compliance. Enforce strict data scoping and RBAC on backend and frontend.

## Style Guidelines:

- Primary color: Deep FedEx Purple (#42299B) to convey stability and corporate identity, avoid direct imitation. Choose from purples and related hues rather than replicating branding.
- Background color: Very light gray (#F2F2F7), nearly white, providing a clean backdrop that focuses attention on data and actionable UI elements.
- Accent color: Analogous lavender (#A694FF) for highlighting interactive elements and key metrics, ensuring a modern contrast.
- Headline font: 'Space Grotesk' (sans-serif) for titles and headings, providing a modern and slightly techy aesthetic.
- Body font: 'Inter' (sans-serif) for body text, reports, and dashboard details, ensuring excellent readability and a neutral tone.
- Code font: 'Source Code Pro' for activity logs and any code snippets displayed, ensuring clarity.
- Use a consistent set of modern icons from a library like Font Awesome or Material Icons to represent case statuses, actions, and data metrics. Keep the style simple, line-based, and monochromatic, using the accent color (#A694FF) for emphasis.
- Employ a modular layout with clear separation of concerns for each dashboard. Use grid systems to maintain consistency and responsiveness across different screen sizes.
- Incorporate subtle animations for transitions and loading states. Use animations sparingly to enhance the user experience without being distracting.