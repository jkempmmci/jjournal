import type { JournalEntry, DayGroup } from "../types/journal.ts";
import { formatDateKey, formatDisplayDate } from "./dateUtils.ts";

/**
 * Groups an array of journal entries by calendar day (local timezone),
 * returning days sorted newest-first with entries within each day
 * also sorted newest-first by createdAt.
 */
export function groupEntriesByDay(entries: JournalEntry[]): DayGroup[] {
  const grouped = new Map<string, JournalEntry[]>();

  for (const entry of entries) {
    const dateKey = formatDateKey(new Date(entry.createdAt));
    const bucket = grouped.get(dateKey);
    if (bucket) {
      bucket.push(entry);
    } else {
      grouped.set(dateKey, [entry]);
    }
  }

  const days: DayGroup[] = [];
  for (const [dateKey, dayEntries] of grouped) {
    // Sort entries within the day newest-first
    dayEntries.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    days.push({
      dateKey,
      displayDate: formatDisplayDate(new Date(dateKey + "T12:00:00")),
      entries: dayEntries,
    });
  }

  // Sort days newest-first by dateKey (lexicographic sort works for YYYY-MM-DD)
  days.sort((a, b) =>
    b.dateKey > a.dateKey ? 1 : b.dateKey < a.dateKey ? -1 : 0,
  );

  return days;
}
