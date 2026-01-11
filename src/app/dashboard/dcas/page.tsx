
"use client";

import * as React from 'react';
import { getDCAs, getUser } from "@/lib/data";
import type { DCA, User } from '@/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function DcasPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [dcas, setDcas] = React.useState<DCA[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const userData = await getUser();
      setUser(userData);
      const dcaData = await getDCAs(userData.role === 'dca_admin' ? { dcaId: userData.dcaId } : {});
      setDcas(dcaData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a skeleton loader
  }
  
  if (!user) {
    return <div>Error loading data.</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">DCA Management</h1>
        <p className="text-muted-foreground">Monitor agency performance and reputation.</p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Agency Performance</CardTitle>
          <CardDescription>
            {user.role === 'fedex_admin' ? 'An overview of all registered Debt Collection Agencies.' : 'An overview of your agency performance.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Reputation</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>SLA Compliance</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dcas.map((dca) => (
                <TableRow key={dca.id}>
                  <TableCell className="font-medium">{dca.name}</TableCell>
                  <TableCell>
                     <Badge variant={dca.reputationScore > 90 ? "default" : "secondary"} className={
                        dca.reputationScore > 90 ? "bg-green-100 text-green-800 border-green-200" : dca.reputationScore > 80 ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-red-100 text-red-800 border-red-200"
                     }>
                        {dca.reputationScore}
                     </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs w-12">{dca.currentLoad} / {dca.capacity}</span>
                        <Progress value={(dca.currentLoad / dca.capacity) * 100} className="w-24 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{dca.slaCompliance}%</TableCell>
                  <TableCell className="text-right">{dca.recoverySuccessRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
