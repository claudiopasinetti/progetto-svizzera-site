import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Step {
  n: number;
  title: string;
  duration: string;
}

interface JourneyPathProps {
  steps: Step[];
}

export default function JourneyPath({ steps }: JourneyPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-md py-8">
      <svg
        viewBox="0 0 100 600"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 0 Q 90 100 50 200 Q 10 300 50 400 Q 90 500 50 600"
          fill="none"
          stroke="#B91C1C"
          strokeWidth="2"
          strokeDasharray="6 6"
          style={{ pathLength }}
          opacity="0.4"
        />
      </svg>

      <ol className="relative z-10 space-y-12">
        {steps.map((s, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`flex items-center gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <motion.div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-secondary text-lg font-bold text-white shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {s.n}
              </motion.div>
              <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                <p className="text-xs uppercase tracking-wider text-brand-muted-foreground">{s.duration}</p>
                <p className="mt-1 font-display font-semibold text-brand-primary">{s.title}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
