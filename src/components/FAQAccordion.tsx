import { useState } from 'react';

export interface FAQItem {
  q: string;
  a: string;
  segment?: 'giulia' | 'laura' | 'shared';
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQAccordion({ items, defaultOpenIndex = -1 }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number>(defaultOpenIndex);

  return (
    <div className="divide-y divide-brand-border rounded-lg border border-brand-border bg-white">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        const id = `faq-${idx}`;
        return (
          <div key={idx}>
            <button
              type="button"
              id={`${id}-trigger`}
              aria-controls={`${id}-panel`}
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
            >
              <span className="font-semibold text-brand-ink">{item.q}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`h-5 w-5 flex-shrink-0 text-brand-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-trigger`}
                className="px-5 pb-5 text-sm leading-relaxed text-brand-ink/85"
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
