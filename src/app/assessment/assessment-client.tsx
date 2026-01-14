'use client';

import { useState } from 'react';
import Image from 'next/image';
import { quizQuestions, weaknessInfo, type Weakness } from '@/lib/data';
import { getBookRecommendation } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, BookOpen, Repeat, ArrowRight } from 'lucide-react';
import type { RecommendBooksOutput } from '@/ai/flows/dynamic-book-recommendations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

type Step = 'start' | 'quiz' | 'loading' | 'results';

export function AssessmentClient() {
  const [step, setStep] = useState<Step>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Weakness[]>([]);
  const [result, setResult] = useState<{ weakness: Weakness; book: RecommendBooksOutput } | null>(null);
  const { toast } = useToast();

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = async (weakness: Weakness) => {
    const newAnswers = [...answers, weakness];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('loading');
      try {
        const weaknessCounts = newAnswers.reduce((acc, w) => {
          acc[w] = (acc[w] || 0) + 1;
          return acc;
        }, {} as Record<Weakness, number>);

        const primaryWeakness = Object.keys(weaknessCounts).reduce((a, b) =>
          weaknessCounts[a as Weakness] > weaknessCounts[b as Weakness] ? a : b
        ) as Weakness;

        const bookRecommendation = await getBookRecommendation(primaryWeakness);
        setResult({ weakness: primaryWeakness, book: bookRecommendation });
        setStep('results');
      } catch (error) {
        console.error("Failed to get book recommendation:", error);
        toast({
          title: "Error",
          description: "Could not fetch recommendation. Please try again.",
          variant: "destructive",
        });
        setStep('quiz'); // Go back to quiz to allow retry
      }
    }
  };

  const bookPlaceholder = PlaceHolderImages.find(p => p.id === 'book-cover');

  if (step === 'start') {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">探索您的領導潛能</CardTitle>
          <CardDescription className="pt-2">
            本測驗將透過一系列情境問題，幫助您了解自己的領導風格，並找出可以精進的方向。準備好開始了嗎？
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleStart} className="w-full">
            開始測驗 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === 'quiz') {
    const question = quizQuestions[currentQuestionIndex];
    return (
      <Card>
        <CardHeader>
          <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="w-full" />
          <p className="text-sm text-muted-foreground text-center pt-2">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </p>
          <CardTitle className="font-headline text-2xl text-center !mt-4">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="h-auto whitespace-normal py-4"
              onClick={() => handleAnswer(option.value)}
            >
              {option.text}
            </Button>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-card-foreground shadow-sm">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">分析您的結果中...</p>
      </div>
    );
  }

  if (step === 'results' && result) {
    const weaknessDetails = weaknessInfo[result.weakness];
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">您的領導力分析結果</CardTitle>
          <CardDescription>根據您的回答，我們發現您在以下方面有巨大的成長潛力：</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="rounded-lg border bg-background p-6">
            <h3 className="font-headline text-2xl text-primary">{weaknessDetails.title}</h3>
            <p className="mt-2 text-muted-foreground">{weaknessDetails.description}</p>
            <p className="mt-4 font-semibold">{weaknessDetails.recommendation}</p>
          </div>

          <div className="rounded-lg border bg-background p-6">
             <h3 className="font-headline text-2xl flex items-center gap-2"><BookOpen className="h-6 w-6 text-accent"/> 延伸閱讀推薦</h3>
             <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
                {bookPlaceholder && (
                    <Image
                        src={bookPlaceholder.imageUrl}
                        alt={result.book.bookTitle}
                        width={150}
                        height={225}
                        className="rounded-md shadow-lg"
                        data-ai-hint={bookPlaceholder.imageHint}
                    />
                )}
                <div className="flex-1">
                    <h4 className="font-bold text-lg">{result.book.bookTitle}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{result.book.bookDescription}</p>
                    <Button asChild className="mt-4" variant="default">
                        <a href={result.book.purchaseLink} target="_blank" rel="noopener noreferrer">
                            前往博客來購買
                        </a>
                    </Button>
                </div>
             </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStart} variant="secondary" className="w-full">
            <Repeat className="mr-2 h-4 w-4" />
            重新測驗
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
}
