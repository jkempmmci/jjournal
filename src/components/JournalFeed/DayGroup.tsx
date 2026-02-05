import type { DayGroup, JournalEntry } from '../../types/journal.ts'
import EntryCard from './EntryCard.tsx'
import './DayGroup.css'

interface DayGroupProps {
  dayGroup: DayGroup
  onEditEntry: (entry: JournalEntry) => void
}

export default function DayGroup({ dayGroup, onEditEntry }: DayGroupProps) {
  return (
    <section className="day-group">
      <h2 className="day-group__header">{dayGroup.displayDate}</h2>

      <div className="day-group__entries">
        {dayGroup.entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onEdit={onEditEntry}
          />
        ))}
      </div>
    </section>
  )
}
