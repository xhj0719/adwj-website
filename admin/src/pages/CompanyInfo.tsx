import { useEffect, useState } from 'react'
import { db, CompanyInfo } from '@/lib/supabase'
import { Save } from 'lucide-react'

export default function CompanyInfo() {
  const [info, setInfo] = useState<CompanyInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('brand_story')

  async function fetchInfo() {
    try {
      const data = await db.getCompanyInfo()
      setInfo(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  async function handleSave(sectionKey: string) {
    setSaving(true)
    try {
      const section = info.find(s => s.section_key === sectionKey)
      if (section) {
        await db.updateCompanyInfo(sectionKey, {
          title: section.title,
          content: section.content,
          extra_data: section.extra_data,
        })
        alert('保存成功')
      }
    } catch (error) {
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  function updateSection(sectionKey: string, field: string, value: any) {
    setInfo(prev => prev.map(s => {
      if (s.section_key === sectionKey) {
        return { ...s, [field]: value }
      }
      return s
    }))
  }

  if (loading) return <div className="text-center py-8">加载中...</div>

  const currentSection = info.find(s => s.section_key === activeSection)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">公司介绍</h2>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6">
        {info.map((section) => (
          <button
            key={section.section_key}
            onClick={() => setActiveSection(section.section_key)}
            className={`px-4 py-2 rounded-lg transition ${
              activeSection === section.section_key
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {section.title || section.section_key}
          </button>
        ))}
      </div>

      {/* Editor */}
      {currentSection && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">标题</label>
              <input
                type="text"
                value={currentSection.title}
                onChange={(e) => updateSection(activeSection, 'title', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">内容</label>
              <textarea
                value={currentSection.content}
                onChange={(e) => updateSection(activeSection, 'content', e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border rounded-lg resize-none"
              />
            </div>

            {/* 特殊字段：品牌理念的 values */}
            {activeSection === 'philosophy' && currentSection.extra_data?.values && (
              <div>
                <label className="block text-sm font-medium mb-2">品牌价值观</label>
                <div className="space-y-3">
                  {currentSection.extra_data.values.map((v: any, i: number) => (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={v.title}
                        onChange={(e) => {
                          const newValues = [...currentSection.extra_data.values]
                          newValues[i] = { ...newValues[i], title: e.target.value }
                          updateSection(activeSection, 'extra_data', { ...currentSection.extra_data, values: newValues })
                        }}
                        placeholder="标题"
                        className="px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        value={v.description}
                        onChange={(e) => {
                          const newValues = [...currentSection.extra_data.values]
                          newValues[i] = { ...newValues[i], description: e.target.value }
                          updateSection(activeSection, 'extra_data', { ...currentSection.extra_data, values: newValues })
                        }}
                        placeholder="描述"
                        className="px-4 py-2 border rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 特殊字段：团队的 members */}
            {activeSection === 'team' && currentSection.extra_data?.members && (
              <div>
                <label className="block text-sm font-medium mb-2">团队成员</label>
                <div className="space-y-3">
                  {currentSection.extra_data.members.map((m: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => {
                            const newMembers = [...currentSection.extra_data.members]
                            newMembers[i] = { ...newMembers[i], name: e.target.value }
                            updateSection(activeSection, 'extra_data', { ...currentSection.extra_data, members: newMembers })
                          }}
                          placeholder="姓名"
                          className="px-4 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          value={m.role}
                          onChange={(e) => {
                            const newMembers = [...currentSection.extra_data.members]
                            newMembers[i] = { ...newMembers[i], role: e.target.value }
                            updateSection(activeSection, 'extra_data', { ...currentSection.extra_data, members: newMembers })
                          }}
                          placeholder="职位"
                          className="px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <input
                        type="text"
                        value={m.description}
                        onChange={(e) => {
                          const newMembers = [...currentSection.extra_data.members]
                          newMembers[i] = { ...newMembers[i], description: e.target.value }
                          updateSection(activeSection, 'extra_data', { ...currentSection.extra_data, members: newMembers })
                        }}
                        placeholder="简介"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 特殊字段：工坊的 stats */}
            {activeSection === 'workshop' && currentSection.extra_data?.stats && (
              <div>
                <label className="block text-sm font-medium mb-2">统计数据</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">工匠数量</label>
                    <input
                      type="text"
                      value={currentSection.extra_data.stats.craftsmen}
                      onChange={(e) => updateSection(activeSection, 'extra_data', {
                        ...currentSection.extra_data,
                        stats: { ...currentSection.extra_data.stats, craftsmen: e.target.value }
                      })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">工艺流程</label>
                    <input
                      type="text"
                      value={currentSection.extra_data.stats.processes}
                      onChange={(e) => updateSection(activeSection, 'extra_data', {
                        ...currentSection.extra_data,
                        stats: { ...currentSection.extra_data.stats, processes: e.target.value }
                      })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">制作周期</label>
                    <input
                      type="text"
                      value={currentSection.extra_data.stats.cycle}
                      onChange={(e) => updateSection(activeSection, 'extra_data', {
                        ...currentSection.extra_data,
                        stats: { ...currentSection.extra_data.stats, cycle: e.target.value }
                      })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => handleSave(activeSection)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}