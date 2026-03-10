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
    <div className="transactions-container">
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(to bottom right, #10b981, #14b8a6)',
          borderRadius: '1rem',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Income</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>This month</div>
        </div>
        
        <div style={{
          background: 'linear-gradient(to bottom right, #ef4444, #ec4899)',
          borderRadius: '1rem',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Expenses</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
            ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>This month</div>
        </div>
        
        <div style={{
          background: 'linear-gradient(to bottom right, #3b82f6, #a855f7)',
          borderRadius: '1rem',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Net Balance</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
            ${(totalIncome - totalExpense).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>This month</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        backgroundColor: '#0d1f30',
        border: '1px solid #1a2f42',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div className="search-wrapper" style={{ flex: '1', minWidth: '250px' }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                backgroundColor: filter === "all" ? '#10b981' : '#1a2f42',
                color: filter === "all" ? 'white' : '#9ca3af',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (filter !== "all") e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                if (filter !== "all") e.target.style.color = '#9ca3af';
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter("income")}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                backgroundColor: filter === "income" ? '#10b981' : '#1a2f42',
                color: filter === "income" ? 'white' : '#9ca3af',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (filter !== "income") e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                if (filter !== "income") e.target.style.color = '#9ca3af';
              }}
            >
              Income
            </button>
            <button
              onClick={() => setFilter("expense")}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                backgroundColor: filter === "expense" ? '#10b981' : '#1a2f42',
                color: filter === "expense" ? 'white' : '#9ca3af',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (filter !== "expense") e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                if (filter !== "expense") e.target.style.color = '#9ca3af';
              }}
            >
              Expenses
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              padding: '0.75rem',
              backgroundColor: '#1a2f42',
              color: '#9ca3af',
              borderRadius: '0.5rem',
              transition: 'color 0.3s ease',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              📅
            </button>
            <button style={{
              padding: '0.75rem',
              backgroundColor: '#1a2f42',
              color: '#9ca3af',
              borderRadius: '0.5rem',
              transition: 'color 0.3s ease',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              🔽
            </button>
            <button style={{
              padding: '0.75rem',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s ease',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              ⬇️
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={{
        backgroundColor: '#0d1f30',
        border: '1px solid #1a2f42',
        borderRadius: '1rem',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a2f42' }}>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  Icon
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  Date
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>Description</th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>Category</th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  Amount
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  style={{
                    borderBottom: '1px solid #1a2f42',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2f42'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      backgroundColor: transaction.type === "income" ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                    }}>
                      {transaction.icon}
                    </div>
                  </td>
                  <td style={{
                    padding: '1rem',
                    color: '#d1d5db',
                    fontSize: '0.875rem'
                  }}>
                    {new Date(transaction.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td style={{
                    padding: '1rem',
                    color: 'white',
                    fontWeight: 500
                  }}>{transaction.description}</td>
                  <td style={{
                    padding: '1rem',
                    color: '#9ca3af',
                    fontSize: '0.875rem'
                  }}>{transaction.category}</td>
                  <td style={{
                    padding: '1rem',
                    fontWeight: 600,
                    color: transaction.type === "income" ? '#10b981' : 'white'
                  }}>
                    {transaction.amount >= 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      backgroundColor: transaction.status === "completed" 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : 'rgba(234, 179, 8, 0.2)',
                      color: transaction.status === "completed"
                        ? '#10b981'
                        : '#eab308'
                    }}>
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
