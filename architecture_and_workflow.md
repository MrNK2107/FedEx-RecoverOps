# FedEx Recovery Nexus: System Architecture & Workflow

## 1. System Architecture

The FedEx Recovery Nexus platform is built on a modern, serverless architecture leveraging Next.js for the frontend and Firebase for the backend services. This combination allows for rapid development, scalability, and a secure, real-time user experience.

### Core Components:

1.  **Frontend (Next.js & React)**:
    -   **Framework:** Next.js with the App Router provides a robust foundation for building a multi-page application with server-side rendering (SSR) and static site generation (SSG) capabilities.
    -   **UI Components:** Built using **ShadCN UI** and **Tailwind CSS**, ensuring a professional, consistent, and responsive user interface.
    -   **Role-Based Views:** The frontend is responsible for rendering the correct dashboard and components based on the user's role, which is determined at login.
    -   **State Management:** Primarily uses React's built-in hooks (`useState`, `useEffect`, `useContext`) and server-side data fetching to manage state.

2.  **Backend (Firebase)**:
    -   **Authentication:** **Firebase Authentication** is used to manage user identities (email/password). **Custom Claims** are the cornerstone of our RBAC system, embedding a user's role (`fedex_admin`, `dca_admin`, `dca_employee`) and `dcaId` directly into their auth token.
    -   **Database:** **Cloud Firestore** serves as the primary NoSQL database. Its real-time capabilities are ideal for live dashboards, and its powerful security rules are used to enforce our strict data access policies.
    -   **AI & Business Logic:** Genkit flows (`.ts` files in `src/ai/flows`) are used for all AI-driven logic. These are server-side functions that encapsulate calls to language models (e.g., Gemini) for tasks like generating recovery strategies and explaining allocation decisions.

3.  **AI Components (Genkit)**:
    -   **Case Prioritization (`prioritize-cases-with-ml.ts`):** A flow that takes case details (amount, aging) and returns a (simulated) ML-based `recoveryProbability` and `urgencyScore`.
    -   **Recovery Strategy Engine (`generate-recovery-strategy.ts`):** A flow that uses case data to recommend a specific recovery approach and provides a human-readable explanation for its choice.
    -   **Agentic Allocation Explainer (`explain-agentic-allocation.ts`):** A flow that generates a justification for why a case was assigned to a particular DCA, based on metrics like reputation, capacity, and risk.

## 2. Data Flow & Model

Firestore is organized into several key collections that model the business domain.

### Firestore Collections:

-   **/users/{userId}**: Stores user profile information, including their name, email, and a mapping to their role and assigned DCA (if applicable).
    ```json
    {
      "name": "Jane Smith",
      "email": "jane.s@globalrecovery.com",
      "role": "dca_admin",
      "dcaId": "dca-1"
    }
    ```
-   **/dcas/{dcaId}**: Contains information about each Debt Collection Agency.
    ```json
    {
      "name": "Global Recovery Inc.",
      "reputationScore": 92,
      "capacity": 250,
      "currentLoad": 180,
      "slaCompliance": 98
    }
    ```
-   **/cases/{caseId}**: The central collection for all recovery cases. It holds all relevant data, including financial details, scores, assignments, and SLA information.
    ```json
    {
      "customerName": "Apex Innovations",
      "amount": 1250.50,
      "status": "Assigned",
      "urgencyScore": 85,
      "assignedDCAId": "dca-1",
      "sla": {
        "dueDate": "2024-12-01T23:59:59Z",
        "breachRisk": 0.45
      }
    }
    ```
-   **/cases/{caseId}/activity/{activityId}**: A sub-collection representing the immutable activity log for a case. *Decision: A sub-collection is chosen to ensure logs cannot be modified by updating the parent case document and allows for querying logs independently.*
    ```json
    {
      "timestamp": "2024-10-26T10:00:00Z",
      "activity": "Case assigned to Global Recovery Inc.",
      "user": "Agentic Allocator",
      "explanation": "Assignment based on high reputation (92) and available capacity."
    }
    ```

## 3. Security Model (RBAC)

Security is paramount and enforced at multiple layers, with Firestore Security Rules being the final authority.

1.  **Authentication & Custom Claims**:
    -   Upon login, a user's Firebase ID Token is populated with custom claims (e.g., `{ role: 'dca_admin', dcaId: 'dca-1' }`).
    -   These claims are set by a trusted backend process (out of scope for the UI, but a critical architectural component) and are not modifiable by the client.

