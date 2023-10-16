const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('token');
document.getElementById('token').value = token

document.getElementById('user').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const token = document.getElementById('token').value; 

  
  if (newPassword !== confirmPassword) {
    errorElement.textContent = "Passwords do not match";
    return;
  }

  try {
    const response = await fetch('/api/auth/reset-pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    })
    const res = await response.json(); // Parsea la respuesta JSON aquí

    alert(res.message);
    if (res.message === 'Password reset successful') {
      window.location.href = 'http://localhost:8080/login.html';
    }
  } catch (error) {
    console.log ("An error occurred. Please try again later.");
  }
})