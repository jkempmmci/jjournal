import { useState, useEffect, useCallback, useMemo } from "react";
import type { JournalEntry, DayGroup } from "../types/journal.ts";
import { createStorageService } from "../services/storage.ts";
import { groupEntriesByDay } from "../utils/groupEntries.ts";

const storageService = createStorageService();

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    storageService
      .getAll()
      .then((loaded) => {
        if (mounted) {
          setEntries(loaded);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        console.error("Failed to load entries:", err);
        if (mounted) {
          setError("Failed to load entries");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const addEntry = useCallback(async (text: string): Promise<void> => {
    try {
      const entry = await storageService.add({
        text,
        createdAt: new Date().toISOString(),
      });
      setEntries((prev) => [...prev, entry]);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to add entry:", err);
      setError("Failed to save entry");
      throw err;
    }
  }, []);

  const updateEntry = useCallback(async (id: string, text: string): Promise<void> => {
    try {
      const existing = entries.find((e) => e.id === id);
      if (!existing) throw new Error(`Entry ${id} not found`);

      const updated = await storageService.update(id, {
        text,
        createdAt: existing.createdAt,
      });
      setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)));
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to update entry:", err);
      setError("Failed to save entry");
      throw err;
    }
  }, [entries]);

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    try {
      await storageService.delete(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to delete entry:", err);
      setError("Failed to save entry");
      throw err;
    }
  }, []);

  const dayGroups: DayGroup[] = useMemo(
    () => groupEntriesByDay(entries),
    [entries],
  );

  return { entries, dayGroups, addEntry, updateEntry, deleteEntry, loading, error };
}
