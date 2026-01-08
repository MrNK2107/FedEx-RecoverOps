import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCaseById, getDCAById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  DollarSign,
  Calendar,
  ShieldAlert,
  Target,
  Users,
  BrainCircuit,
  Lightbulb,
} from "lucide-react";
import { ActivityLogView } from './_components/activity-log';
import { StrategyView } from './_components/strategy-view';
import { AllocationView } from './_components/allocation-view';


export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  const caseData = await getCaseById(params.id);
  if (!caseData) {
    notFound();
  }
  const dca = caseData.assignedDCAId ? await getDCAById(caseData.assignedDCAId) : null;

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
        <p className="text-muted-foreground">{caseData.id}</p>
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
                  <Users className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">Assigned DCA</p>
                    <p className="font-semibold text-lg">{dca?.name || 'Unassigned'}</p>
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
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-muted-foreground">SLA Breach Risk</p>
                    <p className="font-semibold text-lg">{(caseData.slaBreachRisk * 100).toFixed(1)}%</p>
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
