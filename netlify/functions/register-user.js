const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, phone } = JSON.parse(event.body);

    if (!name || !email || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email, and phone are required' }),
      };
    }

    const store = getStore('users');
    const existingData = await store.get('all-users', { type: 'json' });
    const users = existingData || [];

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      registered_at: new Date().toISOString(),
    };

    users.push(newUser);
    await store.setJSON('all-users', users);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ success: true, user: newUser }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message }),
    };
  }
};