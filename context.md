# FedEx Recovery Nexus: System Context

## 1. Problem Domain & Business Context

FedEx, like any large enterprise, deals with a significant volume of accounts receivable. When invoices become overdue, they are often outsourced to third-party Debt Collection Agencies (DCAs). Managing this process is complex and fraught with challenges:

-   **Lack of Centralized Oversight:** Case data is fragmented across different DCAs, making it difficult for FedEx to get a unified view of its recovery portfolio.
-   **Inefficient Allocation:** Cases are often assigned manually or with simple heuristics, failing to match the right case with the best-suited agency.
-   **Opaque Performance Metrics:** It's hard to objectively measure and compare DCA performance, leading to subjective vendor management.
-   **SLA Enforcement:** Monitoring Service Level Agreements (SLAs) is a manual, reactive process, often resulting in breaches that damage customer relationships and reduce recovery rates.
-   **Audit & Compliance Risks:** A lack of auditable, explainable decision-making, especially with automated systems, poses significant compliance risks for a regulated enterprise like FedEx.

**FedEx Recovery Nexus** is an internal platform designed to address these challenges. It acts as a command-and-control center for vendor governance and recovery intelligence, transforming the debt collection process from a reactive, manual task into a data-driven, optimized, and fully governable operation.

## 2. System Goals

The primary goal is to **maximize recovery rates and operational efficiency** while **minimizing risk** through intelligent automation and strict governance.

-   **Centralize and Standardize:** Create a single source of truth for all overdue cases and DCA interactions.
-   **Optimize with AI:** Use (simulated) ML and AI to prioritize cases, recommend recovery strategies, and intelligently allocate work to the best-performing DCAs.
-   **Enforce Governance:** Implement strict, role-based access control and ensure every action (human or AI) is logged in an immutable, auditable trail.
-   **Provide Real-Time Intelligence:** Equip stakeholders with role-specific dashboards to monitor performance, identify risks, and make informed decisions.
-   **Ensure Explainability:** Every automated decision must be accompanied by a human-readable explanation to ensure transparency and meet enterprise audit requirements.

## 3. User Roles & Personas

The system is designed for three distinct user roles, each with specific needs and permissions:

1.  **FedEx Admin (The Strategist)**
    -   **Who:** An internal financial operations manager at FedEx.
    -   **Needs:** A global, high-level view of the entire recovery portfolio. They need to monitor overall performance, compare DCAs, understand financial metrics, and ensure the system is operating efficiently. They are the ultimate authority, with the ability to override AI decisions and manage system settings.
    -   **Access:** Full, unrestricted access to all data across all agencies and cases.

2.  **DCA Admin (The Manager)**
    -   **Who:** A manager at a specific Debt Collection Agency.
    -   **Needs:** To manage their own agency's performance and personnel. They need to see all cases assigned to their agency, monitor their team's progress, and manage internal case assignments to their employees. They are focused on meeting their agency's SLA targets.
    -   **Access:** Strictly limited to the data of their own agency. They cannot see data from other DCAs or global FedEx metrics.

3.  **DCA Employee (The Agent)**
    -   **Who:** A debt collection agent working at a DCA.
    -   **Needs:** A simple, focused view of only the cases they are personally assigned to work on. Their primary function is to execute the recovery strategy and update the case status.
    -   **Access:** The most restricted role. They can only view and update the specific cases assigned to them. They have no access to analytics, dashboards, or cases assigned to other agents.

## 4. Key Assumptions

-   **Mock Systems:** The platform simulates interactions with external systems. Case ingestion is handled via a mock API or manual entry, and the "ML" models are heuristic-based or powered by LLM prompts.
-   **Internal Platform:** This is an internal-facing enterprise tool. It is not a customer-facing application.
-   **Firebase Foundation:** The architecture is built upon an existing Firebase (Auth and Firestore) MVP. The goal is to extend, not replace, this foundation.
-   **User Identity is Managed:** We assume that user accounts and their associated roles/custom claims are provisioned and managed by a separate, secure administrative process.

## 5. What This Product Is and Is Not

-   **It IS:**
    -   A **Vendor Governance** platform for managing and monitoring third-party DCAs.
    -   A **Recovery Intelligence** tool that uses AI to optimize the debt collection process.
    -   An **Auditable System of Record** with explainable AI for enterprise compliance.
    -   A **Role-Based** application with strict data scoping and security.

-   **It IS NOT:**
    -   A **Payment Processing System:** No real financial transactions are handled.
    -   A **Customer Communication Tool:** It does not send emails, texts, or make calls to debtors.
    -   A **Production-Grade ML Pipeline:** The AI/ML components are simulated to demonstrate the concept of intelligent decision-making.
    -   A direct replacement for FedEx's core financial systems. It is an auxiliary platform focused specifically on post-overdue recovery.
