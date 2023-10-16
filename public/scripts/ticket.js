const params = new URLSearchParams(location.search);
const purchaser = params.get('purchaser');

fetch('/api/ticket/' + purchaser)
  .then((res) => res.json())
  .then((data) => {
    if (!data) {
      console.error('You need to do an order');
    } else {
      const templates = data.map((each) => {
        return `
          <div class="card m-2" style="width: 13rem;">
            <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title text-center">Buyer: ${each.purchaser}</h5>
              <p class="card-text text-center">Purchase date: ${each.purchase_date}</p>
              <p class="card-text text-center">Total: U$D${each.amount}</p>
            </div>
          </div>
        `;
      });

      document.getElementById('ticket').innerHTML = templates.join('');
    }
  })
  .catch((err) => console.log(err));