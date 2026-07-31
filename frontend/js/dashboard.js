document.addEventListener('DOMContentLoaded', async () => {
  const loading = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const container = document.getElementById('usersContainer');

  try {
    const data = await getUsers();
    const users = data.users || [];

    loading.style.display = 'none';

    if (users.length === 0) {
      container.style.display = 'block';
      container.innerHTML = '<p style="padding: 2rem; text-align: center; color: #6b7280;">No users registered yet.</p>';
      return;
    }

    const table = `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          ${users.map((user, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHtml(user.name)}</td>
              <td>${escapeHtml(user.email)}</td>
              <td>${escapeHtml(user.phone)}</td>
              <td>${formatDate(user.registered_at)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.style.display = 'block';
    container.innerHTML = table;
  } catch (error) {
    loading.style.display = 'none';
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Failed to load users. Please try again later.';
  }
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}