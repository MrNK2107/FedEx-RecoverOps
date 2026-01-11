import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { getDCAs, getCases } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: 'Analytics | FedEx Recovery Ops',
  description: 'Analytics and Reporting for DCA Performance and Case Metrics.',
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default async function AnalyticsPage() {
  const dcas = await getDCAs();
  const cases = await getCases();

  const dcaPerformanceData = dcas.map(dca => ({
    name: dca.name.replace(' Inc.', '').replace(' Financial', '').replace(' Collections', '').replace(' Partners', ''),
    Reputation: dca.reputationScore,
    'SLA Compliance': dca.slaCompliance,
    'Success Rate': dca.recoverySuccessRate,
  }));

  const caseStatusData = cases.reduce((acc, currentCase) => {
    const status = currentCase.status;
    const existing = acc.find(item => item.name === status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: status, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const recoveryOverTimeData = [
    { name: 'Jan', Recovered: 4000, Overdue: 2400 },
    { name: 'Feb', Recovered: 3000, Overdue: 1398 },
    { name: 'Mar', Recovered: 2000, Overdue: 9800 },
    { name: 'Apr', Recovered: 2780, Overdue: 3908 },
    { name: 'May', Recovered: 1890, Overdue: 4800 },
    { name: 'Jun', Recovered: 2390, Overdue: 3800 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Deep dive into DCA performance and case distribution metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Case Status Distribution</CardTitle>
            <CardDescription>Current state of all cases in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Recovery Over Time</CardTitle>
            <CardDescription>Monthly recovered vs. new overdue amounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recoveryOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="Recovered" stroke="hsl(var(--chart-2))" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Overdue" stroke="hsl(var(--chart-1))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>DCA Performance Overview</CardTitle>
          <CardDescription>Comparing key metrics across all agencies.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dcaPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                cursor={{fill: 'hsl(var(--muted))'}}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))'
                }}
              />
              <Legend />
              <Bar dataKey="Reputation" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SLA Compliance" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Success Rate" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
