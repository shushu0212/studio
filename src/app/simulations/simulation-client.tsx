'use client';

import { useState } from 'react';
import type { Simulation } from '@/lib/data';
import { getSimulationFeedback } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { SituationSimulationsOutput } from '@/ai/flows/situation-simulations-reasoning';


interface SimulationClientProps {
  simulations: Simulation[];
}

export function SimulationClient({ simulations }: SimulationClientProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<SituationSimulationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentScenario = simulations[currentScenarioIndex];

  const handleOptionSelect = async (option: string) => {
    setSelectedOption(option);
    setIsLoading(true);
    setFeedback(null);
    try {
      const result = await getSimulationFeedback(currentScenario.scenario, option);
      setFeedback(result);
    } catch (error) {
      console.error("Failed to get simulation feedback:", error);
      toast({
        title: "Error",
        description: "Could not fetch feedback. Please try again.",
        variant: "destructive",
      });
      setSelectedOption(null); // Allow re-trying
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextScenario = () => {
    const nextIndex = (currentScenarioIndex + 1) % simulations.length;
    setCurrentScenarioIndex(nextIndex);
    setSelectedOption(null);
    setFeedback(null);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <p className="text-sm text-muted-foreground">Scenario {currentScenario.id} of {simulations.length}</p>
        <CardTitle className="font-headline text-2xl !mt-2">{currentScenario.scenario}</CardTitle>
        <CardDescription>選擇您認為最合適的回應：</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-3">
          {currentScenario.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? 'default' : 'outline'}
              className="h-auto justify-start text-left whitespace-normal py-3"
              onClick={() => handleOptionSelect(option)}
              disabled={isLoading || !!selectedOption}
            >
              {isLoading && selectedOption === option && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {selectedOption === option && !isLoading && <CheckCircle className="mr-2 h-4 w-4" />}
              {option}
            </Button>
          ))}
        </div>

        {feedback && (
          <Alert className="mt-6 animate-in fade-in-50" variant="default">
            <Sparkles className="h-4 w-4" />
            <AlertTitle className="font-headline text-lg flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/> AI 專家回饋</AlertTitle>
            <AlertDescription className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold">關於您的選擇：</h4>
                <p className="text-muted-foreground">{feedback.feedback}</p>
              </div>
              <div>
                <h4 className="font-semibold">最佳實踐與解析：</h4>
                <p className="text-muted-foreground">{feedback.reasoning}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {feedback && (
          <div className="flex justify-end pt-4">
             <Button onClick={handleNextScenario}>
                Next Scenario <ArrowRight className="ml-2 h-4 w-4"/>
             </Button>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
