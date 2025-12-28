import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8000';
    const [username, setUsername] = React.useState('Guest');

    React.useEffect(() => {
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
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/hub/logout/`, {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem('authToken');
            navigate('/login');
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <header className="top-header">
                    <div className="header-left">
                        <span>☰</span>
                        <span>🏠</span>
                    </div>
                    <div className="header-right">
                        <span>⭐ 즐겨찾기 메뉴 ▼</span>
                        <div className="user-profile">
                            <div className="user-avatar">{username.slice(0, 2).toUpperCase()}</div>
                            <span>{username}</span>
                        </div>
                        <span
                            onClick={handleLogout}
                            style={{ cursor: 'pointer' }}
                        >
                            로그아웃
                        </span>
                    </div>
                </header>

                <main className="content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
