const params = new URLSearchParams(location.search)
//console.log(params)
const id = params.get('id')

let selector = document.getElementById('editProduct')
selector.addEventListener('click', (event) => {
    event.preventDefault()

    let title = document.getElementById('productTitle').value
    let description = document.getElementById('productDescription').value
    let price = document.getElementById('productPrice').value
    let stock = document.getElementById('productStock').value
    let thumbnail = document.getElementById('productPhoto').value

    let updatedFields = {};

    if (title) {
        updatedFields.title = title;
    }
    if (description) {
        updatedFields.description = description;
    }
    if (price) {
        updatedFields.price = price;
    }
    if (stock) {
        updatedFields.stock = stock;
    }
    if (thumbnail) {
        updatedFields.thumbnail = thumbnail;
    }

    if (Object.keys(updatedFields).length === 0) {
        alert('There are no changes to update');
        return;
    }
    
    fetch('/api/products/'+ id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updatedFields })
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message)
            if (res.message === 'product updated') {
                window.location.replace('/products.html')
            }
        })
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