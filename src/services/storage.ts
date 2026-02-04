import type { StorageService } from '../types/journal.ts';
import { localStorageService } from './localStorage.ts';

export function createStorageService(): StorageService {
  return localStorageService;
}
