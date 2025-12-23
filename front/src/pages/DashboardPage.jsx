import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-title-section">
                <span className="dashboard-title">대시보드</span>
                <span className="dashboard-desc">문서보안 사용 현황과 각종 이력을 간략히 확인할 수 있습니다.</span>
            </div>

            <div className="widget-row">
                {/* 사용자 위젯 */}
                <div className="widget-card">
                    <div className="widget-header">
                        <span>사용자</span>
                        <span>+</span>
                    </div>
                    <div className="widget-content">
                        <div>
                            <span className="stat-value">33</span>
                            <span className="stat-total"> / 334</span>
                        </div>
                        <div className="stat-icon icon-blue">👤</div>
                    </div>
                </div>

                {/* 사용자 요청 사항 */}
                <div className="widget-card">
                    <div className="widget-header">
                        <span>사용자 요청 사항</span>
                        <span>+</span>
                    </div>
                    <div className="widget-content">
                        <div>
                            <div style={{ color: '#666', fontSize: '0.9rem' }}>미처리 건수</div>
                            <span className="stat-value" style={{ color: '#fb8c00' }}>17</span>
                        </div>
                        <div className="stat-icon icon-orange">📝</div>
                    </div>
                </div>

                {/* 랜섬웨어 탐지 건수 */}
                <div className="widget-card">
                    <div className="widget-header">
                        <span>랜섬웨어 탐지 건수</span>
                        <span>+</span>
                    </div>
                    <div className="widget-content">
                        <span className="stat-value" style={{ color: '#e53935' }}>0</span>
                        <div className="stat-icon icon-red">🛡️</div>
                    </div>
                </div>

                {/* 공지사항 */}
                <div className="widget-card notice-list">
                    <div className="widget-header">
                        <span>공지사항</span>
                    </div>
                    <div>
                        <div className="notice-item">
                            <span>FAQ</span>
                            <span>1</span>
                        </div>
                        <div className="notice-item">
                            <span>Q&A</span>
                            <span>4</span>
                        </div>
                        <div className="notice-item">
                            <span>자료실</span>
                            <span>2</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="chart-section">
                <div className="widget-card half-width">
                    <div className="widget-header">
                        <span>문서함 사용현황</span>
                        <span>&lt; &gt;</span>
                    </div>
                    <div className="donut-charts">
                        <div className="donut-chart">
                            서울 본사
                        </div>
                        <div className="donut-chart">
                            부산 지사
                        </div>
                    </div>
                </div>

                <div className="widget-card half-width">
                    <div className="widget-header">
                        <span>문서 입출력 서버 IQ기준 통계</span>
                        <span>쓰기 작업</span>
                    </div>
                    <div className="chart-placeholder">
                        Line Chart Area
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
