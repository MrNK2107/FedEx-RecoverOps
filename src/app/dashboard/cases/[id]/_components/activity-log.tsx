import { FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ActivityLog } from '@/lib/definitions';
import { format } from 'date-fns';

export function ActivityLogView({ history }: { history: ActivityLog[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Activity Log</CardTitle>
        </div>
        <CardDescription>An immutable record of all actions on this case.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((log, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-primary/20 border-2 border-primary"></div>
                {index < history.length - 1 && <div className="w-px flex-grow bg-border"></div>}
              </div>
              <div className="pb-4">
                <p className="font-mono text-xs text-muted-foreground">
                  {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                </p>
                <p className="font-code text-sm">{log.activity}</p>
                <p className="text-xs text-muted-foreground">by {log.user}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
