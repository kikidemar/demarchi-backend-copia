document.addEventListener('DOMContentLoaded', function () {
  let cid = getCookieValue('cid')
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        let decodedValue = decodeURIComponent(value)
        decoded = decodedValue.slice(2)
        return JSON.parse(decoded)
      }
    }
    return null
  }
  if (cid) {
    const cartLink = document.getElementById('quantity')
    cartLink.href = `/cart.html?cid=${cid}`
  }
})


document.addEventListener('DOMContentLoaded', async function () {
  let userRole = getCookieValue('role');
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        let decodedValue = decodeURIComponent(value);
        return decodedValue;
      }
    }
    return null;
  }

  if (userRole === 'admin') {
    adminTab.style.display = 'block';
  }

});

document.addEventListener('DOMContentLoaded', async function () {
  let userRole = getCookieValue('role');
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        let decodedValue = decodeURIComponent(value);
        return decodedValue;
      }
    }
    return null;
  }

  if (userRole === 'admin' || userRole === 'premium') {
    newTab.style.display = 'block';
  }

})

document.addEventListener('DOMContentLoaded', async function () {
  let userEmail = getCookieValue('email');
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        let decodedValue = decodeURIComponent(value);
        return decodedValue;
      }
    }
    return null;
  }

  if (userEmail) {
    registerTab.style.display = 'none';
  } else {
    registerTab.style.display = 'block';
  }

})





