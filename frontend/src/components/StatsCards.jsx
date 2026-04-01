export default function StatsCards({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-xl p-5 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{card.label}</span>
            {card.icon && <span className="text-gray-500">{card.icon}</span>}
          </div>
          <div className="text-3xl font-bold">{card.value}</div>
          {card.sub && (
            <div className="text-sm text-gray-400 mt-1">{card.sub}</div>
          )}
        </div>
      ))}
    </div>
  )
}
