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
  slaBreachRisk: number;
  history: ActivityLog[];
};

export type ActivityLog = {
  timestamp: string;
  activity: string;
  user: string;
};

export type DCA = {
  id: string;
  name: string;
  reputationScore: number;
  currentLoad: number;
  capacity: number;
  slaCompliance: number;
  recoverySuccessRate: number; 
  updateDiscipline: number; 
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'fedex_admin' | 'dca_admin' | 'dca_employee';
  dcaId?: string;
};
