import { useEffect, useState } from 'react'
import { db } from '@/lib/supabase'
import type { GalleryItem } from '@/lib/supabase'
import { Plus, Edit, Trash2 } from 'lucide-react'

const categories = ['私宅', '商业', '餐饮', '酒店', '艺术空间', '展厅']

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: '',
    image_url: '',
    location: '',
    category: '',
    description: '',
    products_used: [],
    sort_order: 0,
    is_active: true,
  })
  const [productsInput, setProductsInput] = useState('')

  async function fetchItems() {
    try {
      const data = await db.getGalleryItems()
      setItems(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const productsArray = productsInput.split(',').map(p => p.trim()).filter(Boolean)
      
      if (editing) {
        await db.updateGalleryItem(editing.id, { ...formData, products_used: productsArray })
      } else {
        await db.createGalleryItem({ ...formData, products_used: productsArray })
      }
      
      setShowForm(false)
      setEditing(null)
      setFormData({
        title: '',
        image_url: '',
        location: '',
        category: '',
        description: '',
        products_used: [],
        sort_order: 0,
        is_active: true,
      })
      setProductsInput('')
      fetchItems()
    } catch (error) {
      console.error(error)
      alert('操作失败')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除吗？')) return
    try {
      await db.deleteGalleryItem(id)
      fetchItems()
    } catch (error) {
      alert('删除失败')
    }
  }

  function startEdit(item: GalleryItem) {
    setEditing(item)
    setFormData(item)
    setProductsInput(item.products_used?.join(', ') || '')
    setShowForm(true)
  }

  if (loading) return <div className="text-center py-8">加载中...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">画廊管理</h2>
        <button
          onClick={() => {
            setEditing(null)
            setFormData({
              title: '',
              image_url: '',
              location: '',
              category: '',
              description: '',
              products_used: [],
              sort_order: 0,
              is_active: true,
            })
            setProductsInput('')
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus size={20} /> 添加作品
        </button>
      </div>

      {/* 作品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {item.location} · {item.category}
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.is_active ? '已发布' : '未发布'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(item)} className="p-2 text-gray-500 hover:text-primary">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 编辑表单 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">{editing ? '编辑作品' : '添加作品'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">地点</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">类型</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">选择类型</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">图片链接</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">使用产品（逗号分隔）</label>
                <input
                  type="text"
                  value={productsInput}
                  onChange={(e) => setProductsInput(e.target.value)}
                  placeholder="藤编吊灯, 原木台灯"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">排序</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">状态</label>
                  <select
                    value={formData.is_active ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="true">发布</option>
                    <option value="false">隐藏</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  取消
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg">
                  {editing ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}