import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        // TODO: 백엔드 연동 시 로그인 API 호출
        navigate('/dashboard')
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

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-input"
                                placeholder=""
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
                            />
                        </div>

                        <div className="form-footer">
                            <a href="#" className="forgot-password">forgot password?</a>
                        </div>

                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>

                    <div className="signup-link">
                        Don't have any account? <a href="#">Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
