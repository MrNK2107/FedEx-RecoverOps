import Link from 'next/link';
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Case } from "@/lib/definitions";
import { getDCAById } from "@/lib/data";

const statusStyles: Record<Case['status'], string> = {
  "New": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300",
  "Assigned": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300",
  "In Progress": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-300",
  "Settled": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300",
  "Escalated": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300",
  "Closed": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300",
};


export async function CaseTable({ cases }: { cases: Case[] }) {
  
  const dcaData = await Promise.all(
    cases.map(c => c.assignedDCAId ? getDCAById(c.assignedDCAId) : Promise.resolve(undefined))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Registry</CardTitle>
        <CardDescription>
          A list of all overdue cases in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead className="hidden md:table-cell">Assigned DCA</TableHead>
              <TableHead className="hidden md:table-cell">Aging</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem, index) => (
              <TableRow key={caseItem.id}>
                <TableCell>
                  <div className="font-medium">{caseItem.customerName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {caseItem.id}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[caseItem.status]}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={caseItem.urgencyScore > 75 ? "destructive" : "secondary"}>
                    {caseItem.urgencyScore.toFixed(0)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {dcaData[index]?.name || 'Unassigned'}
                </TableCell>
                <TableCell className="hidden md:table-cell">{caseItem.agingDays} days</TableCell>
                <TableCell className="text-right">${caseItem.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild><Link href={`/dashboard/cases/${caseItem.id}`}>View Details</Link></DropdownMenuItem>
                      <DropdownMenuItem>Assign DCA</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
