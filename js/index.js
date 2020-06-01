let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 20,
    img: 'https://папироска.рф/wa-data/public/shop/products/31/10/1031/images/100165/100165.aromatizator-ngf---zelenoe-yabloko.970.jpg'
  },
  {
    id: 2,
    title: 'Апельсины',
    price: 30,
    img: 'https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg'
  },
  {
    id: 3,
    title: 'Манго',
    price: 40,
    img: 'https://www.prismamarket.ru/upload/iblock/627/200004090001_mango.jpeg'
  }
];

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="Card image cap" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
      </div>
    </div>
  </div>
`;

function render() {
  const html = fruits.map(fruit => toHTML(fruit)).join(''); // OR fruits.map(toHTML)
  document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title: 'Цена на Товар',
  closable: true,
  // content: `
  //   <p>Lorem ipsum dolor sit.</p>
  //   <p>Lorem ipsum dolor sit.</p>
  // `,
  width: '400px',
  footerButtons: [
    {
      text: 'Close',
      type: 'primary',
      handler() {
        priceModal.close();
      }
    }
    // {
    //   text: 'Cancel',
    //   type: 'danger',
    //   handler() {
    //     console.log('Danger btn clicked');
    //     modal.close();
    //   }
    // }
  ]
});

// const confirmModal = $.modal({
//   title: 'Вы уверены?',
//   closable: true,
//   // content: `
//   //   <p>Lorem ipsum dolor sit.</p>
//   //   <p>Lorem ipsum dolor sit.</p>
//   // `,
//   width: '400px',
//   footerButtons: [
//     {
//       text: 'Cancel',
//       type: 'secondary',
//       handler() {
//         confirmModal.close();
//       }
//     },
//     {
//       text: 'Delete',
//       type: 'danger',
//       handler() {
//         console.log('Danger btn clicked');
//         confirmModal.close();
//       }
//     }
//   ]
// });

document.addEventListener('click', event => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find(f => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `);
    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id);
      render();
    }).catch(() => {
      console.log('Cancel');
    });
  }
});
