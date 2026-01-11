import type { Case, DCA, User, CaseActivityLog } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || 'https://picsum.photos/seed/100/40/40';

export let MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alex Johnson', email: 'alex.j@fedex.com', role: 'fedex_admin', avatarUrl: userAvatar },
  { id: 'user-2', name: 'Jane Smith', email: 'jane.s@globalrecovery.com', role: 'dca_admin', dcaId: 'dca-1', avatarUrl: 'https://picsum.photos/seed/101/40/40' },
  { id: 'user-3', name: 'Bob Williams', email: 'bob.w@globalrecovery.com', role: 'dca_employee', dcaId: 'dca-1', avatarUrl: 'https://picsum.photos/seed/102/40/40' },
  { id: 'user-4', name: 'Samantha Green', email: 'sam.g@vertex.com', role: 'dca_admin', dcaId: 'dca-2', avatarUrl: 'https://picsum.photos/seed/103/40/40' },
];

export let MOCK_DCAS: DCA[] = [
  { id: 'dca-1', name: 'Global Recovery Inc.', reputationScore: 92, currentLoad: 180, capacity: 250, slaCompliance: 98, recoverySuccessRate: 75, updateDiscipline: 95 },
  { id: 'dca-2', name: 'Vertex Financial', reputationScore: 85, currentLoad: 120, capacity: 150, slaCompliance: 91, recoverySuccessRate: 68, updateDiscipline: 88 },
  { id: 'dca-3', name: 'Quantum Collections', reputationScore: 78, currentLoad: 295, capacity: 300, slaCompliance: 85, recoverySuccessRate: 62, updateDiscipline: 81 },
  { id: 'dca-4', name: 'Momentum Partners', reputationScore: 95, currentLoad: 50, capacity: 100, slaCompliance: 99, recoverySuccessRate: 81, updateDiscipline: 97 },
];

const generateMockCases = (count: number): Case[] => {
  const cases: Case[] = [];
  const statuses: Case['status'][] = ['New', 'Assigned', 'In Progress', 'Settled', 'Escalated', 'Closed'];
  const customerNames = ['Apex Innovations', 'BioSynth Corp', 'CyberNetics Ltd.', 'Stellar Solutions', 'Quantum Dynamics', 'EcoVerve Inc.', 'Hyperion Goods', 'Nexus Systems', 'Orion Services', 'Zenith Health'];

  for (let i = 1; i <= count; i++) {
    const status = statuses[i % statuses.length];
    const dcaIndex = (i % (MOCK_DCAS.length));
    const dca = MOCK_DCAS[dcaIndex];
    const dcaId = status !== 'New' && status !== 'Closed' ? dca.id : undefined;
    const amount = Math.floor(Math.random() * 5000) + 500;
    const agingDays = Math.floor(Math.random() * 120) + 1;
    const slaDueDate = new Date();
    slaDueDate.setDate(slaDueDate.getDate() + (30 - agingDays > 0 ? 30 - agingDays : 15));
    
    // Increment DCA load if assigned
    if (dcaId) {
        dca.currentLoad = Math.min(dca.capacity, dca.currentLoad + 1);
    }
    
    cases.push({
      id: `CASE-${String(1000 + i).padStart(4, '0')}`,
      customerName: customerNames[i % customerNames.length],
      amount: amount,
      agingDays: agingDays,
      status: status,
      recoveryProbability: Math.random(),
      urgencyScore: Math.floor(Math.random() * 100),
      assignedDCAId: dcaId,
      assignedDCAEmployeeId: dcaId ? `user-3`: undefined, // mock employee bob.w
      sla: {
        dueDate: slaDueDate.toISOString(),
        breachRisk: Math.random(),
      },
      history: [
        { id: `log-${i}-1`, caseId: `CASE-${String(1000 + i).padStart(4, '0')}`, timestamp: new Date(Date.now() - (agingDays * 24 * 60 * 60 * 1000)).toISOString(), activity: 'Case created.', user: 'System', explanation: 'Initial case ingestion from source system.' },
        ...(dcaId ? [{ id: `log-${i}-2`, caseId: `CASE-${String(1000 + i).padStart(4, '0')}`, timestamp: new Date(Date.now() - (Math.floor(agingDays/2) * 24 * 60 * 60 * 1000)).toISOString(), activity: `Assigned to ${dca.name}.`, user: 'Agentic Allocator', explanation: 'Agency selected based on high reputation score and available capacity.' }] : [])
      ]
    });
  }
  return cases;
};

let MOCK_CASES: Case[] = generateMockCases(25);

