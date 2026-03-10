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
    <div className="layout-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="layout-sidebar" style={{
        width: '16rem',
        backgroundColor: '#0d1f30',
        borderRight: '1px solid #1a2f42',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #1a2f42'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              background: 'linear-gradient(to bottom right, #2dd4bf, #10b981)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontSize: '1.25rem' }}>💰</span>
            </div>
            <span style={{
              color: 'white',
              fontWeight: 600,
              fontSize: '1.125rem'
            }}>Pesa Flow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                color: isActive(item.path) ? 'white' : '#9ca3af',
                backgroundColor: isActive(item.path) ? '#1a2f42' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.backgroundColor = 'rgba(26, 47, 66, 0.5)';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#9ca3af';
                }
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #1a2f42',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: '#1a2f42'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #60a5fa, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}>AC</span>
            </div>
            <div>
              <div style={{
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500
              }}>Alex Carter</div>
              <div style={{
                color: '#9ca3af',
                fontSize: '0.75rem'
              }}>Premium Member</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              color: '#f87171',
              backgroundColor: 'transparent',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ fontSize: '1.125rem' }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#0d1f30',
          borderBottom: '1px solid #1a2f42',
          padding: '1rem 2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h1 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 600
            }}>
              {navItems.find((item) => isActive(item.path))?.label || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
