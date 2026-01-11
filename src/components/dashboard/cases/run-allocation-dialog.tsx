"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronsRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { runAgenticAllocationAction } from './actions';

export function RunAllocationDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAllocating, setIsAllocating] = React.useState(false);
  const [allocationResult, setAllocationResult] = React.useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  
  const handleRunAllocation = async () => {
    setIsAllocating(true);
    setAllocationResult(null);
    try {
      const result = await runAgenticAllocationAction();
      setAllocationResult(`Successfully allocated ${result.allocatedCount} cases.`);
      toast({
        title: "Allocation Complete",
        description: `Agentic allocator has processed new cases.`,
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Allocation Failed",
        description: "There was an error running the allocation process.",
      });
    } finally {
        setIsAllocating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <ChevronsRight className="mr-2 h-4 w-4" />
          Run Allocator
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Run Agentic Allocation Engine</DialogTitle>
          <DialogDescription>
            This will query for all 'New' cases and assign them to the optimal DCA based on reputation, load, and capacity. This process may take a few moments.
          </DialogDescription>
        </DialogHeader>
        
        {isAllocating && (
            <div className="flex items-center justify-center p-8 space-x-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Allocating cases...</p>
            </div>
        )}

        {allocationResult && (
            <div className="p-4 bg-green-100/50 dark:bg-green-900/50 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-md">
                <p className="font-semibold">Allocation Successful</p>
                <p>{allocationResult}</p>
            </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isAllocating}>Cancel</Button>
          <Button onClick={handleRunAllocation} disabled={isAllocating}>
            {isAllocating ? 'Running...' : 'Confirm and Run'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
