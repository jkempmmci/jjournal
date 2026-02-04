import { useState, useEffect, useCallback, useMemo } from "react";
import type { JournalEntry, DayGroup } from "../types/journal.ts";
import { createStorageService } from "../services/storage.ts";
import { groupEntriesByDay } from "../utils/groupEntries.ts";

const storageService = createStorageService();

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.getAll().then((loaded) => {
      setEntries(loaded);
      setLoading(false);
    });
  }, []);

  const addEntry = useCallback(async (text: string): Promise<void> => {
    const entry = await storageService.add({
      text,
      createdAt: new Date().toISOString(),
    });
    setEntries((prev) => [...prev, entry]);
  }, []);

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    await storageService.delete(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const dayGroups: DayGroup[] = useMemo(
    () => groupEntriesByDay(entries),
    [entries],
  );

  return { entries, dayGroups, addEntry, deleteEntry, loading };
}
