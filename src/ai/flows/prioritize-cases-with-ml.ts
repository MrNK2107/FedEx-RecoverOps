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
    .describe('The probability of recovery, between 0 and 1. Higher for lower aging days and higher historical success.'),
  urgencyScore: z.number().describe('The urgency score of the case, between 0 and 100. This should be higher for larger amounts and longer aging days.'),
  recommendation: z.string().describe('A brief, one-sentence recommendation for the next step.'),
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
  system: `You are a case prioritization expert for FedEx, specializing in debt recovery. Your role is to analyze new cases and assign a \`recoveryProbability\` and an \`urgencyScore\`.

- **recoveryProbability**: A score from 0.0 to 1.0. This should DECREASE as \`agingDays\` increase. A higher \`historicalSuccessRate\` should positively influence this score.
- **urgencyScore**: A score from 0 to 100. This should INCREASE with both higher \`amount\` and higher \`agingDays\`. A very high amount or very high aging should result in a score close to 100.

Base your calculations on these rules and the provided data. Also provide a brief, one-sentence recommendation for the next step.
`,
  prompt: `
Case Data:
- Amount: {{{amount}}}
- Aging Days: {{{agingDays}}}
- Historical Success Rate: {{{historicalSuccessRate}}}

Please provide the \`recoveryProbability\`, \`urgencyScore\`, and \`recommendation\` in the required JSON format.
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
