import type { JournalEntry } from "../types/journal.ts";
import { groupEntriesByDay } from "./groupEntries.ts";
import { formatDisplayDate, formatTime } from "./dateUtils.ts";

/**
 * Converts a flat array of journal entries into a markdown document.
 * The document opens with an h1 title and an italicised export
 * timestamp, separated from the entries by a horizontal rule.
 * Entries are grouped by day (newest day first), with a level-2
 * heading for each day and bold timestamps before each entry body.
 */
export function exportEntriesToMarkdown(entries: JournalEntry[]): string {
  const dayGroups = groupEntriesByDay(entries);

  const sections = dayGroups.map((group) => {
    const entryBlocks = group.entries.map((entry) => {
      const time = formatTime(new Date(entry.createdAt));
      return `**${time}**\n${entry.text}`;
    });

    return `## ${group.displayDate}\n\n${entryBlocks.join("\n\n")}`;
  });

  const now = new Date();
  const header =
    `# JJournal Export\n\n` +
    `*Exported ${formatDisplayDate(now)} at ${formatTime(now)}*\n\n` +
    `---\n`;

  const body = sections.join("\n\n") + (sections.length > 0 ? "\n" : "");

  return header + (sections.length > 0 ? "\n" : "") + body;
}
