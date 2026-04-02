import { useEffect, useState } from 'react'
import { db } from '@/lib/supabase'
import type { Order } from '@/lib/supabase'
import { Eye, Edit, Trash2, X } from 'lucide-react'

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: '待处理', color: 'bg-yellow-100 text-yellow-700' },
  quoted: { label: '已报价', color: 'bg-blue-100 text-blue-700' },
  confirmed: { label: '已确认', color: 'bg-green-100 text-green-700' },
  processing: { label: '处理中', color: 'bg-purple-100 text-purple-700' },
  completed: { label: '已完成', color: 'bg-gray-100 text-gray-700' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-700' },
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({ status: '', quote_price: '', notes: '' })

  async function fetchOrders() {
    try {
      const data = await db.getOrders(filter === 'all' ? undefined : filter)
      setOrders(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [filter])

  async function handleUpdateStatus() {
    if (!selectedOrder) return
    try {
      await db.updateOrderStatus(
        selectedOrder.id,
        editData.status as Order['status'],
        editData.quote_price,
        editData.notes
      )
      setShowEdit(false)
      setSelectedOrder(null)
      fetchOrders()
    } catch (error) {
      alert('更新失败')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除此订单？')) return
    try {
      await db.deleteOrder(id)
      fetchOrders()
    } catch (error) {
      alert('删除失败')
    }
  }

  function openEdit(order: Order) {
    setSelectedOrder(order)
    setEditData({
      status: order.status,
      quote_price: order.quote_price || '',
      notes: order.notes || '',
    })
    setShowEdit(true)
  }

  if (loading) return <div className="text-center py-8">加载中...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">订单管理</h2>

      {/* 状态筛选 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          全部 ({orders.length})
        </button>
        {Object.entries(statusLabels).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === key ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 订单列表 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">订单号</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">客户</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">公司</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">项目类型</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">时间</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">{order.order_no}</td>
                <td className="px-4 py-3">
                  <div>{order.customer_name}</div>
                  <div className="text-sm text-gray-500">{order.customer_phone}</div>
                </td>
                <td className="px-4 py-3">{order.company_name || '-'}</td>
                <td className="px-4 py-3">{order.project_type || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${statusLabels[order.status]?.color}`}>
                    {statusLabels[order.status]?.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 text-gray-500 hover:text-primary"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => openEdit(order)}
                    className="p-2 text-gray-500 hover:text-primary"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">暂无订单</div>
        )}
      </div>

      {/* 详情弹窗 */}
      {selectedOrder && !showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">订单详情</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">订单号</label>
                  <p className="font-mono">{selectedOrder.order_no}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">状态</label>
                  <span className={`px-2 py-1 rounded text-xs ${statusLabels[selectedOrder.status]?.color}`}>
                    {statusLabels[selectedOrder.status]?.label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">客户姓名</label>
                  <p>{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">联系电话</label>
                  <p>{selectedOrder.customer_phone}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">邮箱</label>
                <p>{selectedOrder.customer_email || '-'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">公司名称</label>
                <p>{selectedOrder.company_name || '-'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">项目类型</label>
                <p>{selectedOrder.project_type || '-'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">数量</label>
                <p>{selectedOrder.quantity || '-'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">需求描述</label>
                <p className="whitespace-pre-wrap">{selectedOrder.requirements || '-'}</p>
              </div>

              {selectedOrder.quote_price && (
                <div>
                  <label className="text-sm text-gray-500">报价金额</label>
                  <p className="text-lg font-semibold text-primary">{selectedOrder.quote_price}</p>
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <label className="text-sm text-gray-500">备注</label>
                  <p className="whitespace-pre-wrap">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="text-sm text-gray-400 pt-4 border-t">
                创建时间：{new Date(selectedOrder.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑弹窗 */}
      {showEdit && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-6">更新订单状态</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">订单状态</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  {Object.entries(statusLabels).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">报价金额</label>
                <input
                  type="text"
                  value={editData.quote_price}
                  onChange={(e) => setEditData({ ...editData, quote_price: e.target.value })}
                  placeholder="如：¥50,000"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">备注</label>
                <textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEdit(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  取消
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}