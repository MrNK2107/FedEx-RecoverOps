
'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCases, getUser } from '@/lib/data';
import type { Case, User } from '@/lib/definitions';
import { CaseTable } from '@/components/dashboard/cases/case-table';
import { AddCaseDialog } from '@/components/dashboard/cases/add-case-dialog';

export default function DashboardPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [cases, setCases] = React.useState<Case[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const userData = await getUser();
      setUser(userData);
      
      let caseData;
      if (userData.role === 'dca_admin') {
        caseData = await getCases({ dcaId: userData.dcaId });
      } else if (userData.role === 'dca_employee') {
         caseData = await getCases({ employeeId: userData.id });
      } else {
        caseData = await getCases();
      }
      
      setCases(caseData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const totalAmount = cases.reduce((sum, item) => sum + item.amount, 0);
  const activeCases = cases.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length;
  const closedThisMonth = cases.filter(c => c.status === 'Settled').length; // Mock data for now

  if (loading) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }
  
  if (!user) {
    return <div>Error loading user.</div>
  }
  
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Case Overview</h1>
          <p className="text-muted-foreground">Welcome back, here's a look at your recovery portfolio.</p>
        </div>
        <div>
          {user.role === 'fedex_admin' && <AddCaseDialog />}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Overdue Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all active cases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Cases
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{activeCases}</div>
            <p className="text-xs text-muted-foreground">
              Currently being worked on
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Settled</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{closedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Breach Risk</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cases.length > 0 ? (cases.reduce((sum, c) => sum + c.sla.breachRisk, 0) / cases.length * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average SLA breach prediction
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <CaseTable cases={cases} />
      </div>
    </div>
  )
}
