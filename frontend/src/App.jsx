import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, Instagram, MapPin } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import InstagramLeads from './pages/InstagramLeads'
import GmapsLeads from './pages/GmapsLeads'

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold text-white mb-6 px-4">
        Vendedor de Sites
      </h1>
      <nav className="flex flex-col gap-1">
        <NavLink to="/" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/instagram" className={linkClass}>
          <Instagram size={20} />
          Instagram Leads
        </NavLink>
        <NavLink to="/gmaps" className={linkClass}>
          <MapPin size={20} />
          Google Maps Leads
        </NavLink>
      </nav>
    </aside>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-950 text-gray-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/instagram" element={<InstagramLeads />} />
            <Route path="/gmaps" element={<GmapsLeads />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
