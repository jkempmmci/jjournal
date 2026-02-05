import { useState, useCallback } from 'react'
import { useJournal } from './hooks/useJournal.ts'
import { useTheme } from './hooks/useTheme.ts'
import { useKeyboardCapture } from './hooks/useKeyboardCapture.ts'
import type { JournalEntry } from './types/journal.ts'
import JournalFeed from './components/JournalFeed/JournalFeed.tsx'
import EntryModal from './components/EntryModal/EntryModal.tsx'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle.tsx'
import { ExportButton } from './components/ExportButton/ExportButton.tsx'
import FAB from './components/FAB/FAB.tsx'
import './App.css'

export default function App() {
  // Initialise theme on mount (sets data-theme on <html>).
  // ThemeToggle also calls useTheme internally; both share the same
  // localStorage key so they stay in sync.
  useTheme()

  const { entries, dayGroups, addEntry, updateEntry, deleteEntry } = useJournal()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialText, setInitialText] = useState('')
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)

  const openModal = useCallback((text = '', entry: JournalEntry | null = null) => {
    setInitialText(text)
    setEditingEntry(entry)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setInitialText('')
    setEditingEntry(null)
  }, [])

  const handleSubmit = useCallback((text: string) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, text)
    } else {
      addEntry(text)
    }
    closeModal()
  }, [editingEntry, addEntry, updateEntry, closeModal])

  const handleEdit = useCallback((entry: JournalEntry) => {
    openModal(entry.text, entry)
  }, [openModal])

  const handleDelete = useCallback((id: string) => {
    deleteEntry(id)
    closeModal()
  }, [deleteEntry, closeModal])

  useKeyboardCapture(isModalOpen, openModal)

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">JJournal</h1>
        <div className="app__header-actions">
          <ExportButton entries={entries} />
          <ThemeToggle />
        </div>
      </header>
      <JournalFeed dayGroups={dayGroups} onEditEntry={handleEdit} />
      <EntryModal
        isOpen={isModalOpen}
        initialText={initialText}
        editingEntry={editingEntry}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onClose={closeModal}
      />
      <FAB onClick={() => openModal()} />
    </div>
  )
}
