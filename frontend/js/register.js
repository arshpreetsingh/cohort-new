document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const alertDiv = document.getElementById('alert');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    alertDiv.className = 'alert';
    alertDiv.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';

    try {
      const result = await registerUser(name, email, phone);

      if (result.success) {
        alertDiv.className = 'alert alert-success';
        alertDiv.textContent = 'Registration successful! Welcome to truceCheck.';
        alertDiv.style.display = 'block';
        form.reset();
      }
    } catch (error) {
      alertDiv.className = 'alert alert-error';
      alertDiv.textContent = error.message || 'Registration failed. Please try again.';
      alertDiv.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register';
    }
  });
});