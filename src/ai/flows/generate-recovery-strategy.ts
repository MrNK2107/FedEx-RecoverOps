'use server';

/**
 * @fileOverview Generates a recovery strategy for an overdue case using GenAI.
 *
 * - generateRecoveryStrategy - A function that generates a recovery strategy.
 * - GenerateRecoveryStrategyInput - The input type for the generateRecoveryStrategy function.
 * - GenerateRecoveryStrategyOutput - The return type for the generateRecoveryStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecoveryStrategyInputSchema = z.object({
  amount: z.number().describe('The amount overdue for the case.'),
  ageingDays: z.number().describe('The number of days the case is overdue.'),
  historicalSuccess: z.string().describe('Mock historical success data for similar cases.'),
});
export type GenerateRecoveryStrategyInput = z.infer<typeof GenerateRecoveryStrategyInputSchema>;

const GenerateRecoveryStrategyOutputSchema = z.object({
  recoveryApproach: z.string().describe('The recommended recovery approach for the case.'),
  explanation: z.string().describe('The explanation for the recommended recovery approach.'),
});
export type GenerateRecoveryStrategyOutput = z.infer<typeof GenerateRecoveryStrategyOutputSchema>;

export async function generateRecoveryStrategy(
  input: GenerateRecoveryStrategyInput
): Promise<GenerateRecoveryStrategyOutput> {
  return generateRecoveryStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecoveryStrategyPrompt',
  input: {schema: GenerateRecoveryStrategyInputSchema},
  output: {schema: GenerateRecoveryStrategyOutputSchema},
  prompt: `You are an AI assistant helping FedEx Admin to recover overdue cases.

  Based on the amount, ageing days and historical success data, you will suggest a recovery strategy and explain why you recommend that strategy.

  Amount: {{amount}}
  Ageing Days: {{ageingDays}}
  Historical Success Data: {{historicalSuccess}}

  Your output should contain a recoveryApproach field and an explanation field.
  The recoveryApproach field should be one of the following: soft reminder, aggressive follow-up, settlement offer, legal escalation.
  The explanation field should explain why you recommend that strategy.
  `,
});

const generateRecoveryStrategyFlow = ai.defineFlow(
  {
    name: 'generateRecoveryStrategyFlow',
    inputSchema: GenerateRecoveryStrategyInputSchema,
    outputSchema: GenerateRecoveryStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
