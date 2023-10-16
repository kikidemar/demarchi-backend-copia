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