import type { DayGroup as DayGroupData, JournalEntry } from '../../types/journal.ts'
import DayGroup from './DayGroup.tsx'
import './JournalFeed.css'

interface JournalFeedProps {
  dayGroups: DayGroupData[]
  onEditEntry: (entry: JournalEntry) => void
}

export default function JournalFeed({ dayGroups, onEditEntry }: JournalFeedProps) {
  return (
    <main className="journal-feed">
      {dayGroups.length === 0 ? (
        <p className="journal-feed__empty">No entries yet. Start typing to add one!</p>
      ) : (
        dayGroups.map((dayGroup) => (
          <DayGroup
            key={dayGroup.dateKey}
            dayGroup={dayGroup}
            onEditEntry={onEditEntry}
          />
        ))
      )}
    </main>
  )
}
