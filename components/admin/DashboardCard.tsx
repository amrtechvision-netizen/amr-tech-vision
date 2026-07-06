"use client";

import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description: string;
  count?: number;
  icon: ReactNode;
  color?: string;
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  description,
  count,
  icon,
  color = "text-cyan-400",
  onClick,
}: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${color}`}>
            {title}
          </h2>

          <p className="text-gray-400 mt-2">
            {description}
          </p>

          {count !== undefined && (
            <p className="mt-4 text-3xl font-bold text-white">
              {count}
            </p>
          )}
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </div>
  );
}