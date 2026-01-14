import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardList, Milestone } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">LeadWise</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
          提升你的領導能力，改善團隊溝通效率。
          <br />
          Start your journey to impactful leadership today.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        <Card className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">
                Leadership Style Assessment
              </CardTitle>
            </div>
            <CardDescription className="pt-2">
              透過互動式測驗分析您的領導風格，找出您的優勢與可改善之處，並獲得個人化的建議。
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <Link href="/assessment">
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Milestone className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="font-headline text-2xl">
                Situation Simulations
              </CardTitle>
            </div>
            <CardDescription className="pt-2">
              挑戰常見的領導情境，選擇您的應對方式，並從 AI 提供的最佳實踐建議中學習。
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full" variant="secondary">
              <Link href="/simulations">
                Begin Simulations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
