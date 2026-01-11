
"use client";

import * as React from 'react';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCaseById, getDCAById, MOCK_USERS } from "@/lib/data";
import type { Case, DCA, User } from '@/lib/definitions';
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Calendar,
  ShieldAlert,
  Target,
  Users,
  Clock,
} from "lucide-react";
import { ActivityLogView } from './_components/activity-log';
import { StrategyView } from './_components/strategy-view';
import { AllocationView } from './_components/allocation-view';
import { format } from 'date-fns';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const [caseData, setCaseData] = React.useState<Case | null>(null);
  const [dca, setDca] = React.useState<DCA | null>(null);
  const [employee, setEmployee] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchData() {
        try {
            const fetchedCase = await getCaseById(params.id);
            if (!fetchedCase) {
                notFound();
                return;
            }
            setCaseData(fetchedCase);

            if (fetchedCase.assignedDCAId) {
                const fetchedDca = await getDCAById(fetchedCase.assignedDCAId);
                setDca(fetchedDca || null);
            }
            if (fetchedCase.assignedDCAEmployeeId) {
                const fetchedEmployee = MOCK_USERS.find(u => u.id === fetchedCase.assignedDCAEmployeeId);
                setEmployee(fetchedEmployee || null);
            }
        } catch (error) {
            console.error("Failed to fetch case details", error);
            // Handle error state
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, [params.id]);

  if (loading) {
      return <div>Loading case details...</div>
  }

  if (!caseData) {
    // notFound() must be called in a server component or during build.
    // In a client component, you'd handle this differently, e.g., show a not found message.
    return <div>Case not found.</div>;
  }

  const statusStyles: Record<typeof caseData.status, string> = {
    "New": "bg-blue-100 text-blue-800",
    "Assigned": "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-purple-100 text-purple-800",
    "Settled": "bg-green-100 text-green-800",
    "Escalated": "bg-red-100 text-red-800",
    "Closed": "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="font-headline text-3xl font-bold tracking-tight">{caseData.customerName}</h1>
          <Badge variant="outline" className={statusStyles[caseData.status]}>{caseData.status}</Badge>
        </div>
        <p className="text-muted-foreground font-mono">{caseData.id}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Case Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-semibold text-lg">${caseData.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">Aging</p>
                    <p className="font-semibold text-lg">{caseData.agingDays} days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">Recovery Probability</p>
                    <p className="font-semibold text-lg">{(caseData.recoveryProbability * 100).toFixed(1)}%</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">Urgency Score</p>
                    <p className="font-semibold text-lg">{caseData.urgencyScore.toFixed(0)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-2 md:col-span-1">
                  <Users className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">Assigned DCA / Agent</p>
                    <p className="font-semibold text-base">{dca?.name || 'Unassigned'}</p>
                    <p className="font-normal text-xs text-muted-foreground">{employee?.name || 'No agent assigned'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">SLA Due Date</p>
                    <p className="font-semibold text-base">{format(new Date(caseData.sla.dueDate), "MMM d, yyyy")}</p>
                    <p className="font-normal text-xs text-muted-foreground">
                        Breach Risk: <span className="font-semibold">{(caseData.sla.breachRisk * 100).toFixed(1)}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ActivityLogView history={caseData.history} />

        </div>
        <div className="space-y-8">
            <StrategyView caseData={caseData} />
            <AllocationView caseData={caseData} dca={dca}/>
        </div>
      </div>
    </div>
  );
}
