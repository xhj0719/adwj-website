import { NavLink, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  Image, 
  Building2, 
  ClipboardList,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', label: '仪表盘', icon: LayoutDashboard },
  { path: '/products', label: '产品管理', icon: Package },
  { path: '/gallery', label: '画廊管理', icon: Image },
  { path: '/company', label: '公司介绍', icon: Building2 },
  { path: '/orders', label: '订单管理', icon: ClipboardList },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* 移动端菜单按钮 */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 侧边栏 */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">ADWJ</h1>
          <p className="text-sm text-gray-500">管理后台</p>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* 主内容 */}
      <main className="flex-1 lg:ml-0 p-4 lg:p-8 pt-16 lg:pt-8">
        <Outlet />
      </main>
    </div>
  )
}