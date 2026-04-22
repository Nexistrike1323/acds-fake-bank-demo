/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LogIn, Send, Home as HomeIcon, Shield, Menu, X, Landmark, CreditCard } from 'lucide-react';
import { useState, FormEvent } from 'react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Home', path: '/', icon: <HomeIcon size={16} /> },
    { label: 'Transfer', path: '/transfer', icon: <Send size={16} /> },
    { label: 'Search', path: '/search', icon: <Search size={16} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">
            Fake Bank <span className="text-blue-600">Pvt Limited</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1 px-0.5">
            0000 Fake Area, Fake County
          </p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-tight transition-colors ${
                location.pathname === link.path ? 'border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="bg-slate-900 text-white px-6 py-2 text-sm font-bold uppercase hover:bg-blue-600 transition-colors"
          >
            Secure Access
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 border-2 border-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b-2 border-slate-900 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6 uppercase font-bold text-sm tracking-tight">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-slate-900 text-white py-3 text-center"
              >
                Secure Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white px-8 py-4 text-[10px] flex flex-col md:flex-row justify-between uppercase tracking-tighter gap-4">
    <p>&copy; 2026 Fake Bank Private Limited. All Rights Reserved.</p>
    <p>Member FDIC | Equal Housing Lender | System Status: <span className="text-green-400">Vulnerable</span></p>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  return (
    <div className="pt-20 flex-1 flex flex-col">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-144px)]">
        {/* Director Side */}
        <section className="md:col-span-4 bg-white border-r-2 border-slate-900 p-12 flex flex-col justify-center items-center text-center">
          <div className="relative mb-10">
            <div className="w-56 h-56 bg-slate-200 rounded-full border-4 border-slate-900 overflow-hidden">
               <img 
                 src="https://ais-dev-akjboo326naj7dbcypr2hb-857454981325.asia-southeast1.run.app/md_photo.jpg" 
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800';
                 }}
                 className="w-full h-full object-cover object-top"
                 alt="Managing Director"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-blue-600 border-4 border-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Alex Sterling</h2>
          <p className="text-sm text-blue-600 font-black uppercase mb-6 tracking-wide">Managing Director – Bank Limited</p>
          <p className="text-slate-600 text-sm italic max-w-sm leading-relaxed">
            “Leading digital banking innovation for secure financial services. Our commitment to accessibility and transparency is the cornerstone of modern fiscal stability.”
          </p>
          <div className="mt-12 pt-12 border-t border-slate-100 w-full">
            <div className="flex justify-center gap-6 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <span>EST. 2024</span>
              <span>•</span>
              <span>LICENSE #8812-UX</span>
            </div>
          </div>
        </section>

        {/* Content Side */}
        <section className="md:col-span-8 p-12 lg:p-20 bg-slate-50 flex flex-col justify-center">
          <div className="max-w-3xl space-y-12">
            <div>
              <h2 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                Redefining <span className="text-blue-600">Sovereign</span> Finance.
              </h2>
              <p className="text-lg text-slate-600 max-w-lg mb-10">
                Experience the next generation of financial infrastructure. Precise, transparent, and built for the digital age.
              </p>
              <div className="flex gap-4">
                <Link to="/login" className="bg-slate-900 text-white px-10 py-4 font-black uppercase tracking-tight neo-shadow hover:bg-blue-600 border-2 border-slate-900 transition-all active:translate-y-1 active:shadow-none translate-y-0">
                  Access Portal
                </Link>
                <div className="px-10 py-4 bg-white border-2 border-slate-900 font-bold uppercase text-sm flex items-center">
                  Learn More
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
              {[
                { label: 'Asset Value', value: '$4.2B' },
                { label: 'Transaction Speed', value: '12ms' },
                { label: 'Security Node', value: 'Active' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border-2 border-slate-900 p-6 neo-shadow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-12">
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-slate-400 uppercase">
              <span className="font-bold text-slate-600">Developer Debug:</span>
              <a href="/admin/login" className="hover:text-blue-600 transition-colors">/admin/login</a>
              <a href="/internal" className="hover:text-blue-600 transition-colors">/internal</a>
              <a href="/.env" className="hover:text-blue-600 transition-colors">/.env</a>
              <span className="ml-auto text-red-500 font-bold italic bg-red-50 px-2 py-1 neo-border">Middleware: DISABLED</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`SUCCESS: ${data.message || 'Authenticated as ' + data.user.username}`);
      } else {
        setMessage(`ERROR: ${data.message}`);
      }
    } catch (err) {
      setMessage('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex justify-center items-center px-6">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white p-8 md:p-10 border-2 border-slate-900 neo-shadow"
      >
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-blue-600">Secure Access (Vulnerable)</h3>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Login Portal</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase mb-2 tracking-widest text-slate-500">Subject Identity</label>
            <input 
              type="text" 
              className="w-full border-2 border-slate-200 p-4 font-bold text-sm focus:outline-none focus:border-slate-900 transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="' OR 1=1 --"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase mb-2 tracking-widest text-slate-500">Access Key</label>
            <input 
              type="password" 
              className="w-full border-2 border-slate-200 p-4 font-bold text-sm focus:outline-none focus:border-slate-900 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Authorize Interface'}
          </button>
        </form>

        {message && (
          <div className={`mt-8 p-4 border-2 border-slate-900 font-bold text-xs uppercase ${message.startsWith('SUCCESS') ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
            {message}
          </div>
        )}

        <p className="mt-8 text-[10px] font-mono text-slate-400 uppercase text-center">
          Note: SQL injection patterns are permitted for testing.
        </p>
      </motion.div>
    </div>
  );
};

const TransferPage = () => {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toAccount: account, amount: amount }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex justify-center items-center px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white border-2 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
        >
          <div className="mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-blue-600">Asset Migration</h3>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Process Wire</h2>
          </div>
          
          <form onSubmit={handleTransfer} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase mb-2">Recipient Identifier</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-slate-900"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Receiver Account #"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase mb-2">Quantity (USD)</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-slate-900"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              Authorize Wire
            </button>
          </form>
        </motion.div>

        <div className="flex flex-col justify-center">
          {result ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-blue-600 text-white p-10 border-2 border-slate-900 neo-shadow text-center"
            >
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                 <CreditCard size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 leading-none">{result.message}</h3>
              <p className="font-mono text-[10px] opacity-70 uppercase tracking-widest">Transaction ID: {result.transactionId}</p>
              <button 
                onClick={() => setResult(null)} 
                className="mt-10 bg-white text-slate-900 px-6 py-2 text-[10px] font-black uppercase tracking-tight"
              >
                Reset Interface
              </button>
            </motion.div>
          ) : (
            <div className="border-4 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center opacity-40">
              <Landmark size={48} className="text-slate-400 mb-4" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Waiting for transaction input...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [reflectedQuery, setReflectedQuery] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setReflectedQuery(data.query);
    setSearchTriggered(true);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 px-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white border-2 border-slate-900 neo-shadow p-10">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-blue-600">Ledger Records</h3>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Database Query</h2>
          </div>
          <Search size={40} className="text-slate-200" />
        </div>

        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex border-2 border-slate-900">
            <input 
              type="text" 
              className="flex-grow p-4 font-bold text-sm outline-none"
              placeholder="Search records (XSS enabled)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-slate-900 text-white px-8 font-black uppercase text-xs tracking-widest hover:bg-blue-600">
              Query
            </button>
          </div>
        </form>

        {searchTriggered && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border-2 border-slate-900 font-mono text-[11px] uppercase tracking-tight">
              <span className="text-slate-400">Response Header:</span> <br/>
              Output: You searched: <span className="text-red-500 font-black" dangerouslySetInnerHTML={{ __html: reflectedQuery }} />
            </div>
            
            <div className="p-8 border-2 border-dashed border-slate-200 text-center uppercase tracking-widest text-[10px] text-slate-400 font-bold">
               No matching ledger records found for current query parameters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
