import { useState } from "react";

export function Transactions() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    { id: 1, date: "2026-02-28", description: "Salary Deposit", category: "Income", amount: 4200.00, type: "income", icon: "💰", status: "completed" },
    { id: 2, date: "2026-02-27", description: "Rent Payment", category: "Housing", amount: -1200.00, type: "expense", icon: "🏠", status: "completed" },
    { id: 3, date: "2026-02-26", description: "Grocery Store", category: "Food", amount: -85.30, type: "expense", icon: "🛒", status: "completed" },
    { id: 4, date: "2026-02-25", description: "Netflix Subscription", category: "Entertainment", amount: -15.99, type: "expense", icon: "📺", status: "completed" },
    { id: 5, date: "2026-02-24", description: "Freelance Payment", category: "Income", amount: 850.00, type: "income", icon: "💼", status: "completed" },
    { id: 6, date: "2026-02-23", description: "Electric Bill", category: "Utilities", amount: -120.50, type: "expense", icon: "⚡", status: "completed" },
    { id: 7, date: "2026-02-22", description: "Restaurant", category: "Food", amount: -45.80, type: "expense", icon: "🍽️", status: "completed" },
    { id: 8, date: "2026-02-21", description: "Gas Station", category: "Transportation", amount: -55.00, type: "expense", icon: "⛽", status: "completed" },
    { id: 9, date: "2026-02-20", description: "Online Shopping", category: "Shopping", amount: -129.99, type: "expense", icon: "🛍️", status: "completed" },
    { id: 10, date: "2026-02-19", description: "Gym Membership", category: "Health", amount: -49.99, type: "expense", icon: "💪", status: "completed" },
    { id: 11, date: "2026-02-18", description: "Coffee Shop", category: "Food", amount: -12.50, type: "expense", icon: "☕", status: "completed" },
    { id: 12, date: "2026-02-17", description: "Investment Dividend", category: "Income", amount: 156.40, type: "income", icon: "📈", status: "completed" },
    { id: 13, date: "2026-02-16", description: "Phone Bill", category: "Utilities", amount: -75.00, type: "expense", icon: "📱", status: "completed" },
    { id: 14, date: "2026-02-15", description: "Pharmacy", category: "Health", amount: -28.50, type: "expense", icon: "💊", status: "completed" },
    { id: 15, date: "2026-02-14", description: "Movie Tickets", category: "Entertainment", amount: -35.00, type: "expense", icon: "🎬", status: "pending" },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter = filter === "all" || t.type === filter;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-sm opacity-90 mb-2">Total Income</div>
          <div className="text-3xl font-bold">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-sm opacity-90 mt-2">This month</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="text-sm opacity-90 mb-2">Total Expenses</div>
          <div className="text-3xl font-bold">${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-sm opacity-90 mt-2">This month</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-sm opacity-90 mb-2">Net Balance</div>
          <div className="text-3xl font-bold">${(totalIncome - totalExpense).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-sm opacity-90 mt-2">This month</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a2f42] text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-3 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1a2f42] text-gray-400 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("income")}
              className={`px-4 py-3 rounded-lg transition-colors ${
                filter === "income"
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1a2f42] text-gray-400 hover:text-white"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilter("expense")}
              className={`px-4 py-3 rounded-lg transition-colors ${
                filter === "expense"
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1a2f42] text-gray-400 hover:text-white"
              }`}
            >
              Expenses
            </button>
          </div>

          <div className="flex gap-2">
            <button className="p-3 bg-[#1a2f42] text-gray-400 hover:text-white rounded-lg transition-colors text-lg">
              📅
            </button>
            <button className="p-3 bg-[#1a2f42] text-gray-400 hover:text-white rounded-lg transition-colors text-lg">
              🔽
            </button>
            <button className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors text-lg">
              ⬇️
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a2f42]">
                <th className="text-left p-4 text-gray-400 text-sm font-medium">
                  Icon
                </th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">
                  Date
                </th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">Description</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">Category</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">
                  Amount
                </th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-[#1a2f42] hover:bg-[#1a2f42] transition-colors"
                >
                  <td className="p-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                      transaction.type === "income" ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}>
                      {transaction.icon}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300 text-sm">
                    {new Date(transaction.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-white font-medium">{transaction.description}</td>
                  <td className="p-4 text-gray-400 text-sm">{transaction.category}</td>
                  <td className={`p-4 font-semibold ${
                    transaction.type === "income" ? "text-emerald-400" : "text-white"
                  }`}>
                    {transaction.amount >= 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      transaction.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}