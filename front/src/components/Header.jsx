import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-toggle">☰</button>
                <button className="back-btn">◀</button>
            </div>

            <div className="header-right">
                <button className="header-icon-btn">🏠</button>
                <button className="header-icon-btn notification">
                    🔔
                    <span className="notification-badge">3</span>
                </button>

                <div className="user-menu">
                    <div className="user-avatar">
                        <img src="https://via.placeholder.com/36" alt="User" />
                    </div>
                    <span className="user-name">관리자계정명 ▾</span>
                </div>

                <button className="header-icon-btn">⚙️</button>
                <button className="logout-btn">로그아웃 ▾</button>
            </div>
        </header>
    )
}

export default Header
