import React from 'react';
import { Users, Code2, Settings2, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useDevOpsOverview } from '@/features/devops/hooks/useDevOpsOverview';

interface TeamMemberRowProps {
  icon: React.ReactNode;
  label: string;
  count: number;
}

const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ icon, label, count }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3 text-gray-600">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold text-gray-800">{count}</span>
  </div>
);

export const TeamCompositionCard: React.FC = () => {
  const { data, loading, error } = useDevOpsOverview();

  if (loading) {
    return <div className="h-48 rounded-xl bg-gray-100 animate-pulse" />;
  }

  if (error || !data) {
    return <p className="text-sm text-red-500">Erreur lors du chargement de l'équipe.</p>;
  }

  const { team } = data;
  const total = team.developers + team.devops + team.productOwner + team.cto;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Composition de l'équipe
        </h3>
        <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-2 py-1 rounded-full">
          {total} membres
        </span>
      </div>
      <TeamMemberRow icon={<Code2 size={16} />} label="Développeurs" count={team.developers} />
      <TeamMemberRow icon={<Settings2 size={16} />} label="DevOps" count={team.devops} />
      <TeamMemberRow icon={<Briefcase size={16} />} label="Product Owner" count={team.productOwner} />
      <TeamMemberRow icon={<Users size={16} />} label="CTO" count={team.cto} />
    </Card>
  );
};
