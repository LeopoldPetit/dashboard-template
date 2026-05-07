import React, { useState } from "react";
import { Users, UserCheck, UserPlus, UserMinus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useBusinessUsers } from "@/features/business/hooks/useBusinessUsers";
import { postBusinessUsers } from "@/services/api/business";

type EditableField =
  | "total"
  | "activeMonthly"
  | "newThisMonth"
  | "churnedThisMonth";

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  rawValue: number;
  color: string;
  fieldKey: EditableField;
  onSave: (key: EditableField, value: number) => Promise<void>;
}

const StatRow: React.FC<StatRowProps> = ({
  icon,
  label,
  value,
  rawValue,
  color,
  fieldKey,
  onSave,
}) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setInput(String(rawValue));
    setEditing(true);
  };

  const commit = async () => {
    const num = Number(input);
    if (!isNaN(num) && num >= 0) {
      setSaving(true);
      try {
        await onSave(fieldKey, num);
      } finally {
        setSaving(false);
      }
    }
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void commit();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`p-2 rounded-lg ${color}`}>{icon}</span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      {editing ? (
        <input
          autoFocus
          type="number"
          min="0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => void commit()}
          onKeyDown={handleKey}
          disabled={saving}
          className="w-28 text-right text-sm font-semibold border-b-2 border-violet-400 bg-transparent focus:outline-none"
        />
      ) : (
        <span
          title="Double-cliquez pour modifier"
          onDoubleClick={startEdit}
          className="text-sm font-semibold text-gray-900 cursor-pointer select-none hover:text-violet-600 transition-colors"
        >
          {value}
        </span>
      )}
    </div>
  );
};

export const UserStatsCard: React.FC = () => {
  const { data, loading, error, refetch } = useBusinessUsers();

  if (loading) {
    return <div className="h-64 rounded-xl bg-gray-100 animate-pulse" />;
  }

  if (error || !data) {
    return (
      <p className="text-sm text-red-500">
        Erreur lors du chargement des stats utilisateurs.
      </p>
    );
  }

  const { users } = data;

  const handleSave = async (key: EditableField, newValue: number) => {
    await postBusinessUsers({ ...users, [key]: newValue });
    refetch();
  };

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Utilisateurs — ce mois
        <span className="ml-2 text-xs font-normal text-gray-400">
          (double-clic pour modifier)
        </span>
      </h3>
      <StatRow
        icon={<Users size={16} className="text-violet-600" />}
        label="Total inscrits"
        value={users.total.toLocaleString()}
        rawValue={users.total}
        color="bg-violet-50"
        fieldKey="total"
        onSave={handleSave}
      />
      <StatRow
        icon={<UserCheck size={16} className="text-emerald-600" />}
        label="Actifs mensuels"
        value={users.activeMonthly.toLocaleString()}
        rawValue={users.activeMonthly}
        color="bg-emerald-50"
        fieldKey="activeMonthly"
        onSave={handleSave}
      />
      <StatRow
        icon={<UserPlus size={16} className="text-blue-600" />}
        label="Nouveaux ce mois"
        value={`+${users.newThisMonth.toLocaleString()}`}
        rawValue={users.newThisMonth}
        color="bg-blue-50"
        fieldKey="newThisMonth"
        onSave={handleSave}
      />
      <StatRow
        icon={<UserMinus size={16} className="text-red-500" />}
        label="Churned ce mois"
        value={`-${users.churnedThisMonth.toLocaleString()}`}
        rawValue={users.churnedThisMonth}
        color="bg-red-50"
        fieldKey="churnedThisMonth"
        onSave={handleSave}
      />
    </Card>
  );
};
