
'use client';

import * as React from 'react';
import { getUser, getUsers } from '@/lib/data';
import type { User } from '@/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { AddEmployeeDialog } from './_components/add-employee-dialog';

export default function TeamPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [employees, setEmployees] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = React.useCallback(async () => {
    const userData = await getUser();
    setUser(userData);
    if (userData.role === 'dca_admin') {
      const employeeData = await getUsers({ dcaId: userData.dcaId });
      setEmployees(employeeData.filter(u => u.role === 'dca_employee'));
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEmployeeAdded = () => {
    // Re-fetch employees after a new one is added
    fetchData();
  };

  if (loading) {
    return <div>Loading team members...</div>;
  }

  if (user?.role !== 'dca_admin') {
    return (
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Add, view, and manage employees for your agency.
          </p>
        </div>
        <AddEmployeeDialog onEmployeeAdded={handleEmployeeAdded} dcaId={user.dcaId!} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DCA Employees</CardTitle>
          <CardDescription>
            A list of all employees registered under your agency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={employee.avatarUrl}
                        alt={employee.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      {employee.name}
                    </div>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">DCA Employee</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
