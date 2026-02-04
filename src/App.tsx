import { useState, useCallback } from 'react'
import { useJournal } from './hooks/useJournal.ts'
import { useTheme } from './hooks/useTheme.ts'
import { useKeyboardCapture } from './hooks/useKeyboardCapture.ts'
import JournalFeed from './components/JournalFeed/JournalFeed.tsx'
import EntryModal from './components/EntryModal/EntryModal.tsx'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle.tsx'
import FAB from './components/FAB/FAB.tsx'
import './App.css'

export default function App() {
  // Initialise theme on mount (sets data-theme on <html>).
  // ThemeToggle also calls useTheme internally; both share the same
  // localStorage key so they stay in sync.
  useTheme()

  const { dayGroups, addEntry, deleteEntry } = useJournal()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialText, setInitialText] = useState('')

  const openModal = useCallback((text = '') => {
    setInitialText(text)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setInitialText('')
  }, [])

  const handleSubmit = useCallback((text: string) => {
    addEntry(text)
    closeModal()
  }, [addEntry, closeModal])

  useKeyboardCapture(isModalOpen, openModal)

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">JJournal</h1>
        <ThemeToggle />
      </header>
      <JournalFeed dayGroups={dayGroups} onDeleteEntry={deleteEntry} />
      <EntryModal
        isOpen={isModalOpen}
        initialText={initialText}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
      <FAB onClick={() => openModal()} />
    </div>
  )
}
