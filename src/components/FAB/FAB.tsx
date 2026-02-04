import './FAB.css'

interface FABProps {
  onClick: () => void
}

export default function FAB({ onClick }: FABProps) {
  return (
    <button className="fab" aria-label="Add new entry" onClick={onClick}>
      +
    </button>
  )
}