2.  **Firestore Security Rules**:
    -   The rules are the non-negotiable source of truth for data access.
    -   **FedEx Admin (`fedex_admin`):** Can read/write all documents in all collections.
        ```
        match /{document=**} {
          allow read, write: if request.auth.token.role == 'fedex_admin';
        }
        ```
    -   **DCA Admin (`dca_admin`):**
        -   Can read/write cases where `assignedDCAId` matches their token's `dcaId`.
        -   Can read/write their own agency's document in the `dcas` collection.
        -   Can read users who share their `dcaId`.
        ```
        match /cases/{caseId} {
          allow read, write: if request.auth.token.role == 'dca_admin' &&
                                get(/databases/$(database)/documents/cases/$(caseId)).data.assignedDCAId == request.auth.token.dcaId;
        }
        ```
    -   **DCA Employee (`dca_employee`):**
        -   Can only read/update cases where `assignedDCAEmployeeId` matches their `uid`. They cannot create or delete cases.
        ```
        match /cases/{caseId} {
          allow read, update: if request.auth.token.role == 'dca_employee' &&
                                  resource.data.assignedDCAEmployeeId == request.auth.uid;
        }
        ```
    -   **Unauthorized access fails hard and securely.**

3.  **UI-Layer Enforcement**:
    -   The frontend uses the user's role to conditionally render UI elements (e.g., an "Add Case" button is only shown to FedEx Admins). This improves user experience but is **not** a security measure.

## 4. End-to-End Workflow: A Case's Lifecycle

This workflow demonstrates how the components work together, from case creation to resolution.

1.  **Case Ingestion (FedEx Admin)**:
    -   A FedEx Admin opens the "Add Case" dialog on their dashboard.
    -   They fill in the customer name, amount, and aging days.
    -   On submission, a server action calls the **`prioritizeCasesWithML`** Genkit flow.
    -   The flow returns a `recoveryProbability` and `urgencyScore`.
    -   A new document is created in the `/cases` collection with `status: 'New'` and the calculated scores. An initial "Case Created" entry is added to its activity log.

2.  **Automated Allocation (System)**:
    -   A background process (simulated, but architecturally a Cloud Function) triggers periodically.
    -   It queries for cases with `status: 'New'`.
    -   For each case, it evaluates all DCAs based on **reputation score, current load vs. capacity, and SLA compliance**.
    -   The optimal DCA is selected.
    -   The server action calls the **`explainAgenticAllocation`** Genkit flow to get a justification.
    -   The case document is updated: `status` becomes `'Assigned'` and `assignedDCAId` is set.
    -   A new, detailed entry is added to the case's activity log, including the AI-generated explanation.

3.  **Strategy Generation (System/User)**:
    -   When a case is viewed, the FedEx Admin can click "Generate Strategy".
    -   This action calls the **`generateRecoveryStrategy`** Genkit flow.
    -   The flow returns a `recommendedStrategy` (e.g., "Aggressive Follow-up") and an `explanation`.
    -   The case document is updated with this information, and a corresponding entry is logged in the activity log.

4.  **Case Work (DCA Employee)**:
    -   A DCA Employee logs in and sees only the cases assigned to them on their dashboard.
    -   They open a case and see the recommended strategy and all case details.
    -   They perform their collection duties (offline) and update the case status in the platform (e.g., to `'In Progress'` or `'Settled'`). Each status change is logged.

5.  **SLA Monitoring & Re-allocation (System)**:
    -   Another background job continuously monitors cases.
    -   It calculates the `sla.breachRisk` based on the time remaining until the `sla.dueDate` and the case's lack of progress.
    -   If the `breachRisk` for an assigned case exceeds a threshold (e.g., 75%), the **Agentic Allocation Engine** is triggered again.
    -   It may decide to re-assign the case to a higher-performing DCA. This action is logged with a clear explanation (e.g., "Re-assigned due to high SLA breach risk with the current agency").

6.  **Reputation Scoring (System)**:
    -   Periodically, a process aggregates metrics for each DCA (e.g., recovery rates, SLA compliance).
    -   It updates the `reputationScore` in the `/dcas/{dcaId}` document, ensuring the allocation engine always uses the latest data.

This architecture creates a robust, auditable, and intelligent system that provides clear value by optimizing a critical business process while maintaining strict enterprise-grade governance.
