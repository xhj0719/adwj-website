import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 类型定义
export interface Product {
  id: string
  name: string
  category: 'b2b' | 'c2c'
  subcategory: string
  price: string
  image_url: string
  description: string
  material: string
  is_b2b: boolean
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: string
  title: string
  image_url: string
  location: string
  category: string
  description: string
  products_used: string[]
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CompanyInfo {
  id: string
  section_key: string
  title: string
  content: string
  image_url: string
  extra_data: Record<string, any>
  updated_at: string
}

export interface Order {
  id: string
  order_no: string
  customer_name: string
  customer_phone: string
  customer_email: string
  company_name: string
  project_type: string
  product_id: string
  quantity: string
  requirements: string
  status: 'pending' | 'quoted' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
  quote_price: string
  notes: string
  created_at: string
  updated_at: string
}

// CRUD 函数
export const db = {
  // 产品
  async getProducts() {
    const { data, error } = await supabase.from('products').select('*').order('sort_order')
    if (error) throw error
    return data as Product[]
  },

  async createProduct(product: Partial<Product>) {
    const { data, error } = await supabase.from('products').insert(product).select().single()
    if (error) throw error
    return data as Product
  },

  async updateProduct(id: string, product: Partial<Product>) {
    const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single()
    if (error) throw error
    return data as Product
  },

  async deleteProduct(id: string) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
  },

  // 画廊
  async getGalleryItems() {
    const { data, error } = await supabase.from('gallery_items').select('*').order('sort_order')
    if (error) throw error
    return data as GalleryItem[]
  },

  async createGalleryItem(item: Partial<GalleryItem>) {
    const { data, error } = await supabase.from('gallery_items').insert(item).select().single()
    if (error) throw error
    return data as GalleryItem
  },

  async updateGalleryItem(id: string, item: Partial<GalleryItem>) {
    const { data, error } = await supabase.from('gallery_items').update(item).eq('id', id).select().single()
    if (error) throw error
    return data as GalleryItem
  },

  async deleteGalleryItem(id: string) {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id)
    if (error) throw error
  },

  // 公司介绍
  async getCompanyInfo() {
    const { data, error } = await supabase.from('company_info').select('*')
    if (error) throw error
    return data as CompanyInfo[]
  },

  async updateCompanyInfo(sectionKey: string, info: Partial<CompanyInfo>) {
    const { data, error } = await supabase.from('company_info').update(info).eq('section_key', sectionKey).select().single()
    if (error) throw error
    return data as CompanyInfo
  },

  // 订单
  async getOrders(status?: string) {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (status) query = query.eq('status', status)
    const { data, error } = await query
    if (error) throw error
    return data as Order[]
  },

  async updateOrderStatus(id: string, status: Order['status'], quote_price?: string, notes?: string) {
    const updateData: Partial<Order> = { status }
    if (quote_price) updateData.quote_price = quote_price
    if (notes) updateData.notes = notes
    const { error } = await supabase.from('orders').update(updateData).eq('id', id).select().single()
    if (error) throw error
  },

  async deleteOrder(id: string) {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) throw error
  },
}

// 文件上传
export async function uploadImage(file: File, folder: string = 'products') {
  const fileName = `${folder}/${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from('images').upload(fileName, file)
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName)
  return publicUrl
}