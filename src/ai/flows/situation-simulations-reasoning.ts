'use server';

/**
 * @fileOverview Provides leadership scenario simulations with AI-generated reasoning for best practices.
 *
 * - `simulateLeadershipScenario` - A function that handles the leadership scenario simulation process.
 * - `SituationSimulationsInput` - The input type for the `simulateLeadershipScenario` function.
 * - `SituationSimulationsOutput` - The return type for the `simulateLeadershipScenario` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SituationSimulationsInputSchema = z.object({
  scenario: z.string().describe('A description of a leadership scenario.'),
  userResponse: z.string().describe('The user\'s chosen response to the scenario.'),
});
export type SituationSimulationsInput = z.infer<typeof SituationSimulationsInputSchema>;

const SituationSimulationsOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user\'s response.'),
  reasoning: z.string().describe('AI-generated reasoning for the best practice in this scenario.'),
});
export type SituationSimulationsOutput = z.infer<typeof SituationSimulationsOutputSchema>;

export async function simulateLeadershipScenario(input: SituationSimulationsInput): Promise<SituationSimulationsOutput> {
  return situationSimulationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'situationSimulationsPrompt',
  input: {schema: SituationSimulationsInputSchema},
  output: {schema: SituationSimulationsOutputSchema},
  prompt: `You are a leadership expert providing feedback on leadership scenarios.

Scenario: {{{scenario}}}
User Response: {{{userResponse}}}

Provide feedback on the user's response and reasoning for the best practice.

Output in the following format:
Feedback: [Feedback on the user's response]
Reasoning: [AI-generated reasoning for the best practice]`,
});

const situationSimulationsFlow = ai.defineFlow(
  {
    name: 'situationSimulationsFlow',
    inputSchema: SituationSimulationsInputSchema,
    outputSchema: SituationSimulationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
