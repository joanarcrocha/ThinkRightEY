import React from 'react';
import { motion } from 'framer-motion';
import { Role } from '../types';
import { Users, Target, ArrowRight } from 'lucide-react';

interface RoleCardProps {
  role: Role;
  onClick: () => void;
  delay?: number;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onClick, delay = 0 }) => {
  const getPipelineColor = (health: string) => {
    switch (health) {
      case 'Strong': return 'bg-accent-green';
      case 'Moderate': return 'bg-accent-amber';
      case 'Weak': return 'bg-accent-red';
      default: return 'bg-gray-400';
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'badge-green';
      case 'Medium': return 'badge-amber';
      case 'Hard': return 'badge-red';
      default: return 'badge-blue';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onClick={onClick}
      className="glass-card p-5 cursor-pointer hover:-translate-y-1 hover:shadow-soft-lg transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-1 block">
            {role.department}
          </span>
          <h3 className="text-lg font-bold leading-tight">{role.title}</h3>
        </div>
        <span className={`badge ${getDifficultyBadge(role.difficulty)}`}>
          {role.difficulty}
        </span>
      </div>

      <div className="text-sm text-text-secondary flex items-center gap-1 mb-4">
        <span>📍 {role.location}</span>
      </div>

      <div className="flex gap-4 mb-5">
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-xs font-medium text-text-secondary">
            <Users size={14} /> Candidates
          </span>
          <span className="text-xl font-black">{role.candidatesCount}</span>
        </div>
        <div className="flex flex-col border-l border-gray-200 pl-4">
          <span className="flex items-center gap-1 text-xs font-medium text-text-secondary">
            <Target size={14} /> Top Match
          </span>
          <span className="text-xl font-black text-accent-green">{role.topMatchScore}%</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-text-secondary">Pipeline Health</span>
          <span className="text-xs font-bold">{role.pipelineHealth}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full rounded-full ${getPipelineColor(role.pipelineHealth)}`}
            initial={{ width: 0 }}
            animate={{ width: role.pipelineHealth === 'Strong' ? '90%' : role.pipelineHealth === 'Moderate' ? '60%' : '30%' }}
            transition={{ delay: delay + 0.2, duration: 1 }}
          />
        </div>
      </div>

      <button className="w-full py-3 bg-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 group">
        Review Candidates
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};
