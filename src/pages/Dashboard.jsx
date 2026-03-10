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
      color: "#ef4444",
    },
    {
      id: 2,
      icon: "💰",
      date: "Mar 5",
      description: "Salary Deposit",
      category: "Income",
      amount: 4200.00,
      color: "#10b981",
    },
    {
      id: 3,
      icon: "🛒",
      date: "Mar 4",
      description: "Grocery Store",
      category: "Shopping",
      amount: -85.30,
      color: "#3b82f6",
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
    { name: "Food", icon: "🍔", color: "#ef4444" },
    { name: "Income", icon: "💰", color: "#10b981" },
    { name: "Shopping", icon: "🛒", color: "#3b82f6" },
    { name: "Transport", icon: "🚗", color: "#eab308" },
    { name: "Entertainment", icon: "🎬", color: "#a855f7" },
    { name: "Bills", icon: "📱", color: "#f97316" },
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
    <div className="dashboard-container">
      {/* Balance Cards */}
      <div className="balance-cards">
        <div style={{
          background: 'linear-gradient(to bottom right, #2dd4bf, #10b981)',
          borderRadius: '1rem',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{
            fontSize: '0.875rem',
            opacity: 0.9,
            marginBottom: '0.5rem'
          }}>Main Balance</div>
          <div style={{
            fontSize: '2.25rem',
            fontWeight: 'bold'
          }}>${mainBalance.toFixed(2)}</div>
        </div>
        
        <div className="balance-card">
          <div className="balance-card-header">
            <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Monthly Income</div>
            <button
              onClick={() => setShowIncomeModal(true)}
              className="balance-edit-btn"
            >
              ✏️
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>
              ${monthlyIncome.toFixed(2)}
            </div>
            <span style={{ color: '#10b981', fontSize: '1.25rem' }}>📈</span>
          </div>
        </div>
        
        <div className="balance-card">
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Total Expenses
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>
              ${totalExpenses.toFixed(2)}
            </div>
            <span style={{ color: '#f87171', fontSize: '1.25rem' }}>📉</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="recent-transactions-header">
          <h2 className="recent-transactions-title">Recent Transactions</h2>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              border: 'none'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            <span style={{ fontSize: '1.125rem' }}>➕</span>
            Add Transaction
          </button>
        </div>

        {/* Transaction Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            color: '#9ca3af'
          }}>
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
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#1a2f42',
                borderRadius: '0.5rem',
                alignItems: 'center',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#243a4f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a2f42'}
            >
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: transaction.color,
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>
                {transaction.icon}
              </div>
              <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{transaction.date}</div>
              <div style={{ color: 'white', fontSize: '0.875rem' }}>{transaction.description}</div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{transaction.category}</div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: transaction.amount > 0 ? '#10b981' : 'white'
              }}>
                {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
              </div>
              <button 
                onClick={() => handleDeleteTransaction(transaction.id)}
                style={{
                  color: '#ef4444',
                  fontSize: '1.125rem',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f87171'}
                onMouseLeave={(e) => e.target.style.color = '#ef4444'}
              >
                🗑️
              </button>
            </div>
          ))}

          {transactions.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#9ca3af'
            }}>
              No transactions yet. Add your first transaction!
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add New Transaction</h3>
            
            <form onSubmit={handleAddTransaction} className="transaction-form">
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  placeholder="Enter description"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="Enter amount"
                  className="form-input"
                  required
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="modal-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn-save"
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
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Update Monthly Income</h3>
            
            <form onSubmit={handleUpdateIncome} className="transaction-form">
              <div className="form-group">
                <label className="form-label">Income</label>
                <input
                  type="number"
                  step="0.01"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  placeholder="Enter income"
                  className="form-input"
                  required
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShowIncomeModal(false)}
                  className="modal-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn-save"
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
