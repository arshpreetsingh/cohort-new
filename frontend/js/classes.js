document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('classesContainer');

  try {
    const data = await getClasses();
    const classes = data.classes || [];

    if (classes.length === 0) {
      container.innerHTML = '<p>No classes available at this time.</p>';
      return;
    }

    container.innerHTML = classes.map(cls => `
      <div class="card">
        <h3>${cls.name}</h3>
        <div class="meta">
          <span>📅 ${cls.day}</span>
          <span>⏰ ${cls.time}</span>
        </div>
        <div class="meta">
          <span>👨‍🏫 ${cls.instructor}</span>
        </div>
        <p>${cls.description}</p>
        <p style="margin-top: 0.75rem;">
          <span class="badge">${cls.day}</span>
        </p>
      </div>
    `).join('');
  } catch (error) {
    container.innerHTML = '<p class="alert alert-error">Failed to load classes. Please try again later.</p>';
  }
});