import React from 'react';
import { Users, UserCheck, UserPlus, UserMinus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useBusinessUsers } from '@/features/business/hooks/useBusinessUsers';

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const StatRow: React.FC<StatRowProps> = ({ icon, label, value, color }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <span className={`p-2 rounded-lg ${color}`}>{icon}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-semibold text-gray-900">{value}</span>
  </div>
);

export const UserStatsCard: React.FC = () => {
  const { data, loading, error } = useBusinessUsers();

  if (loading) {
    return <div className="h-64 rounded-xl bg-gray-100 animate-pulse" />;
  }

  if (error || !data) {
    return <p className="text-sm text-red-500">Erreur lors du chargement des stats utilisateurs.</p>;
  }

  const { users } = data;

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Utilisateurs — ce mois</h3>
      <StatRow
        icon={<Users size={16} className="text-violet-600" />}
        label="Total inscrits"
        value={users.total.toLocaleString()}
        color="bg-violet-50"
      />
      <StatRow
        icon={<UserCheck size={16} className="text-emerald-600" />}
        label="Actifs mensuels"
        value={users.activeMonthly.toLocaleString()}
        color="bg-emerald-50"
      />
      <StatRow
        icon={<UserPlus size={16} className="text-blue-600" />}
        label="Nouveaux ce mois"
        value={`+${users.newThisMonth.toLocaleString()}`}
        color="bg-blue-50"
      />
      <StatRow
        icon={<UserMinus size={16} className="text-red-500" />}
        label="Churned ce mois"
        value={`-${users.churnedThisMonth.toLocaleString()}`}
        color="bg-red-50"
      />
    </Card>
  );
};
