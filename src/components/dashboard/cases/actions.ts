"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addCase, getCases, getDCAs, updateCase } from '@/lib/data';
import { prioritizeCasesWithML } from '@/ai/flows/prioritize-cases-with-ml';
import type { CaseActivityLog, DCA } from '@/lib/definitions';
import { explainAgenticAllocation } from '@/ai/flows/explain-agentic-allocation';

const CreateCaseSchema = z.object({
  customerName: z.string().min(1),
  amount: z.coerce.number().positive(),
  agingDays: z.coerce.number().int().positive(),
});

export async function createCaseAction(values: z.infer<typeof CreateCaseSchema>) {
  const validatedFields = CreateCaseSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid input');
  }

  const { amount, agingDays, customerName } = validatedFields.data;

  // AI-based prioritization
  const prioritizationResult = await prioritizeCasesWithML({
    amount,
    agingDays,
    historicalSuccessRate: Math.random() * 0.4 + 0.5, // Mock rate between 50-90%
  });

  const { recoveryProbability, urgencyScore, recommendation } = prioritizationResult;

  await addCase({
    customerName,
    amount,
    agingDays,
    status: 'New',
    recoveryProbability,
    urgencyScore,
    recommendedStrategy: recommendation,
  });

  revalidatePath('/dashboard');
}

export async function runAgenticAllocationAction() {
    const newCases = await getCases({ status: 'New' });
    const dcas = await getDCAs();

    if (newCases.length === 0) {
        return { allocatedCount: 0 };
    }
    
    let allocatedCount = 0;
    
    // Sort DCAs by a score that balances reputation and available capacity
    const sortedDcas = dcas.sort((a, b) => {
        const scoreA = a.reputationScore * (1 - (a.currentLoad / a.capacity));
        const scoreB = b.reputationScore * (1 - (b.currentLoad / b.capacity));
        return scoreB - scoreA;
    });

    for (const caseData of newCases) {
        const bestDca = sortedDcas.find(d => (d.currentLoad < d.capacity));

        if(bestDca) {
            const explanationResult = await explainAgenticAllocation({
                caseId: caseData.id,
                dcaId: bestDca.id,
                agencyReputationScore: bestDca.reputationScore,
                currentLoad: bestDca.currentLoad,
                capacity: bestDca.capacity,
                slaBreachRisk: caseData.sla.breachRisk
            });
            
            const newLogEntry: CaseActivityLog = {
                id: `log-${caseData.id}-${caseData.history.length + 1}`,
                caseId: caseData.id,
                timestamp: new Date().toISOString(),
                activity: `Case assigned to ${bestDca.name}.`,
                user: "Agentic Allocator",
                explanation: explanationResult.explanation,
            };

            await updateCase(caseData.id, {
                assignedDCAId: bestDca.id,
                status: 'Assigned',
                history: [ ...caseData.history, newLogEntry ]
            });

            allocatedCount++;
        }
    }
    
    revalidatePath('/dashboard');
    return { allocatedCount };
}
