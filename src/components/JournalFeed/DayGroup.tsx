import type { DayGroup } from '../../types/journal.ts'
import EntryCard from './EntryCard.tsx'
import './DayGroup.css'

interface DayGroupProps {
  dayGroup: DayGroup
  onDeleteEntry: (id: string) => void
}

export default function DayGroup({ dayGroup, onDeleteEntry }: DayGroupProps) {
  return (
    <section className="day-group">
      <h2 className="day-group__header">{dayGroup.displayDate}</h2>

      <div className="day-group__entries">
        {dayGroup.entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onDelete={onDeleteEntry}
          />
        ))}
      </div>
    </section>
  )
}
