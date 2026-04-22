import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { inspectRequest } from './backend/acds/detection';
import { processResponse } from './backend/acds/response';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    if (Object.keys(req.body || {}).length > 0) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 🛡️ ACDS Middleware (ADDED)
  app.use((req, res, next) => {
    const result = inspectRequest(req);

    if (result.attack_detected) {
      const action = processResponse(req.ip, result);

      console.log(`[ACDS] ${result.type} detected from ${req.ip} → ${action}`);

      if (action === "BLOCK") {
        return res.status(403).send("Blocked by ACDS");
      }

      if (action === "HONEYPOT") {
        return res.redirect("/admin/login");
      }
    }

    next();
  });

  // --- Mock Database (Vulnerable) ---
  const users = [
    { id: 1, username: 'admin', password: 'SuperSecretPassword123!', balance: 999999.99 },
    { id: 2, username: 'testuser', password: 'password', balance: 50.00 },
    { id: 3, username: 'neeraj', password: 'password123', balance: 1250.75 }
  ];

  // --- API Routes (Vulnerable) ---

  // Vulnerable Login (SQL Injection Simulation)
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log(`ATTEMPTED LOGIN: user=${username}, pass=${password}`);

    const isSqlInjection = (str: string) => {
      const lower = str.toLowerCase();
      return lower.includes("' or '1'='1") || lower.includes("'--") || lower.includes("' #");
    };

    if (isSqlInjection(username) || isSqlInjection(password)) {
      console.log("SQL INJECTION DETECTED (DEMO): Bypassing authentication...");
      return res.json({ 
        success: true, 
        user: users[0], 
        message: "Logged in successfully (SQL Injection used)" 
      });
    }

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return res.json({ success: true, user });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Vulnerable Transfer (No Validation)
  app.post('/api/transfer', (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;

    console.log(`BANK TRANSFER: From ${fromAccount} to ${toAccount} Amount ${amount}`);

    res.json({ 
      success: true, 
      transactionId: Math.random().toString(36).substring(7).toUpperCase(),
      message: `Successfully transferred ${amount} to ${toAccount}`
    });
  });

  // Vulnerable Search (XSS)
  app.get('/api/search', (req, res) => {
    const { q } = req.query;
    res.json({ query: q, results: [] });
  });

  // --- Honeypot / Hidden Routes ---
  app.get('/admin/login', (req, res) => {
    res.status(401).send("<h1>Admin Portal</h1><p>Internal access only. This attempt has been logged.</p>");
  });

  app.get('/internal', (req, res) => {
    res.status(403).json({ error: "Access Denied", reason: "Unauthorized IP" });
  });

  app.get('/.env', (req, res) => {
    res.send(`
DB_HOST=10.0.0.45
DB_USER=root
DB_PASS=P4ssw0rd_H4rdc0d3d
JWT_SECRET=super_secret_bank_key
ADMIN_EMAIL=admin@fakebank.pvt
    `.trim());
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bank Server running on http://localhost:${PORT}`);
  });
}

startServer();