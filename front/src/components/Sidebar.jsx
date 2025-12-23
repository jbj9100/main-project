import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                CloudDoc
            </div>

            <div className="sidebar-search">
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            <div className="sidebar-menu">
                <div className="menu-category">수퍼서비스관리자 관리</div>
                <div className="menu-item">계정 설정</div>
                <div className="menu-item">보안등급 설정</div>

                <div className="menu-category">일반 관리</div>
                <div className="menu-item active">서버 관리</div>
                <div className="menu-item">도메인 관리 &gt;</div>
                <div className="menu-item">인사 조직 관리 &gt;</div>
                <div className="menu-item">윈도우 에이전트 설치 관리</div>
                <div className="menu-item">통계 &gt;</div>

                <div className="menu-category">일반 모듈 관리</div>
                <div className="menu-item">Basic &gt;</div>
                <div className="menu-item">문서 보안 등급 &gt;</div>
            </div>
        </div>
    );
};

export default Sidebar;
