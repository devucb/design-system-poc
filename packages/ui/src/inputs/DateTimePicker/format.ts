const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
});
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function formatDateTime(
  value: Date,
  mode: 'date' | 'time' | 'datetime',
) {
  if (mode === 'time') {
    return timeFormatter.format(value);
  }
  if (mode === 'datetime') {
    return dateTimeFormatter.format(value);
  }
  return dateFormatter.format(value);
}
