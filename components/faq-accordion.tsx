type FaqAccordionItem = {
  id?: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  className?: string;
  itemClassName?: string;
  summaryClassName?: string;
  answerClassName?: string;
};

export function FaqAccordion({
  items,
  className = "mt-8 space-y-4",
  itemClassName = "rounded-[1.25rem] border border-[color:var(--color-border)] bg-white px-5 py-4",
  summaryClassName = "cursor-pointer font-semibold text-[color:var(--color-heading)]",
  answerClassName = "mt-3 text-[color:var(--color-text-muted)]",
}: FaqAccordionProps) {
  return (
    <div className={className}>
      {items.map((faq, index) => (
        <details key={faq.id ?? `${faq.question}-${index}`} className={itemClassName}>
          <summary className={summaryClassName}>{faq.question}</summary>
          <p className={answerClassName}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
