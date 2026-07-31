const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FRONTEND_DIR = path.join(__dirname, 'frontend');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(FRONTEND_DIR));

// Helper: read users from local JSON file
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper: write users to local JSON file
function writeUsers(users) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Helper: get classes data (same as the Netlify function)
function getClassesData() {
  return [
    {
      id: 'class-1',
      name: 'Introduction to Web Development',
      instructor: 'Sarah Johnson',
      day: 'Monday',
      time: '10:00 AM - 11:30 AM',
      description: 'Learn the basics of HTML, CSS, and JavaScript.',
    },
    {
      id: 'class-2',
      name: 'Data Structures & Algorithms',
      instructor: 'Michael Chen',
      day: 'Tuesday',
      time: '2:00 PM - 3:30 PM',
      description: 'Master fundamental data structures and algorithms.',
    },
    {
      id: 'class-3',
      name: 'React.js Fundamentals',
      instructor: 'Emily Rodriguez',
      day: 'Wednesday',
      time: '10:00 AM - 11:30 AM',
      description: 'Build modern user interfaces with React.',
    },
    {
      id: 'class-4',
      name: 'Python for Data Science',
      instructor: 'David Kim',
      day: 'Thursday',
      time: '2:00 PM - 3:30 PM',
      description: 'Explore data analysis and machine learning with Python.',
    },
    {
      id: 'class-5',
      name: 'Cloud Computing with AWS',
      instructor: 'Lisa Thompson',
      day: 'Friday',
      time: '10:00 AM - 11:30 AM',
      description: 'Learn cloud infrastructure and deployment on AWS.',
    },
  ];
}

// API Routes

// GET /api/get-users - Get all registered users
app.get('/api/get-users', (req, res) => {
  const users = readUsers();
  res.json({ users });
});

// POST /api/register-user - Register a new user
app.post('/api/register-user', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  const users = readUsers();
  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    registered_at: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ success: true, user: newUser });
});

// GET /api/get-classes - Get all available classes
app.get('/api/get-classes', (req, res) => {
  res.json({ classes: getClassesData() });
});

// Fallback: serve index.html for any unmatched routes (SPA-like behavior)
app.use((req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Local server running at http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${FRONTEND_DIR}`);
  console.log(`💾 Data stored at: ${USERS_FILE}`);
});