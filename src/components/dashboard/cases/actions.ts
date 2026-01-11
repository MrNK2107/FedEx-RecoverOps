"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addCase } from '@/lib/data';
import { prioritizeCasesWithML } from '@/ai/flows/prioritize-cases-with-ml';

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
