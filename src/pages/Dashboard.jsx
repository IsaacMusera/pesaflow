import { useState } from "react";

export function Dashboard() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      icon: "🍔",
      date: "Mar 6",
      description: "McDonald's",
      category: "Food",
      amount: -12.50,
      color: "bg-red-500",
    },
    {
      id: 2,
      icon: "💰",
      date: "Mar 5",
      description: "Salary Deposit",
      category: "Income",
      amount: 4200.00,
      color: "bg-emerald-500",
    },
    {
      id: 3,
      icon: "🛒",
      date: "Mar 4",
      description: "Grocery Store",
      category: "Shopping",
      amount: -85.30,
      color: "bg-blue-500",
    },
  ]);

  const [monthlyIncome, setMonthlyIncome] = useState(4200.00);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [incomeInput, setIncomeInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    category: "Food",
    amount: "",
    icon: "🍔",
  });

  const categories = [
    { name: "Food", icon: "🍔", color: "bg-red-500" },
    { name: "Income", icon: "💰", color: "bg-emerald-500" },
    { name: "Shopping", icon: "🛒", color: "bg-blue-500" },
    { name: "Transport", icon: "🚗", color: "bg-yellow-500" },
    { name: "Entertainment", icon: "🎬", color: "bg-purple-500" },
    { name: "Bills", icon: "📱", color: "bg-orange-500" },
  ];

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const mainBalance = monthlyIncome - totalExpenses;

  const handleAddTransaction = (e) => {
    e.preventDefault();
    
    const categoryData = categories.find(c => c.name === newTransaction.category);
    const amount = parseFloat(newTransaction.amount);
    
    const transaction = {
      id: Date.now(),
      icon: categoryData.icon,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      description: newTransaction.description,
      category: newTransaction.category,
      amount: newTransaction.category === "Income" ? Math.abs(amount) : -Math.abs(amount),
      color: categoryData.color,
    };

    setTransactions([transaction, ...transactions]);
    setShowModal(false);
    setNewTransaction({
      description: "",
      category: "Food",
      amount: "",
      icon: "🍔",
    });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleUpdateIncome = (e) => {
    e.preventDefault();
    setMonthlyIncome(parseFloat(incomeInput));
    setShowIncomeModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="text-sm opacity-90 mb-2">Main Balance</div>
          <div className="text-4xl font-bold">${mainBalance.toFixed(2)}</div>
        </div>
        
        <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-sm">Monthly Income</div>
            <button
              onClick={() => setShowIncomeModal(true)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors text-lg"
            >
              ✏️
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-white">${monthlyIncome.toFixed(2)}</div>
            <span className="text-emerald-400 text-xl">📈</span>
          </div>
        </div>
        
        <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Expenses</div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-white">${totalExpenses.toFixed(2)}</div>
            <span className="text-red-400 text-xl">📉</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-lg">➕</span>
            Add Transaction
          </button>
        </div>

        {/* Transaction Table */}
        <div className="space-y-1">
          <div className="grid grid-cols-6 gap-4 px-4 py-2 text-xs text-gray-400">
            <div>Icon</div>
            <div>Date</div>
            <div>Description</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Actions</div>
          </div>

          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-6 gap-4 px-4 py-3 bg-[#1a2f42] rounded-lg items-center hover:bg-[#243a4f] transition-colors"
            >
              <div className={`w-10 h-10 ${transaction.color} rounded-lg flex items-center justify-center text-xl`}>
                {transaction.icon}
              </div>
              <div className="text-gray-300 text-sm">{transaction.date}</div>
              <div className="text-white text-sm">{transaction.description}</div>
              <div className="text-gray-400 text-sm">{transaction.category}</div>
              <div className={`text-sm font-semibold ${transaction.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
              </div>
              <button 
                onClick={() => handleDeleteTransaction(transaction.id)}
                className="text-red-400 hover:text-red-300 transition-colors text-lg"
              >
                🗑️
              </button>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No transactions yet. Add your first transaction!
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-6">Add New Transaction</h3>
            
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  placeholder="Enter description"
                  className="w-full bg-[#1a2f42] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full bg-[#1a2f42] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="Enter amount"
                  className="w-full bg-[#1a2f42] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-[#1a2f42] hover:bg-[#243a4f] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Income Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0d1f30] border border-[#1a2f42] rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-6">Update Monthly Income</h3>
            
            <form onSubmit={handleUpdateIncome} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Income</label>
                <input
                  type="number"
                  step="0.01"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  placeholder="Enter income"
                  className="w-full bg-[#1a2f42] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowIncomeModal(false)}
                  className="flex-1 px-4 py-3 bg-[#1a2f42] hover:bg-[#243a4f] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  Update Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}