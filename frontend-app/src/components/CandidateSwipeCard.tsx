import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, useAnimation } from 'framer-motion';
import { Candidate, Decision } from '../types';
import { MatchScoreCircle } from './MatchScoreCircle';
import { SkillTag } from './SkillTag';
import { MapPin, Briefcase } from 'lucide-react';

interface CandidateSwipeCardProps {
  candidate: Candidate;
  isFront: boolean;
  onSwipe: (decision: Decision) => void;
  index: number;
}

export const CandidateSwipeCard: React.FC<CandidateSwipeCardProps> = ({ 
  candidate, isFront, onSwipe, index 
}) => {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95]);
  const rotate = useTransform(x, [-150, 0, 150], [-8, 0, 8]);
  
  // Opacity overlays for dragging feedback
  const rightOpacity = useTransform(x, [20, 100], [0, 1]);
  const leftOpacity = useTransform(x, [-20, -100], [0, 1]);
  const upOpacity = useTransform(y, [-20, -100], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocityThreshold = 500;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      setExitX(300);
      onSwipe('Shortlist');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      setExitX(-300);
      onSwipe('Reject');
    } else if (info.offset.y < -threshold || info.velocity.y < -velocityThreshold) {
      setExitY(-300);
      onSwipe('Hold');
    }
  };

  // Stack styling logic
  const isSecond = index === 1;
  const isThird = index === 2;

  const getAiBadgeColor = (action: string) => {
    switch(action) {
      case 'Shortlist': return 'badge-green';
      case 'Hold': return 'badge-amber';
      case 'Reject': return 'badge-red';
      default: return 'badge-blue';
    }
  };

  // Only render up to 3 cards for performance and visual clarity
  if (index > 2) return null;

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        y: isFront ? y : (isSecond ? 15 : isThird ? 30 : 0),
        rotate: isFront ? rotate : 0,
        scale: isFront ? scale : (isSecond ? 0.95 : isThird ? 0.9 : 1),
        zIndex: 10 - index,
        position: 'absolute',
      }}
      drag={isFront ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={isFront && (exitX !== 0 || exitY !== 0) ? { 
        x: exitX, 
        y: exitY, 
        opacity: 0, 
        scale: 0.8 
      } : { 
        x: 0, y: isSecond ? 15 : isThird ? 30 : 0, scale: isSecond ? 0.95 : isThird ? 0.9 : 1 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`w-full max-w-sm h-[600px] bg-white rounded-[2rem] shadow-neu flex flex-col overflow-hidden will-change-transform ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {/* Overlays */}
      <motion.div className="swipe-overlay bg-accent-green/20 text-accent-green" style={{ opacity: rightOpacity }}>
        SHORTLIST
      </motion.div>
      <motion.div className="swipe-overlay bg-accent-red/20 text-accent-red" style={{ opacity: leftOpacity }}>
        REJECT
      </motion.div>
      <motion.div className="swipe-overlay bg-accent-amber/20 text-accent-amber" style={{ opacity: upOpacity }}>
        HOLD
      </motion.div>

      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl font-black leading-none mb-1">{candidate.name}</h3>
            <p className="text-sm font-semibold text-text-secondary flex items-center gap-1 mb-1">
              <Briefcase size={14} /> {candidate.currentRole}
            </p>
            <p className="text-xs font-medium text-text-secondary flex items-center gap-1">
              <MapPin size={14} /> {candidate.location} · {candidate.yearsExp}y exp
            </p>
          </div>
          <MatchScoreCircle score={candidate.matchScore} size={70} />
        </div>

        <div className="bg-lavender/30 rounded-2xl p-4 mt-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1 block">AI Recommendation</span>
          <div className="flex items-center gap-2">
            <span className={`badge ${getAiBadgeColor(candidate.recommendation)}`}>
              {candidate.recommendation}
            </span>
            <span className="text-sm font-bold opacity-80">{candidate.label}</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2 block">Key Strengths</span>
          <ul className="space-y-1">
            {candidate.reasonsToSwipeRight.map((reason, i) => (
              <li key={i} className="text-sm flex items-start gap-2 font-medium">
                <span className="text-accent-green mt-0.5">✓</span> {reason}
              </li>
            ))}
          </ul>
        </div>

        {candidate.risks.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2 block">Risks / To Verify</span>
            <ul className="space-y-1">
              {candidate.risks.map((risk, i) => (
                <li key={i} className="text-sm flex items-start gap-2 font-medium">
                  <span className="text-accent-amber mt-0.5">!</span> {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2 block">Top Skills</span>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 5).map((skill, i) => (
              <SkillTag key={i} skill={skill} delay={isFront ? i * 0.1 : 0} />
            ))}
            {candidate.skills.length > 5 && (
              <span className="text-xs text-text-secondary self-center font-medium">+{candidate.skills.length - 5} more</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Visual hint for dragging */}
      <div className="bg-gray-50 h-10 flex items-center justify-center border-t border-gray-100 pointer-events-none">
        <span className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-widest">Swipe to decide</span>
      </div>
    </motion.div>
  );
};
