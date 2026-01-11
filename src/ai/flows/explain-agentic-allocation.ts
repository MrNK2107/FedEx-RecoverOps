'use server';

/**
 * @fileOverview A flow that explains the automated case assignment decisions made by the Agentic Allocation Engine.
 *
 * - explainAgenticAllocation - A function that generates human-readable explanations for case assignment decisions.
 * - ExplainAgenticAllocationInput - The input type for the explainAgenticAllocation function.
 * - ExplainAgenticAllocationOutput - The return type for the explainAgenticAllocation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAgenticAllocationInputSchema = z.object({
  caseId: z.string().describe('The ID of the case that was assigned.'),
  dcaId: z.string().describe('The ID of the Debt Collection Agency to which the case was assigned.'),
  agencyReputationScore: z.number().describe('The reputation score of the agency.'),
  currentLoad: z.number().describe('The current workload of the agency.'),
  capacity: z.number().describe('The capacity of the agency.'),
  slaBreachRisk: z.number().describe('The risk of breaching the SLA for this case.'),
});
export type ExplainAgenticAllocationInput = z.infer<typeof ExplainAgenticAllocationInputSchema>;

const ExplainAgenticAllocationOutputSchema = z.object({
  explanation: z.string().describe('A human-readable explanation of the case assignment decision.'),
});
export type ExplainAgenticAllocationOutput = z.infer<typeof ExplainAgenticAllocationOutputSchema>;

export async function explainAgenticAllocation(
  input: ExplainAgenticAllocationInput
): Promise<ExplainAgenticAllocationOutput> {
  return explainAgenticAllocationFlow(input);
}

//prompt
const prompt = ai.definePrompt({
  name: 'explainAgenticAllocationPrompt',
  input: {schema: ExplainAgenticAllocationInputSchema},
  output: {schema: ExplainAgenticAllocationOutputSchema},
  prompt: `You are an expert in explaining automated decisions in a clear and concise manner for an enterprise system.

  You are explaining why case {{caseId}} was assigned to DCA {{dcaId}}.

  Consider the following factors:
  - Agency Reputation Score: {{agencyReputationScore}} (out of 100)
  - Agency Utilization: {{Math.round((currentLoad / capacity) * 100)}}%
  - Case SLA Breach Risk: {{Math.round(slaBreachRisk * 100)}}%

  Generate a human-readable explanation for this assignment decision. The explanation should be a single, professional sentence. It must be specific, mentioning at least two of the provided factors to justify the decision.
  Example: "Assignment was based on the agency's strong reputation score of 95 and low utilization, ensuring capacity for this high-risk case."
  `,
});


const explainAgenticAllocationFlow = ai.defineFlow(
  {
    name: 'explainAgenticAllocationFlow',
    inputSchema: ExplainAgenticAllocationInputSchema,
    outputSchema: ExplainAgenticAllocationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
