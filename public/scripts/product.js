const params = new URLSearchParams(location.search)
//console.log(params)
const id = params.get('id')
//console.log(id)

document.addEventListener('DOMContentLoaded', addClass)

fetch('/api/products/' + id)
    .then(res => res.json())
    // .then(res=>console.log(res))
    .then(res => {
        let template = `
        <div class="card d-flex flex-row justify-content-center align-items-center m-2">
            <a href="javascript:history.go(-1)" class="btn btn-secondary" style="position: absolute; left: 20px; top: 20px;">
                <i class="fas fa-arrow-left"></i> Back
            </a>
            <img src="${res.product.thumbnail}" class="card-img-top p-3" style="width: 40vh" alt="${res.product.title}">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title text-center mb-2">${res.product.title}</h5>
                <p class="card-text text-center mb-2">U$D${res.product.price}</p>
                <p class="card-text text-center mb-2">${res.product.stock} units in stock</p>
                <p class="card-text text-center mb-2">${res.product.description}</p>
                <input type="number" class="text-center" style="width: 150px" value="0" min="0" max=${res.product.stock} name="quantity" id=${res.product._id}>
                <input id="add-to-cart" type="button" onclick='addToCart()' style="width: 150px" class="btn btn-primary mt-2" value="add to cart!">
                <button type="button" id="deleteButton" style="width: 150px; display: none" class="btn btn-danger mt-2">Delete Item</button>
                <a href='./editProduct.html?id=${res.product._id}' id="editButton" style="width: 150px; display: none" class="btn btn-warning mt-2">Edit Item</a>
            </div>
        </div>
        `

        document.getElementById('product').innerHTML = template;

        const main = document.getElementById('product')
        const deleteButton = document.getElementById('deleteButton')
        const editButton = document.getElementById('editButton')

        if (main.classList.contains('addButton'))
            deleteButton.style.display = 'block',
            editButton.style.display = 'block'
        else 
        deleteButton.style.display = 'none',
        editButton.style.display = 'none'


        document.getElementById('deleteButton').addEventListener('click', (event) => {
            event.preventDefault()
            fetch('/api/products/' + id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({ owner: res.product.owner }) // Aquí defines ownerValue
              })
              .then(res => res.json())
              .then(res => {
                alert(res.message)
                if (res.message === `product deleted`)
                    window.location.href = 'http://localhost:8080/products.html'
              })
              .catch(err => console.log(err))
          })
    })
    .catch(err => console.log(err))


    function addClass() {
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
            let main = document.getElementById('product');
            if (main) {
                main.classList.add('addButton') // Mostrar el botón si existe
            }
        }
    }
    
    // Llama a la función después de que el documento se haya cargado completamente
   ;






async function addToCart() {
    console.log('ok');
    let selector = document.querySelector('input[type="number"]')
    let units = selector.value
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

    if (units > 0) {
        let pid = selector.id
        try {
            let response = await fetch(`/api/carts/${cid}/product/${pid}/${units}`, {
                method: 'PUT'
            })
            response = await response.json()
            if (response.message === "Cart updated") {
                location.replace('/cart.html?cid=' + cid)
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert('Insert units!')
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

//   document.getElementById('deleteButton').addEventListener('click', (event) => {
//     event.preventDefault()
//     fetch('/api/products/' + id, {
//       method: 'DELETE'
//     })
//       .then(res => res.json())
//       .then(res => {
//         alert(res.message)
//         // if (res.message === 'Siggned out!')
//           location.reload()
//       })
//       .catch(err => console.log(err))
//   })