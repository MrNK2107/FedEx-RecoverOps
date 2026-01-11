import { FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CaseActivityLog } from '@/lib/definitions';
import { format } from 'date-fns';

export function ActivityLogView({ history }: { history: CaseActivityLog[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Case Activity Log</CardTitle>
        </div>
        <CardDescription>An immutable record of all actions on this case.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((log, index) => (
            <div key={log.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-primary/20 border-2 border-primary"></div>
                {index < history.length - 1 && <div className="w-px flex-grow bg-border"></div>}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-code text-sm">{log.activity}</p>
                        <p className="text-xs text-muted-foreground">by {log.user}</p>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                    </p>
                </div>
                {log.explanation && (
                    <div className="mt-2 text-xs text-muted-foreground font-code bg-muted/50 p-2 rounded-md border">
                        <span className="font-semibold">AI Rationale:</span> {log.explanation}
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
