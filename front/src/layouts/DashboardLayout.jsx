import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
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
                            <div className="user-avatar">AD</div>
                            <span>정보보호관리자 ▼</span>
                        </div>
                        <span>🌐 한국어 ▼</span>
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
