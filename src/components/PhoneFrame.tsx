import React from 'react';
import { useReducedMotion } from 'framer-motion';
import './PhoneFrame.css';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  tiltOnHover?: boolean;
  style?: React.CSSProperties;
}

export function PhoneFrame({ children, className = '', tiltOnHover = false, style }: PhoneFrameProps) {
  const shouldReduceMotion = useReducedMotion();
  const enableTilt = tiltOnHover && !shouldReduceMotion;

  return (
    <div 
      className={`phone-frame ${enableTilt ? 'tilt-on-hover' : ''} ${className}`}
      style={style}
    >
      <div className="phone-bezel">
        <div className="phone-screen" style={{ padding: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
