import React from 'react';
import { motion } from 'framer-motion';

interface MatchScoreCircleProps {
  score: number;
  size?: number;
}

export const MatchScoreCircle: React.FC<MatchScoreCircleProps> = ({ score, size = 64 }) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-accent-green';
    if (s >= 60) return 'text-accent-amber';
    return 'text-accent-red';
  };

  const getScoreBg = (s: number) => {
    if (s >= 80) return 'text-mint-green';
    if (s >= 60) return 'text-soft-yellow';
    return 'text-pastel-pink';
  };

  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          className={`${getScoreBg(score)}`}
          stroke="currentColor"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          className={`${getScoreColor(score)} drop-shadow-md`}
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span 
          className="font-black tracking-tighter"
          style={{ fontSize: size * 0.35 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
      </div>
    </div>
  );
};
