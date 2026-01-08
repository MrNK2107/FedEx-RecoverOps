import type { Case, DCA, User } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || 'https://picsum.photos/seed/100/40/40';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alex Johnson', email: 'alex.j@fedex.com', role: 'fedex_admin', avatarUrl: userAvatar },
];

export const MOCK_DCAS: DCA[] = [
  { id: 'dca-1', name: 'Global Recovery Inc.', reputationScore: 92, currentLoad: 180, capacity: 250, slaCompliance: 98, recoverySuccessRate: 75, updateDiscipline: 95 },
  { id: 'dca-2', name: 'Vertex Financial', reputationScore: 85, currentLoad: 120, capacity: 150, slaCompliance: 91, recoverySuccessRate: 68, updateDiscipline: 88 },
  { id: 'dca-3', name: 'Quantum Collections', reputationScore: 78, currentLoad: 280, capacity: 300, slaCompliance: 85, recoverySuccessRate: 62, updateDiscipline: 81 },
  { id: 'dca-4', name: 'Momentum Partners', reputationScore: 95, currentLoad: 95, capacity: 100, slaCompliance: 99, recoverySuccessRate: 81, updateDiscipline: 97 },
];

const generateMockCases = (count: number): Case[] => {
  const cases: Case[] = [];
  const statuses: Case['status'][] = ['New', 'Assigned', 'In Progress', 'Settled', 'Escalated', 'Closed'];
  const customerNames = ['Apex Innovations', 'BioSynth Corp', 'CyberNetics Ltd.', 'Stellar Solutions', 'Quantum Dynamics', 'EcoVerve Inc.', 'Hyperion Goods', 'Nexus Systems', 'Orion Services', 'Zenith Health'];

  for (let i = 1; i <= count; i++) {
    const status = statuses[i % statuses.length];
    const dcaId = status !== 'New' && status !== 'Closed' ? MOCK_DCAS[(i % (MOCK_DCAS.length - 1))].id : undefined;
    const amount = Math.floor(Math.random() * 5000) + 500;
    const agingDays = Math.floor(Math.random() * 120) + 1;
    
    cases.push({
      id: `CASE-${String(1000 + i).padStart(4, '0')}`,
      customerName: customerNames[i % customerNames.length],
      amount: amount,
      agingDays: agingDays,
      status: status,
      recoveryProbability: Math.random(),
      urgencyScore: Math.floor(Math.random() * 100),
      assignedDCAId: dcaId,
      slaBreachRisk: Math.random(),
      history: [
        { timestamp: new Date(Date.now() - (agingDays * 24 * 60 * 60 * 1000)).toISOString(), activity: 'Case created.', user: 'System' },
        ...(dcaId ? [{ timestamp: new Date(Date.now() - (Math.floor(agingDays/2) * 24 * 60 * 60 * 1000)).toISOString(), activity: `Assigned to ${MOCK_DCAS.find(d => d.id === dcaId)?.name}.`, user: 'Agentic Allocator' }] : [])
      ]
    });
  }
  return cases;
};

let MOCK_CASES: Case[] = generateMockCases(25);

// Simulate a database
export const getCases = async (): Promise<Case[]> => {
  return Promise.resolve(MOCK_CASES);
};

export const getCaseById = async (id: string): Promise<Case | undefined> => {
  return Promise.resolve(MOCK_CASES.find(c => c.id === id));
};

export const getDCAs = async (): Promise<DCA[]> => {
  return Promise.resolve(MOCK_DCAS);
};

export const getDCAById = async (id: string): Promise<DCA | undefined> => {
    return Promise.resolve(MOCK_DCAS.find(dca => dca.id === id));
};

export const getUser = async (): Promise<User> => {
    return Promise.resolve(MOCK_USERS[0]);
};

export const addCase = async (newCase: Omit<Case, 'id' | 'history'>) => {
    const newId = `CASE-${String(1000 + MOCK_CASES.length + 1).padStart(4, '0')}`;
    const caseWithId: Case = {
        ...newCase,
        id: newId,
        history: [{
            timestamp: new Date().toISOString(),
            activity: 'Case created manually.',
            user: MOCK_USERS[0].name,
        }]
    };
    MOCK_CASES.unshift(caseWithId);
    return Promise.resolve(caseWithId);
}

export const updateCase = async (caseId: string, updates: Partial<Case>): Promise<Case | undefined> => {
    const caseIndex = MOCK_CASES.findIndex(c => c.id === caseId);
    if (caseIndex === -1) return undefined;
    MOCK_CASES[caseIndex] = { ...MOCK_CASES[caseIndex], ...updates };
    return Promise.resolve(MOCK_CASES[caseIndex]);
};
