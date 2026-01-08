"use server";

import { revalidatePath } from 'next/cache';
import { getCaseById, getDCAById, updateCase } from "@/lib/data";
import { generateRecoveryStrategy } from '@/ai/flows/generate-recovery-strategy';
import { explainAgenticAllocation } from '@/ai/flows/explain-agentic-allocation';

export async function generateStrategyAction(caseId: string) {
  const caseData = await getCaseById(caseId);
  if (!caseData) {
    throw new Error('Case not found');
  }

  const result = await generateRecoveryStrategy({
    amount: caseData.amount,
    ageingDays: caseData.agingDays,
    historicalSuccess: 'Similar cases have a 70% recovery rate with early settlement offers.', // Mock data
  });
  
  const updates = {
      recommendedStrategy: result.recoveryApproach,
      strategyExplanation: result.explanation,
      history: [
          ...caseData.history,
          {
              timestamp: new Date().toISOString(),
              activity: `Generated recovery strategy: ${result.recoveryApproach}. Reason: ${result.explanation}`,
              user: "Strategy Engine"
          }
      ]
  };

  await updateCase(caseId, updates);
  revalidatePath(`/dashboard/cases/${caseId}`);
  return {
    recommendedStrategy: result.recoveryApproach,
    strategyExplanation: result.explanation,
  };
}


export async function allocateCaseAction(caseId: string, dcaId: string) {
    const caseData = await getCaseById(caseId);
    const dcaData = await getDCAById(dcaId);

    if (!caseData || !dcaData) {
        throw new Error('Case or DCA not found');
    }

    const explanationResult = await explainAgenticAllocation({
        caseId: caseData.id,
        dcaId: dcaData.id,
        agencyReputationScore: dcaData.reputationScore,
        currentLoad: dcaData.currentLoad,
        capacity: dcaData.capacity,
        slaBreachRisk: caseData.slaBreachRisk
    });

    const updates = {
        assignedDCAId: dcaId,
        status: 'Assigned' as const,
        history: [
            ...caseData.history,
            {
                timestamp: new Date().toISOString(),
                activity: `Case assigned to ${dcaData.name}. Explanation: ${explanationResult.explanation}`,
                user: "Agentic Allocator"
            }
        ]
    };

    await updateCase(caseId, updates);
    revalidatePath(`/dashboard/cases/${caseId}`);
    revalidatePath(`/dashboard`);
}
