import { useState, useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import './EntryModal.css'

interface EntryModalProps {
  isOpen: boolean
  initialText: string
  onSubmit: (text: string) => void
  onClose: () => void
}

export default function EntryModal({ isOpen, initialText, onSubmit, onClose }: EntryModalProps) {
  const [text, setText] = useState(initialText)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sync internal state when initialText changes (e.g. new capture while modal is open)
  useEffect(() => {
    setText(initialText)
  }, [initialText])

  // Auto-focus and place cursor at the end of initial text when modal opens
  useEffect(() => {
    if (!isOpen || !textareaRef.current) return

    const el = textareaRef.current
    el.focus()
    const len = el.value.length
    el.setSelectionRange(len, len)
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (trimmed.length === 0) return
    onSubmit(trimmed)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }

    const isModifier = e.ctrlKey || e.metaKey
    if (isModifier && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleBackdropClick = () => {
    onClose()
  }

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="entry-modal" onClick={handleBackdropClick}>
      <div className="entry-modal__content" onClick={handleContentClick}>
        <textarea
          ref={textareaRef}
          className="entry-modal__textarea"
          value={text}
          placeholder="What's on your mind?"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="entry-modal__actions">
          <button
            className="entry-modal__submit"
            disabled={text.trim().length === 0}
            onClick={handleSubmit}
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  )
}
