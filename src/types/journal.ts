export type EntryId = string;

export interface JournalEntry {
  id: EntryId;
  text: string;
  createdAt: string; // ISO 8601
}

export interface DayGroup {
  dateKey: string; // "2026-02-04"
  displayDate: string; // "February 4, 2026"
  entries: JournalEntry[];
}

export interface StorageService {
  getAll(): Promise<JournalEntry[]>;
  add(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry>;
  update(id: EntryId, entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry>;
  delete(id: EntryId): Promise<void>;
}

export type Theme = 'dark' | 'light';
