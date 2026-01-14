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

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {schema: RecommendBooksInputSchema},
  output: {schema: RecommendBooksOutputSchema},
  prompt: `Based on the identified leadership weakness: "{{leadershipWeakness}}", recommend a book to help improve this weakness. Provide the book title, a brief description of the book, and a link to purchase the book on Books.com.tw.

Ensure the purchase link is a valid URL.

Adhere to the following JSON schema: {
  "type": "object",
  "properties": {
    "bookTitle": {
      "type": "string",
      "description": "The title of the recommended book.",
    },
    "bookDescription": {
      "type": "string",
      "description": "A brief description of the book.",
    },
    "purchaseLink": {
      "type": "string",
      "format": "url",
      "description": "A link to purchase the book on Books.com.tw.",
    },
  },
  "required": ["bookTitle", "bookDescription", "purchaseLink"],
}}`,
});

const recommendBooksFlow = ai.defineFlow(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
