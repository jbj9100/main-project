import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import './DashboardPage.css'

function DashboardPage() {
    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="dashboard-main">
                <Header />

                <div className="dashboard-content">
                    <h1 className="dashboard-title">대시보드</h1>
                    <p className="dashboard-subtitle">
                        문서병원 시스템 관리 도구 여러분의 대용량 문서에 적합한 수 있습니다.
                    </p>

                    {/* TODAY 섹션 */}
                    <div className="today-section">
                        <h2 className="section-title">TODAY</h2>

                        <div className="stats-grid">
                            {/* 사용량 카드 */}
                            <div className="stat-card">
                                <div className="stat-header">
                                    <span className="stat-label">사용량</span>
                                    <button className="expand-btn">+</button>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">33 / 334</div>
                                    <div className="stat-icon user-icon">👤</div>
                                </div>
                            </div>

                            {/* 문서함 보관 서버 */}
                            <div className="stat-card">
                                <div className="stat-header">
                                    <span className="stat-label">문서함 보관 서버</span>
                                    <button className="expand-btn">+</button>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-badge orange">문서함 신규</div>
                                    <div className="stat-icon folder-icon">📁</div>
                                </div>
                            </div>

                            {/* 예약병원 방문 건수 */}
                            <div className="stat-card">
                                <div className="stat-header">
                                    <span className="stat-label">예약병원 방문 건수</span>
                                    <button className="expand-btn">+</button>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number alert">0</div>
                                    <div className="stat-icon alert-icon">🚫</div>
                                </div>
                            </div>

                            {/* 공지사항 */}
                            <div className="stat-card">
                                <div className="stat-header">
                                    <span className="stat-label">공지사항</span>
                                </div>
                                <div className="stat-content shortcuts">
                                    <div className="shortcut-item">FAQ <span className="count">1</span></div>
                                    <div className="shortcut-item">Q&A <span className="count">4</span></div>
                                    <div className="shortcut-item">자료실 <span className="count">2</span></div>
                                </div>
                                <div className="stat-icon clipboard-icon">📋</div>
                            </div>
                        </div>
                    </div>

                    {/* 문서병 사용현황 차트 */}
                    <div className="charts-section">
                        <div className="chart-card">
                            <h3 className="chart-title">문서병 사용현황</h3>
                            <div className="chart-controls">
                                <button className="chart-btn">◀</button>
                                <button className="chart-btn">▶</button>
                            </div>
                            <div className="chart-placeholder">
                                <div className="donut-chart">
                                    {/* 도넛 차트 Placeholder */}
                                    <div className="chart-item">
                                        <div className="legend-dot" style={{ backgroundColor: '#7C6FB5' }}></div>
                                        <span>사용량: 1,110원 / 1024.00GB (5.11%)</span>
                                    </div>
                                    <div className="chart-item">
                                        <div className="legend-dot" style={{ backgroundColor: '#9E9E9E' }}></div>
                                        <span>전체량: 1022.89GB / 1024.00GB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-title">문서 인출량 서버 IO기준 통계</h3>
                            <div className="chart-tabs">
                                <button className="chart-tab active">인출 건수</button>
                                <button className="chart-tab">인출 양</button>
                            </div>
                            <div className="line-chart-placeholder">
                                {/* 라인 차트 Placeholder */}
                                <p style={{ textAlign: 'center', color: '#999', paddingTop: '60px' }}>차트 영역</p>
                            </div>
                        </div>
                    </div>

                    {/* 문서병원 관련 */}
                    <div className="bottom-section">
                        <div className="table-card">
                            <div className="table-header">
                                <h3>문서병원 관련</h3>
                                <select className="dropdown">
                                    <option>1 오늘</option>
                                </select>
                            </div>
                            <div className="table-placeholder">
                                <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>테이블 영역</p>
                            </div>
                        </div>

                        <div className="table-card">
                            <div className="table-header">
                                <h3>문서금고 관련</h3>
                                <select className="dropdown">
                                    <option>1 오늘</option>
                                </select>
                            </div>
                            <div className="table-placeholder">
                                <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>테이블 영역</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
