import { Link, Outlet, useLocation, useNavigate } from "react-router";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/transactions", icon: "💸", label: "Transactions" },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      <div className="layout-sidebar">
        {/* Logo */}
        <div className="sidebar-logo-section">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <span>💰</span>
            </div>
            <span className="sidebar-logo-text">Pesa Flow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="sidebar-user-section">
          <div className="user-profile">
            <div className="user-avatar">
              <span>AC</span>
            </div>
            <div className="user-info">
              <div className="user-name">Alex Carter</div>
              <div className="user-role">Premium Member</div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-btn-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="layout-main-wrapper">
        {/* Header */}
        <header className="layout-header">
          <div className="header-content">
            <h1 className="header-title">
              {navItems.find((item) => isActive(item.path))?.label || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="layout-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