// Simulate a database
export const getCases = async (filters?: { status?: Case['status'], dcaId?: string, employeeId?: string }): Promise<Case[]> => {
  let cases = MOCK_CASES;
  if (filters?.status) {
    cases = cases.filter(c => c.status === filters.status);
  }
  if (filters?.dcaId) {
    cases = cases.filter(c => c.assignedDCAId === filters.dcaId);
  }
   if (filters?.employeeId) {
    cases = cases.filter(c => c.assignedDCAEmployeeId === filters.employeeId);
  }
  return Promise.resolve(JSON.parse(JSON.stringify(cases)));
};

export const getCaseById = async (id: string): Promise<Case | undefined> => {
  return Promise.resolve(JSON.parse(JSON.stringify(MOCK_CASES.find(c => c.id === id))));
};

export const getDCAs = async (filters?: { dcaId?: string }): Promise<DCA[]> => {
  if (filters?.dcaId) {
    return Promise.resolve(JSON.parse(JSON.stringify(MOCK_DCAS.filter(dca => dca.id === filters.dcaId))));
  }
  return Promise.resolve(JSON.parse(JSON.stringify(MOCK_DCAS)));
};

export const getDCAById = async (id: string): Promise<DCA | undefined> => {
    return Promise.resolve(JSON.parse(JSON.stringify(MOCK_DCAS.find(dca => dca.id === id))));
};

export const getUsers = async (filters?: { dcaId?: string }): Promise<User[]> => {
    let users = MOCK_USERS;
    if (filters?.dcaId) {
        users = users.filter(u => u.dcaId === filters.dcaId);
    }
    return Promise.resolve(JSON.parse(JSON.stringify(users)));
};


export const getUser = async (): Promise<User> => {
    // For demo purposes, check localStorage for a logged-in user ID.
    // In a real app, this would be derived from a secure session/JWT.
    if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('loggedInUserId');
        if (userId) {
            const user = MOCK_USERS.find(u => u.id === userId);
            if (user) return Promise.resolve(JSON.parse(JSON.stringify(user)));
        }
    }
    // Default to the first user (FedEx Admin) if no one is logged in.
    return Promise.resolve(JSON.parse(JSON.stringify(MOCK_USERS[0])));
};

export const addCase = async (newCase: Omit<Case, 'id' | 'history' | 'sla'>) => {
    const newId = `CASE-${String(1000 + MOCK_CASES.length + 1).padStart(4, '0')}`;
    const slaDueDate = new Date();
    slaDueDate.setDate(slaDueDate.getDate() + 30);
    const caseWithId: Case = {
        ...newCase,
        id: newId,
        sla: {
            dueDate: slaDueDate.toISOString(),
            breachRisk: 0.1, // Initial low risk
        },
        history: [{
            id: `log-${newId}-1`,
            caseId: newId,
            timestamp: new Date().toISOString(),
            activity: 'Case created manually.',
            user: "FedEx Admin", // Hardcoded for this action
            explanation: `Manual case entry by FedEx Admin.`
        }]
    };
    MOCK_CASES.unshift(caseWithId);
    return Promise.resolve(caseWithId);
}

export const addUser = async (newUser: Omit<User, 'id' | 'avatarUrl'>) => {
    const newId = `user-${MOCK_USERS.length + 1}`;
    const userWithId: User = {
        ...newUser,
        id: newId,
        avatarUrl: `https://picsum.photos/seed/${100 + MOCK_USERS.length}/40/40`,
    };
    MOCK_USERS.push(userWithId);
    return Promise.resolve(userWithId);
};


export const updateCase = async (caseId: string, updates: Partial<Case>): Promise<Case | undefined> => {
    const caseIndex = MOCK_CASES.findIndex(c => c.id === caseId);
    if (caseIndex === -1) return undefined;

    const oldCase = MOCK_CASES[caseIndex];

    // If DCA assignment is changing, adjust counts
    if (updates.assignedDCAId && updates.assignedDCAId !== oldCase.assignedDCAId) {
      // Decrement old DCA's load
      if (oldCase.assignedDCAId) {
        const oldDCAIndex = MOCK_DCAS.findIndex(d => d.id === oldCase.assignedDCAId);
        if (oldDCAIndex !== -1) {
          MOCK_DCAS[oldDCAIndex].currentLoad = Math.max(0, MOCK_DCAS[oldDCAIndex].currentLoad - 1);
        }
      }
      // Increment new DCA's load
      const newDCAIndex = MOCK_DCAS.findIndex(d => d.id === updates.assignedDCAId);
      if (newDCAIndex !== -1) {
         MOCK_DCAS[newDCAIndex].currentLoad += 1;
      }
    }

    MOCK_CASES[caseIndex] = { ...oldCase, ...updates };
    return Promise.resolve(MOCK_CASES[caseIndex]);
};
