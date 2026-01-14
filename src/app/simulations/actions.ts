'use server';

import { simulateLeadershipScenario } from '@/ai/flows/situation-simulations-reasoning';

export async function getSimulationFeedback(scenario: string, userResponse: string) {
  try {
    const result = await simulateLeadershipScenario({ scenario, userResponse });
    return result;
  } catch (error) {
    console.error(`Error getting simulation feedback for scenario "${scenario}":`, error);
    throw new Error('Failed to get simulation feedback from AI service.');
  }
}
