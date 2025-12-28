import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Header.css';

const API_BASE_URL = 'http://localhost:8000';

function Header() {
    const [username, setUsername] = useState('Guest');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/hub/login/me`, {
                    withCredentials: true
                });
                if (response.data && response.data.username) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                // Optionally handle error (e.g., redirect to login if 401, but Header might exist on public pages too?)
                // For now, keep as Guest or empty if failed.
            }
        };

        fetchUser();
    }, []);

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
                <button className="header-icon-btn">⚙️</button>

                <div className="user-menu">
                    <div className="user-avatar">
                        <img src="https://via.placeholder.com/36" alt="User" />
                    </div>
                    <span className="user-name">{username}</span>
                </div>

                <button className="logout-btn">로그아웃 ▾</button>
            </div>
        </header>
    )
}

export default Header;
