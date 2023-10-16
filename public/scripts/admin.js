fetch('/api/users')
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    const users = Object.values(data)
    if (!users) console.error('You need to be an admin to access')
    else {
      const templates = users.map(each => {
        if (each) {
          return `
            <div class="card m-2" style="width: 13rem;">
              <img src="https://cdn-icons-png.flaticon.com/512/17/17004.png" class="card-img-top p-3" alt="profile photo">
              <div class="card-body d-flex flex-column justify-content-center">
                <h5 class="card-title text-center">${each.name}</h5>
                <p class="card-text text-center">${each.email}</p>
                <p class="card-text text-center">${each.role}</p>
                <input id="modify-role" data-uid="${each._id}" type="button" onclick='modifyRole(this)' style="width: 170px" class="btn btn-primary mt-2" value="Modify role">
                <input id="delete-user" data-uid="${each._id}" type="button" onclick='deleteUser(this)' style="width: 170px" class="btn btn-primary mt-2" value="Delete user">
              </div>
            </div>
          `;
        }
        return '';
      }).join('');
      document.getElementById('users').innerHTML = templates;
    }
  })
  .catch(err => console.log(err))

async function modifyRole(button) {
  try {
    const uid = button.getAttribute('data-uid');

    const response = await fetch(`/api/users/premium/${uid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    if (data.success) {
      alert(data.message)
      location.reload()
    } else {
      console.error(data.message);
    }
  }
  catch (err) {
    console.log(err);
  }
}

async function deleteUser(button) {
  try {
    const uid = button.getAttribute('data-uid');
    const confirmMessage = `Are you sure you want to delete the user with ID ${uid}?`;

    if (confirm(confirmMessage)) {
      const response = await fetch(`/api/users/${uid}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        location.reload();
      } else {
        console.error(data.message);
      }
    } else {
      console.log('User canceled delete');
    }
  } catch (err) {
    console.log(err);
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

async function deleteInactiveUser(button) {
  try {
    const confirmMessage = 'Are you sure you want to delete all inactive users who have not logged in for 2 days?'

    if (confirm(confirmMessage)) {
      const response = await fetch(`/api/users`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
        alert(data.message);
        location.reload();
      } else {
        alert(data.message);
      }
    } else {
      console.log('User canceled delete');
    }
  } catch (err) {
    console.log(err);
  }
}