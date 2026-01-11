export type Case = {
  id: string;
  customerName: string;
  amount: number;
  agingDays: number;
  status: 'New' | 'Assigned' | 'In Progress' | 'Settled' | 'Escalated' | 'Closed';
  recoveryProbability: number;
  urgencyScore: number;
  recommendedStrategy?: string;
  strategyExplanation?: string;
  assignedDCAId?: string;
  assignedDCAEmployeeId?: string;
  sla: SLA;
  history: CaseActivityLog[];
};

export type CaseActivityLog = {
  id: string;
  caseId: string;
  timestamp: string;
  activity: string;
  user: string; // Could be a username, 'System', 'AI Engine', etc.
  explanation?: string; // For AI-driven actions
};

export type DCA = {
  id: string;
  name: string;
  reputationScore: number;
  currentLoad: number;
  capacity: number;
  slaCompliance: number; // Percentage
  recoverySuccessRate: number; // Percentage
  updateDiscipline: number; // Score or percentage
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'fedex_admin' | 'dca_admin' | 'dca_employee';
  dcaId?: string; // Associates user with a DCA if they are not a FedEx Admin
};

export type SLA = {
  dueDate: string;
  breachRisk: number; // A score from 0 to 1
};

export type ReputationMetric = {
  id: string;
  dcaId: string;
  date: string;
  slaCompliance: number;
  recoverySuccessRate: number;
  updateDiscipline: number;
};
