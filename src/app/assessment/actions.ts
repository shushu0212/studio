'use server';

import { recommendBooks } from '@/ai/flows/dynamic-book-recommendations';
import { type Weakness } from '@/lib/data';

const weaknessToPrompt = {
    'communication': '溝通能力不足 (Poor Communication Skills)',
    'decision-making': '決策與責任感不足 (Lacks Decision-Making and Accountability)',
    'holistic-leadership': '全面領導技巧不足 (Lacks Holistic Leadership Skills)',
}

export async function getBookRecommendation(weakness: Weakness) {
  const leadershipWeakness = weaknessToPrompt[weakness];
  try {
    const recommendation = await recommendBooks({ leadershipWeakness });
    return recommendation;
  } catch (error) {
    console.error(`Error getting book recommendation for weakness "${weakness}":`, error);
    throw new Error('Failed to get book recommendation from AI service.');
  }
}
