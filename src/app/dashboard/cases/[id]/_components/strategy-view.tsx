"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Case } from "@/lib/definitions";
import { generateStrategyAction } from '../actions';
import { useToast } from '@/hooks/use-toast';

export function StrategyView({ caseData: initialCaseData }: { caseData: Case }) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [caseData, setCaseData] = React.useState(initialCaseData);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateStrategyAction(caseData.id);
      if (result) {
        setCaseData(prev => ({ ...prev, ...result }));
        toast({
          title: "Strategy Generated",
          description: `New recovery strategy is: ${result.recommendedStrategy}.`,
        });
        router.refresh();
      } else {
        throw new Error("Failed to get result");
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate strategy.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Recovery Strategy Engine</CardTitle>
        </div>
        <CardDescription>AI-powered recommendations for next steps.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-1">Recommended Approach</h4>
          <p className="text-primary font-bold text-lg">{caseData.recommendedStrategy || 'Not generated'}</p>
        </div>
        {caseData.strategyExplanation && (
          <div>
            <h4 className="font-semibold text-sm mb-1">Explanation</h4>
            <p className="text-sm text-muted-foreground font-code">{caseData.strategyExplanation}</p>
          </div>
        )}
        <Button onClick={handleGenerate} disabled={isGenerating} size="sm" className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : "Generate / Refresh Strategy"}
        </Button>
      </CardContent>
    </Card>
  );
}
