'use server';

/**
 * @fileOverview A dynamic book recommendation AI agent that recommends books based on leadership weaknesses identified from a quiz.
 *
 * - recommendBooks - A function that handles the book recommendation process.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendBooksInputSchema = z.object({
  leadershipWeakness: z
    .string()
    .describe(
      'A string describing the leadership weakness identified from the leadership style assessment.'
    ),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  bookTitle: z.string().describe('The title of the recommended book.'),
  bookDescription: z.string().describe('A brief description of the book.'),
  purchaseLink: z
    .string()
    .url()
    .describe('A link to purchase the book on Books.com.tw.'),
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const hardcodedBooks: Record<string, RecommendBooksOutput> = {
  '溝通能力不足 (Poor Communication Skills)': {
    bookTitle: '關鍵溝通：如何當一個有好關係也能把事做好的人',
    bookDescription:
      '本書提供處理高難度對話的技巧，幫助您在任何情況下都能進行有效溝-通，達成目標。',
    purchaseLink: 'https://www.books.com.tw/products/0010937328',
  },
  '決策與責任感不足 (Lacks Decision-Making and Accountability)': {
    bookTitle: '高勝算決策：如何在複雜世界做出更好的選擇？',
    bookDescription:
      '學習如何在資訊不完整的情況下做出更明智的決策，並擁抱不確定性，提升決策品質。',
    purchaseLink: 'https://www.books.com.tw/products/0010821696',
  },
  '全面領導技巧不足 (Lacks Holistic Leadership Skills)': {
    bookTitle: '從Ａ到Ａ+：企業從優秀到卓越的奧祕',
    bookDescription:
      '經典管理學著作，探討企業如何從優秀躍升至卓越，強調第五級領導、找對人才等全面性領導思維。',
    purchaseLink: 'https://www.books.com.tw/products/0010342936',
  },
};


const recommendBooksFlow = ai.defineFlow(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async ({ leadershipWeakness }) => {
    // Return a hardcoded book based on the weakness
    return hardcodedBooks[leadershipWeakness] || hardcodedBooks['溝通能力不足 (Poor Communication Skills)'];
  }
);
