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
    <div className="flex h-screen bg-[#0a1929]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0d1f30] border-r border-[#1a2f42] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#1a2f42]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
            <span className="text-white font-semibold text-lg">Pesa Flow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-[#1a2f42] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#1a2f42]/50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-[#1a2f42] space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1a2f42]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AC</span>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Alex Carter</div>
              <div className="text-gray-400 text-xs">Premium Member</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#0d1f30] border-b border-[#1a2f42] px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-semibold">
              {navItems.find((item) => isActive(item.path))?.label || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}