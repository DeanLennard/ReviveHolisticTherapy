type BookingLike = {
  _id?: { toHexString(): string } | null;
  customerName: string;
  serviceTitle: string;
  bookingDate: string;
  bookingStart: string;
  status: string;
};

function buildMonthDays(referenceDate: Date) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Array<Date | null> = [];

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

export function BookingCalendar({
  bookings,
  monthLabel,
}: {
  bookings: BookingLike[];
  monthLabel: string;
}) {
  const days = buildMonthDays(new Date());

  return (
    <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold">Month view</h3>
        <p className="text-sm font-medium text-[color:var(--color-text-muted)]">{monthLabel}</p>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-text-muted)]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="min-h-28 rounded-[1rem] bg-transparent" aria-hidden="true" />;
          }

          const dayKey = day.toISOString().slice(0, 10);
          const dayBookings = bookings.filter((booking) => booking.bookingDate === dayKey);

          return (
            <div key={dayKey} className="min-h-28 rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-2">
              <p className="text-sm font-semibold text-[color:var(--color-heading)]">{day.getDate()}</p>
              <div className="mt-2 space-y-1">
                {dayBookings.slice(0, 3).map((booking) => (
                  <div key={booking._id?.toHexString() ?? `${booking.customerName}-${booking.bookingStart}`} className="rounded-lg bg-white px-2 py-1 text-left text-xs text-[color:var(--color-heading)]">
                    <p className="font-semibold">{booking.bookingStart}</p>
                    <p className="truncate">{booking.customerName}</p>
                  </div>
                ))}
                {dayBookings.length > 3 ? <p className="text-xs text-[color:var(--color-text-muted)]">+{dayBookings.length - 3} more</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
