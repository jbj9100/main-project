import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './LoginPage.css'

// 백엔드 API URL (환경에 맞게 수정하세요)
const API_BASE_URL = 'http://localhost:8000'

function LoginPage() {
    const navigate = useNavigate()

    // 상태 관리
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // 백엔드 로그인 API 호출 (axios 사용)
            const response = await axios.post(`${API_BASE_URL}/api/hub/login/`, {
                email,
                password
            }, {
                withCredentials: true // 쿠키 저장을 위해 필수
            })

            // 로그인 성공
            console.log('로그인 성공:', response.data)

            // 토큰이 있다면 localStorage에 저장
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token)
            }

            // 대시보드로 이동
            navigate('/dashboard')

        } catch (err) {
            console.error('로그인 에러:', err)

            // axios 에러 처리
            if (err.response) {
                // 서버가 응답을 반환한 경우 (4xx, 5xx)
                setError(err.response.data.message || '로그인에 실패했습니다.')
            } else if (err.request) {
                // 요청은 보냈지만 응답을 받지 못한 경우
                setError('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.')
            } else {
                // 요청 설정 중 에러가 발생한 경우
                setError('요청 중 오류가 발생했습니다.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            {/* 왼쪽 환영 섹션 */}
            <div className="login-left">
                <div className="login-logo">
                    <div className="logo-icon">👑</div>
                </div>
                <div className="login-welcome">
                    <div className="welcome-circle welcome-circle-1"></div>
                    <h1 className="welcome-text">
                        Hello!<br />
                        <span className="welcome-highlight">Have a<br />GOOD DAY</span>
                    </h1>
                    <div className="welcome-circle welcome-circle-2"></div>
                </div>
            </div>

            {/* 오른쪽 로그인 폼 */}
            <div className="login-right">
                <div className="decorative-circle decorative-circle-1"></div>
                <div className="decorative-circle decorative-circle-2"></div>

                <div className="login-form-wrapper">
                    <h2 className="login-title">Login</h2>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-footer">
                            <a href="#" className="forgot-password">forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? '로그인 중...' : 'Login'}
                        </button>
                    </form>

                    <div className="signup-link">
                        Don't have any account? <Link to="/signup">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
