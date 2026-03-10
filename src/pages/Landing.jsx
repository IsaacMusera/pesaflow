import { useState } from "react";
import { useNavigate } from "react-router";

export function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - just navigate to dashboard
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    // Mock Google login - just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="landing-container">
      {/* Left Side - Image */}
      <div className="landing-image-section">
        <img
          src="https://images.unsplash.com/photo-1758526214018-a746f9554b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwYXBwJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzI5MjI3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Banking"
        />
        <div className="landing-image-content">
          <h1>Welcome to Pesa Flow</h1>
          <p>Manage your finances with ease and confidence</p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="landing-form-section">
        <div className="landing-form-wrapper">
          {/* Logo */}
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <span>💰</span>
            </div>
            <span className="landing-logo-text">Pesa Flow</span>
          </div>

          {/* Auth Form */}
          <div className="landing-form-card">
            <h2 className="landing-form-title">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="landing-form-subtitle">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>

            <form onSubmit={handleSubmit} className="landing-form">
              {!isLogin && (
                <div className="landing-form-group">
                  <label className="landing-form-label">Full Name</label>
                  <div className="landing-input-wrapper">
                    <span className="landing-input-icon">👤</span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="landing-input"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="landing-form-group">
                <label className="landing-form-label">Email</label>
                <div className="landing-input-wrapper">
                  <span className="landing-input-icon">📧</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="landing-input"
                    required
                  />
                </div>
              </div>

              <div className="landing-form-group">
                <label className="landing-form-label">Password</label>
                <div className="landing-input-wrapper">
                  <span className="landing-input-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="landing-input"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="landing-forgot-password">
                  <button type="button" className="landing-forgot-btn">
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" className="landing-submit-btn">
                {isLogin ? "Sign In" : "Create Account"}
                <span>→</span>
              </button>
            </form>

            {/* Divider */}
            <div className="landing-divider">
              <div className="landing-divider-line">
                <div></div>
              </div>
              <div className="landing-divider-text">
                <span>Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <button onClick={handleGoogleLogin} className="landing-google-btn">
              <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Toggle Login/Signup */}
            <div className="landing-toggle-section">
              <span className="landing-toggle-text">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="landing-toggle-btn"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
