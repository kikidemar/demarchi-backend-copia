let selector = document.getElementById('newProduct')
selector.addEventListener('click', (event) => {
    event.preventDefault()

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

    let uid = getCookieValue('_id');
    let owner = uid
    let title = document.getElementById('productTitle').value
    let description = document.getElementById('productDescription').value
    let price = document.getElementById('productPrice').value
    let stock = document.getElementById('productStock').value
    let thumbnail = document.getElementById('productPhoto').value
    // console.log({ title,description,price,stock,thumbnail });
    fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price, stock, thumbnail, owner })
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message)
            if (res.status === 201) {
                window.location.replace('/index.html')
            }
        })
})

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