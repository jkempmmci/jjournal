import type { DayGroup as DayGroupData } from '../../types/journal.ts'
import DayGroup from './DayGroup.tsx'
import './JournalFeed.css'

interface JournalFeedProps {
  dayGroups: DayGroupData[]
  onDeleteEntry: (id: string) => void
}

export default function JournalFeed({ dayGroups, onDeleteEntry }: JournalFeedProps) {
  return (
    <main className="journal-feed">
      {dayGroups.length === 0 ? (
        <p className="journal-feed__empty">No entries yet. Start typing to add one!</p>
      ) : (
        dayGroups.map((dayGroup) => (
          <DayGroup
            key={dayGroup.dateKey}
            dayGroup={dayGroup}
            onDeleteEntry={onDeleteEntry}
          />
        ))
      )}
    </main>
  )
}
