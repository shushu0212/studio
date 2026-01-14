import { SimulationClient } from './simulation-client';
import { simulations } from '@/lib/data';

export default function SimulationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">情境模擬</h1>
        <p className="mt-2 text-muted-foreground">
          在真實的領導情境中測試您的判斷力，並學習最佳實踐。
        </p>
      </div>
      <SimulationClient simulations={simulations} />
    </div>
  );
}
