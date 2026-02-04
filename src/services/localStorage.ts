import type { EntryId, JournalEntry, StorageService } from '../types/journal.ts';

const STORAGE_KEY = 'jjournal_entries';

function load(): JournalEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as JournalEntry[];
  } catch {
    return [];
  }
}

function save(entries: JournalEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export const localStorageService: StorageService = {
  async getAll(): Promise<JournalEntry[]> {
    return load();
  },

  async add(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    const entries = load();
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      ...entry,
    };
    entries.push(newEntry);
    save(entries);
    return newEntry;
  },

  async delete(id: EntryId): Promise<void> {
    const entries = load();
    save(entries.filter((e) => e.id !== id));
  },
};
