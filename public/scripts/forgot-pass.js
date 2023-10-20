document.getElementById('user').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  try {
    const response = await fetch('/api/auth/forgot-pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    })
    if (response) {
      const data = await response.json();
      alert(data.message)
      location.replace('/index.html')
    } else {
      alert('Error en la solicitud. Por favor, inténtalo de nuevo.');
    }
  } catch (error) {
    console.log ("An error occurred. Please try again later.")
  }
});