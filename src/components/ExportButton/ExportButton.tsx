import type { JournalEntry } from "../../types/journal.ts";
import { exportEntriesToMarkdown } from "../../utils/exportEntries.ts";
import './ExportButton.css';

interface ExportButtonProps {
  entries: JournalEntry[];
}

export function ExportButton({ entries }: ExportButtonProps) {
  const handleClick = () => {
    const markdown = exportEntriesToMarkdown(entries);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "jjournal-export.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      className="export-button"
      onClick={handleClick}
      aria-label="Export entries"
    >
      ⬇
    </button>
  );
}
