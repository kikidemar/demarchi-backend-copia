const params = new URLSearchParams(location.search)
//console.log(params)
const cid = params.get('cid')

async function fetchCart() {
    try {
        let response = await fetch('/api/carts/' + cid)
        response = await response.json()
        // console.log(response)
        let templates = ''
        let total = 0
        let products = response.products
        // console.log(products[0])
        for (let prod of products) {
            if (prod.units > 0) {
                let res = await fetch('/api/products/' + prod.product)
                res = await res.json()
                console.log(res)
                total += prod.units * res.product.price
                templates = templates + `
                    <div class="card m-2 d-flex flex-row justify-content-center align-items-center">
                        <img src="${res.product.thumbnail}" class="card-img-top p-3 m-0" style="width: 100px" alt="${res.product.title}">
                        <p class="card-text text-center p-2 m-0" style="width: 100px">${res.product.title}</p>
                        <input id="${res.product._id}" onclick="quitUnits('${res.product._id}')" type="button" style="width: 25px" class="quit-units btn btn-danger p-1 m-1" value="-">
                        <input type="text" disabled id="${res.product._id}" class="card-text text-center p-2 m-0" style="width: 50px" value=${prod.units}>
                        <input id="${res.product._id}" onclick="addUnits('${res.product._id}')" type="button" style="width: 25px" class="btn btn-success p-1 m-1" value="+">
                        <p id="${res.product._id}" class="card-text text-center p-2 m-0" style="width: 100px">U$D${res.product.price}</p>
                    </div>
                `
            }
        }
        templates = templates += `                                
            <div class="card m-2 d-flex flex-row justify-content-center align-items-center">
                <p class="card-text text-end p-2 m-0" style="width: 400px">TOTAL: U$D${total}</p>
            </div>
            <div class="card m-2 d-flex justify-content-center">
                <button class="btn btn-primary" id="checkoutButton" dataTotal="${total}">Checkout</button>
            </div>
        `
        document.getElementById('cart').innerHTML = templates


        const checkoutButton = document.getElementById('checkoutButton');

        if (checkoutButton) {
            checkoutButton.addEventListener('click', async () => {
                const dataTotal = parseFloat(checkoutButton.getAttribute('dataTotal'));
                try {
                    const response = await fetch('/api/ticket', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ dataTotal }),
                    });
                    
                    if (response.status === 201) {
                        const responseData = await response.json();
                        alert('Ticket created successfully');
                        
                        location.replace(`/ticket.html?purchaser=${responseData.ticket.purchaser}`)
                        

                    } else {
                        
                        const responseData = await response.json();
                        alert(`Error creating ticket: ${responseData.message}`)
                        location.replace(`/ticket.html?purchaser=${responseData.ticket.purchaser}`)
                    }
                } catch (error) {
                    console.error('Error in the request of creating ticket:', error);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}
if (cid !== '1') fetchCart()
else alert('You need to login')

async function addUnits(pid) {
    try {
        let response = await fetch(`/api/carts/${cid}/product/${pid}/1`, {
            method: 'PUT'
        })
        response = await response.json()
        //console.log(response);
        if (response.message === 'Cart updated') {
            location.replace('/cart.html?cid=' + cid)
        } else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}

async function quitUnits(pid) {
    try {
        let response = await fetch(`/api/carts/${cid}/product/${pid}/1`, {
            method: 'DELETE'
        })
        response = await response.json()
        //console.log(response);
        if (response.message === 'Cart updated') {
            location.replace('/cart.html?cid=' + cid)
        } else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}

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