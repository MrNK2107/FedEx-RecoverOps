"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Lightbulb, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Case, DCA } from "@/lib/definitions";
import { allocateCaseAction } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { getDCAs } from '@/lib/data';

export function AllocationView({ caseData: initialCaseData, dca }: { caseData: Case, dca: DCA | null }) {
  const router = useRouter();
  const [dcas, setDcas] = React.useState<DCA[]>([]);
  const [selectedDca, setSelectedDca] = React.useState<string | undefined>(initialCaseData.assignedDCAId);
  const [isAllocating, setIsAllocating] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    async function fetchDcas() {
      const allDcas = await getDCAs();
      setDcas(allDcas);
    }
    fetchDcas();
  }, []);
  
  const handleAllocate = async () => {
    if (!selectedDca) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a DCA to assign.",
      });
      return;
    }
    
    setIsAllocating(true);
    try {
      await allocateCaseAction(initialCaseData.id, selectedDca);
      toast({
        title: "Case Assigned",
        description: "Case has been assigned and the decision has been logged.",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign case.",
      });
    } finally {
      setIsAllocating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Agentic Allocation</CardTitle>
        </div>
        <CardDescription>Automated case assignment with explainability.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Current DCA</p>
          <p className="font-semibold">{dca?.name || "Unassigned"}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Assign / Reassign To</label>
          <Select onValueChange={setSelectedDca} defaultValue={selectedDca}>
            <SelectTrigger>
              <SelectValue placeholder="Select a DCA" />
            </SelectTrigger>
            <SelectContent>
              {dcas.map(d => (
                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAllocate} disabled={isAllocating || !selectedDca} className="w-full">
          {isAllocating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Assigning...
            </>
          ) : "Confirm Assignment"}
        </Button>
      </CardContent>
    </Card>
  );
}
