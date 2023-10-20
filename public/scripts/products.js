fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    const { products } = data
    if (!products) console.error('You need to login')
    else {
      const templates = products.map(each => {
        if (each.stock > 0) {
          return `
            <div class="card m-2" style="width: 13rem">
              <img src="${each.thumbnail}" class="card-img-top p-3" alt="${each.description}">
              <div class="card-body d-flex flex-column justify-content-center">
                <h5 class="card-title text-center">${each.title}</h5>
                <p class="card-text text-center">$${each.price}</p>
                <a href="/product.html?id=${each._id}" class="btn btn-warning">+info</a>
              </div>
            </div>
          `;
        }
        return '';
      }).join('');
      document.getElementById('products').innerHTML = templates;
    }
  })
  .catch(err => console.log(err))

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

document.addEventListener('DOMContentLoaded', function () {
  let cid = getCookieValue('cid');

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        let decodedValue = decodeURIComponent(value);
        decoded = decodedValue.slice(2);
        return JSON.parse(decoded);
      }
    }
    return null;
  }

  if (cid)
    fetchQuantity(cid)
  else
    return console.error('You need to login')
});

async function fetchQuantity(cid) {
  try {
    let response = await fetch('/api/carts/' + cid);
    response = await response.json();

    let totalUnits = response.products.reduce((total, product) => total + product.units, 0);

    document.getElementById('quantity').innerHTML = `CART: ${totalUnits}`;
  } catch (error) {
    console.log(error);
  }
}


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
    quantity.style.display = 'none';
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