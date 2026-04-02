import { useEffect, useState } from 'react'
import { db } from '@/lib/supabase'
import { Package, Image, ClipboardList, TrendingUp } from 'lucide-react'

interface Stats {
  products: number
  gallery: number
  orders: number
  pendingOrders: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [products, gallery, orders] = await Promise.all([
          db.getProducts(),
          db.getGalleryItems(),
          db.getOrders(),
        ])
        
        setStats({
          products: products.length,
          gallery: gallery.length,
          orders: orders.length,
          pendingOrders: orders.filter(o => o.status === 'pending').length,
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">仪表盘</h2>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">产品总数</p>
              <p className="text-2xl font-bold">{stats?.products || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Image className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">画廊作品</p>
              <p className="text-2xl font-bold">{stats?.gallery || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ClipboardList className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">订单总数</p>
              <p className="text-2xl font-bold">{stats?.orders || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">待处理订单</p>
              <p className="text-2xl font-bold text-yellow-600">{stats?.pendingOrders || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">快速操作</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/products" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            添加产品
          </a>
          <a href="/gallery" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            上传作品
          </a>
          <a href="/orders" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            查看订单
          </a>
        </div>
      </div>
    </div>
  )
}