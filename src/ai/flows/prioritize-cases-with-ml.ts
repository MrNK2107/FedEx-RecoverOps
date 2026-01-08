'use server';
/**
 * @fileOverview An ML-based case prioritization AI agent.
 *
 * - prioritizeCasesWithML - A function that prioritizes cases based on ML scoring.
 * - PrioritizeCasesWithMLInput - The input type for the prioritizeCasesWithML function.
 * - PrioritizeCasesWithMLOutput - The return type for the prioritizeCasesWithML function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeCasesWithMLInputSchema = z.object({
  amount: z.number().describe('The amount of the case.'),
  agingDays: z.number().describe('The number of days the case has been aging.'),
  historicalSuccessRate: z
    .number()
    .describe('The historical success rate of similar cases.'),
});
export type PrioritizeCasesWithMLInput = z.infer<typeof PrioritizeCasesWithMLInputSchema>;

const PrioritizeCasesWithMLOutputSchema = z.object({
  recoveryProbability: z
    .number()
    .describe('The probability of recovery, between 0 and 1.'),
  urgencyScore: z.number().describe('The urgency score of the case, between 0 and 100.'),
  recommendation: z.string().describe('Recommended next steps for the case.'),
});
export type PrioritizeCasesWithMLOutput = z.infer<typeof PrioritizeCasesWithMLOutputSchema>;

export async function prioritizeCasesWithML(
  input: PrioritizeCasesWithMLInput
): Promise<PrioritizeCasesWithMLOutput> {
  return prioritizeCasesWithMLFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeCasesWithMLPrompt',
  input: {schema: PrioritizeCasesWithMLInputSchema},
  output: {schema: PrioritizeCasesWithMLOutputSchema},
  prompt: `You are an expert in case prioritization and recovery.

  Based on the amount, aging days, and historical success rate of similar cases, determine the recovery probability and urgency score for the case.  The recoveryProbability should be a number between 0 and 1 (inclusive). The urgencyScore should be a number between 0 and 100 (inclusive).

  Also, provide a brief recommendation for the next steps to take for the case.

  Amount: {{{amount}}}
  Aging Days: {{{agingDays}}}
  Historical Success Rate: {{{historicalSuccessRate}}}

  Output the recoveryProbability, urgencyScore and recommendation in JSON format.
  `,
});

const prioritizeCasesWithMLFlow = ai.defineFlow(
  {
    name: 'prioritizeCasesWithMLFlow',
    inputSchema: PrioritizeCasesWithMLInputSchema,
    outputSchema: PrioritizeCasesWithMLOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
