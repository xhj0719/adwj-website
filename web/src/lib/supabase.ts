import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

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

// API 函数
export async function getProducts(category?: string) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  if (category) {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Product
}

export async function getGalleryItems(category?: string) {
  let query = supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  if (category) {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data as GalleryItem[]
}

export async function getCompanyInfo(sectionKey?: string) {
  let query = supabase.from('company_info').select('*')
  
  if (sectionKey) {
    query = query.eq('section_key', sectionKey).single()
    const { data, error } = await query
    if (error) throw error
    return data as CompanyInfo
  }
  
  const { data, error } = await query
  if (error) throw error
  return data as CompanyInfo[]
}

export async function createOrder(order: Partial<Order>) {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()
  
  if (error) throw error
  return data as Order
}