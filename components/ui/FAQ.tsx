'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
  initiallyExpanded?: boolean;
}

/**
 * FAQ component for displaying frequently asked questions
 * Features expandable/collapsible answers
 */
const FAQ: React.FC<FAQProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our windows and doors",
  faqs,
  className,
  initiallyExpanded = false,
}) => {
  // Track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    faqs.reduce((acc, _, index) => {
      acc[index] = initiallyExpanded;
      return acc;
    }, {} as Record<number, boolean>)
  );

  // Toggle FAQ item expansion
  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={cn("", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && <h2 className="text-3xl font-bold text-ww-dark-gray mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            {/* Question (always visible) */}
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ww-blue"
              onClick={() => toggleItem(index)}
              aria-expanded={expandedItems[index]}
            >
              <span className="font-medium text-ww-dark-gray">{faq.question}</span>
              <svg
                className={cn(
                  "h-5 w-5 text-ww-blue transition-transform duration-200",
                  expandedItems[index] ? "transform rotate-180" : ""
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Answer (expandable) */}
            <div
              className={cn(
                "px-6 pb-4 text-gray-600 transition-all duration-200 overflow-hidden",
                expandedItems[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="pt-2 border-t border-gray-100">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FAQ };
