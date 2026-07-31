const API_BASE = '/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}/${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function registerUser(name, email, phone) {
  return apiRequest('register-user', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone }),
  });
}

async function getUsers() {
  return apiRequest('get-users', {
    method: 'GET',
  });
}

async function getClasses() {
  return apiRequest('get-classes', {
    method: 'GET',
  });
}