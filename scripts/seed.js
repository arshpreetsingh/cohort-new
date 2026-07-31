const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

async function seed() {
  console.log('🌱 Running seed script...');

  const sampleUsers = [
    {
      id: 'seed-001-0000-0000-000000000001',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-0101',
      registered_at: '2026-07-01T09:00:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000002',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      phone: '555-0102',
      registered_at: '2026-07-02T10:30:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000003',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      phone: '555-0103',
      registered_at: '2026-07-03T14:15:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000004',
      name: 'Diana Martinez',
      email: 'diana.martinez@example.com',
      phone: '555-0104',
      registered_at: '2026-07-05T11:00:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000005',
      name: 'Edward Wilson',
      email: 'edward.wilson@example.com',
      phone: '555-0105',
      registered_at: '2026-07-07T16:45:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000006',
      name: 'Fiona Garcia',
      email: 'fiona.garcia@example.com',
      phone: '555-0106',
      registered_at: '2026-07-10T08:20:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000007',
      name: 'George Anderson',
      email: 'george.anderson@example.com',
      phone: '555-0107',
      registered_at: '2026-07-12T13:00:00.000Z',
    },
    {
      id: 'seed-001-0000-0000-000000000008',
      name: 'Hannah Lee',
      email: 'hannah.lee@example.com',
      phone: '555-0108',
      registered_at: '2026-07-14T09:30:00.000Z',
    },
  ];

  try {
    // Try Netlify Blobs first (for production/Netlify deployments)
    const { getStore } = require('@netlify/blobs');
    const store = getStore('users');
    const existingData = await store.get('all-users', { type: 'json' });

    if (existingData && existingData.length > 0) {
      console.log(`✅ Users store already has ${existingData.length} users. Skipping seed.`);
      return;
    }

    await store.setJSON('all-users', sampleUsers);
    console.log(`✅ Successfully seeded ${sampleUsers.length} sample users to Netlify Blobs.`);
  } catch (netlifyError) {
    // Fall back to local JSON file if Netlify Blobs is not available
    if (netlifyError.message && netlifyError.message.includes('Netlify Blobs')) {
      console.log('⚠️  Netlify Blobs not available locally. Using local JSON file instead.');

      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(USERS_FILE)) {
        const existingData = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
        if (existingData && existingData.length > 0) {
          console.log(`✅ Users file already has ${existingData.length} users. Skipping seed.`);
          return;
        }
      }

      fs.writeFileSync(USERS_FILE, JSON.stringify(sampleUsers, null, 2));
      console.log(`✅ Successfully seeded ${sampleUsers.length} sample users to local file.`);
    } else {
      console.error('❌ Seed failed:', netlifyError.message);
      process.exit(1);
    }
  }
}

seed();