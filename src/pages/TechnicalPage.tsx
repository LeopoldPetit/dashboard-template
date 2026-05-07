import { Card } from '@/components/ui/Card';
import { Activity } from 'lucide-react';

export default function TechnicalPage() {
  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <Activity size={40} className="text-violet-400 mb-4" />
        <h2 className="text-lg font-semibold text-gray-700">Technical Overview</h2>
        <p className="text-sm text-gray-400 mt-1">Coming soon — connect your WireMock backend.</p>
      </Card>
    </div>
  );
}
