import type { Metadata } from "next";
import { getDCAs } from "@/lib/data";
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

export const metadata: Metadata = {
  title: 'DCA Management | FedEx DCA-OS',
  description: 'Monitor and manage Debt Collection Agencies.',
};

export default async function DcasPage() {
  const dcas = await getDCAs();

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
            An overview of all registered Debt Collection Agencies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Reputation</TableHead>
                <TableHead>Capacity</TableHead>
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
                        dca.reputationScore > 90 ? "bg-green-600 hover:bg-green-700" : dca.reputationScore > 80 ? "bg-yellow-500 hover:bg-yellow-600" : "bg-red-500 hover:bg-red-600"
                     }>
                        {dca.reputationScore}
                     </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{`${((dca.currentLoad / dca.capacity) * 100).toFixed(0)}%`}</span>
                        <Progress value={(dca.currentLoad / dca.capacity) * 100} className="w-24" />
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
