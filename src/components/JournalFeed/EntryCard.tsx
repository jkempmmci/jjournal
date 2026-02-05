import { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import type { JournalEntry } from '../../types/journal.ts'
import { formatTime } from '../../utils/dateUtils.ts'
import './EntryCard.css'

interface EntryCardProps {
  entry: JournalEntry
  onEdit: (entry: JournalEntry) => void
}

/** Minimum horizontal distance (px) that qualifies as a swipe gesture. */
const SWIPE_THRESHOLD = 50

export default function EntryCard({ entry, onEdit }: EntryCardProps) {
  const [swiped, setSwiped] = useState(false)

  // ---------------------------------------------------------------------------
  // Touch handlers – track swipe direction and toggle visibility of delete btn
  // ---------------------------------------------------------------------------
  const touchStartX = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    // Store the starting X on the dataset so we avoid an extra ref or state
    // update (a ref would also work; dataset keeps it out of the React render cycle).
    e.currentTarget.dataset.touchStartX = String(e.touches[0].clientX)
  }, [])

  const touchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const startX = Number(e.currentTarget.dataset.touchStartX ?? 0)
    const endX = e.changedTouches[0].clientX
    const delta = endX - startX // negative = swipe left

    if (delta < -SWIPE_THRESHOLD) {
      setSwiped(true)   // swipe left  → reveal delete
    } else if (delta > SWIPE_THRESHOLD) {
      setSwiped(false)  // swipe right → hide delete
    }
  }, [])

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const cardClass = ['entry-card', swiped && 'entry-card--swiped']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={cardClass}
      onTouchStart={touchStartX}
      onTouchEnd={touchEnd}
    >
      <div className="entry-card__content">
        <div className="entry-card__text">
          <ReactMarkdown>{entry.text}</ReactMarkdown>
        </div>
        <span className="entry-card__time">
          {formatTime(new Date(entry.createdAt))}
        </span>
      </div>

      <button
        className="entry-card__edit"
        type="button"
        aria-label={`Edit entry from ${formatTime(new Date(entry.createdAt))}`}
        onClick={() => onEdit(entry)}
      >
        ✎
      </button>
    </div>
  )
}
