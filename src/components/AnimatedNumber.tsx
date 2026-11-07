import { useReducedMotion } from '../useReducedMotion';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  /** Count up from zero the first time the number scrolls into view. */
  fromZeroInView?: boolean;
  duration?: number;
}

/** Tweens between values so totals and stats count instead of jumping. */
export function AnimatedNumber({ value, decimals = 0, fromZeroInView = false, duration = 0.6 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const current = useRef(display);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || (fromZeroInView && !inView)) return;
    const start = fromZeroInView && !hasAnimated.current ? 0 : current.current;
    hasAnimated.current = true;
    const controls = animate(start, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        current.current = latest;
        setDisplay(latest);
      },
    });
    return () => controls.stop();
  }, [value, inView, fromZeroInView, shouldReduceMotion, duration]);

  const shown = shouldReduceMotion ? value : display;

  return (
    <span ref={ref}>
      {shown.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
