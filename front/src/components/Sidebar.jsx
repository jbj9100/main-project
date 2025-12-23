import { useState } from 'react'
import './Sidebar.css'

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState('dashboard')
    const [expandedMenus, setExpandedMenus] = useState({})

    const toggleSubmenu = (menuId) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }))
    }

    const menuItems = [
        { id: 'dashboard', label: '서비스관리자 관리', icon: '👥', hasSubmenu: false },
        { id: 'today', label: '오늘 관리', icon: '📅', hasSubmenu: false },
        { id: 'usage', label: '사용현황 관리', icon: '📊', hasSubmenu: false },
        { id: 'doctor', label: '병원 관리', icon: '🏥', hasSubmenu: false },
        { id: 'server', label: '서버 관리', icon: '🖥️', hasSubmenu: false },
        { id: 'monitoring', label: '모니터링 관리', icon: '📈', hasSubmenu: false },
        { id: 'file', label: '정산 & 결제 관리', icon: '💳', hasSubmenu: false },
        { id: 'notice', label: '피드 & 에이전트 관리', icon: '📰', hasSubmenu: true },
        { id: 'settings', label: '등록', icon: '⚙️', hasSubmenu: false },
        { id: 'stats', label: '병원 관리 관리', icon: '📄', hasSubmenu: false },
        { id: 'management', label: '온라인 서비스 관리', icon: '🌐', hasSubmenu: false },
        { id: 'disklock', label: '제휴 정보 관리', icon: '🔒', hasSubmenu: false },
        { id: 'diskplus', label: 'DiskLock Plus', icon: '💾', hasSubmenu: false },
        { id: 'migration', label: 'Migration Pack', icon: '📦', hasSubmenu: false },
        { id: 'report', label: '가이드 결과', icon: '📋', hasSubmenu: false },
    ]

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-bg">
                        <span className="logo-text">ClouDoc</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item-wrapper">
                        <div
                            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveMenu(item.id)
                                if (item.hasSubmenu) {
                                    toggleSubmenu(item.id)
                                }
                            }}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-label">{item.label}</span>
                            {item.hasSubmenu && (
                                <span className="submenu-arrow">
                                    {expandedMenus[item.id] ? '▼' : '▶'}
                                </span>
                            )}
                        </div>

                        {item.hasSubmenu && expandedMenus[item.id] && (
                            <div className="submenu">
                                <div className="submenu-item">서브메뉴 1</div>
                                <div className="submenu-item">서브메뉴 2</div>
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar
