type ReportingPanelProps = {
  bookingsTotal: number;
  completedBookings: number;
  enquiryCount: number;
  customerCount: number;
  topServices: Array<{ title: string; count: number }>;
};

export function ReportingPanel({
  bookingsTotal,
  completedBookings,
  enquiryCount,
  customerCount,
  topServices,
}: ReportingPanelProps) {
  const completionRate = bookingsTotal ? Math.round((completedBookings / bookingsTotal) * 100) : 0;

  return (
    <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      <h2 className="font-display text-2xl font-semibold">Reporting snapshot</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
          <p className="text-sm text-[color:var(--color-text-muted)]">Booking completion rate</p>
          <p className="mt-2 text-3xl font-semibold text-[color:var(--color-heading)]">{completionRate}%</p>
        </div>
        <div className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
          <p className="text-sm text-[color:var(--color-text-muted)]">Enquiries received</p>
          <p className="mt-2 text-3xl font-semibold text-[color:var(--color-heading)]">{enquiryCount}</p>
        </div>
        <div className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
          <p className="text-sm text-[color:var(--color-text-muted)]">Customer accounts</p>
          <p className="mt-2 text-3xl font-semibold text-[color:var(--color-heading)]">{customerCount}</p>
        </div>
        <div className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
          <p className="text-sm text-[color:var(--color-text-muted)]">Tracked booking records</p>
          <p className="mt-2 text-3xl font-semibold text-[color:var(--color-heading)]">{bookingsTotal}</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="font-semibold text-[color:var(--color-heading)]">Most requested services</p>
        <div className="mt-3 space-y-2">
          {topServices.map((service) => (
            <div key={service.title} className="flex items-center justify-between rounded-[1rem] bg-[color:var(--color-surface)] px-4 py-3 text-sm">
              <span className="font-medium text-[color:var(--color-heading)]">{service.title}</span>
              <span className="text-[color:var(--color-text-muted)]">{service.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
