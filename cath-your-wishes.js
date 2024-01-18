var product = [
  {
    id: 1,
    img: './static/images/01-Work-Product.png',
    product_details:'./static/images/01-Work-Info.png' ,
    product_details_mobile: './static/images/01-Work-mobile.png',
    img_small:'./static/images/01-Work-small.png',
    name: 'Work',
    price: '$ &#10022; &#10022; &#10022;',
    type: 'shoe',
  }, {
    id: 2,
    img: './static/images/02-Finance-Product.png' ,
    product_details:'./static/images/02-Finance-Info.png' ,
    product_details_mobile: './static/images/02-Finance-mobile.png',
    img_small:'./static/images/02-Finance-small.png',
    name: 'Finance',
    price: '$ &#10022; &#10022; &#10022;',
    type: 'bag',
  }, {
    id: 3,
    img: './static/images/03-Physical-Product.png',
    product_details:'./static/images/03-Physical-Info.png',
    product_details_mobile: './static/images/03-Physical-mobile.png',
    img_small:'./static/images/03-Physical-small.png',
    name: 'Physical Health',
    price: '$ &#10022; &#10022; &#10022;',
    type: 'watch',
  }, {
    id: 4,
    img: './static/images/04-Luck-Product.png',
    product_details:'./static/images/04-Luck-Info.png',
    product_details_mobile: './static/images/04-Luck-mobile.png',
    img_small:'./static/images/04-Luck-small.png',
    name: 'Luck',
    price: '$ &#10022; &#10022; &#10022;',
    type: 'watch',
  }, {
    id: 5,
    img: './static/images/05-Mental-Product.png',
    product_details:'./static/images/05-Mental-Info.png',
    product_details_mobile: './static/images/05-Mental-mobile.png',
    img_small:'./static/images/05-Mental-small.png',
    name: 'Mental Health',
    price: '$ &#10022; &#10022; &#10022;',
    type: 'watch',
  }, {
    id: 6,
    img: './static/images/06-Love-Product.png',
    product_details:'./static/images/06-Love-Info.png',
    product_details_mobile: './static/images/06-Love-mobile.png',
    img_small:'./static/images/06-Love-small.png',
    name: 'Love',
    price: '$ &#10022; &#10022; &#10022;',
    type: 'watch',
  }];

$(document).ready(() => {
  var html = '';
  for (let i = 0; i < product.length; i++) {
    html += `<div class="product-items" ${product[i].type}>
                <img class="product-img" src="${product[i].img}" alt="product-img">
                <button onclick="open_modal_product(${i})" class="button btn-product-detail"> Product Details</button>
            </div>`;
  }
  $('#product-list').html(html);

});

var product_index = 0;

function open_modal_product(index) {
  product_index = index;
  $('#modal-product-detail').css('display', 'flex');
  $('#modal-img').attr('src', product[index].product_details); //change value in attribute into new value...
  $('#modal-img-mobile').attr('src', product[index].product_details_mobile);
}

function close_modal() {
  $('.modal').css('display', 'none');
}

function close_modal_confirm() {
  $('#about-us').css('display', 'flex');
  $('#contact-container').css('display', 'flex');
  $('#product-list').css('display', 'grid');
  $('.modal-confirm').css('display', 'none');
}


var cart = [];

function add_to_cart() {
  var pass = true;

  for (let i = 0; i < cart.length; i++) {
    if (product_index == cart[i].index) {
      console.log('found same product');
      cart[i].count++;
      pass = false;
    }
  }
  if (pass) {
    var obj = {
      index: product_index,
      id: product[product_index].id,
      name: product[product_index].name,
      price: product[product_index].price,
      img_small: product[product_index].img_small,
      count: 1,
    };
    cart.push(obj); //to add into array
  }
  // console.log(cart)

  Swal.fire({
    icon: 'success',
    title: 'Add ' + product[product_index].name + ' to cart!',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      confirmButton: 'swal-confirm-button',
      },
  });
  close_modal();
  $('#cart-count').css('display', 'flex').text(cart.length);
}

function open_cart() {
  $('#modal-cart').css('display', 'flex');
  render_cart();
}

function render_cart() {
  if (cart.length > 0) {
    var html = '';
    for (let i = 0; i < cart.length; i++) {
      html += `<div class="cart-list-items">
                  <div class="cart-list-left">
                      <img  src="${cart[i].img_small}" alt="product-image-small">
                      <div class="cart-list-detail">
                        <p class="cart-list-name">${cart[i].name}</p>
                        <p class="cart-list-price">${cart[i].price}</p>
                      </div>
                  </div>
                  <div class="cart-list-right">
                      <h2 onclick="add_delete_items('-',${i})" class="btnc">-</h2>
                      <h3 class="count-item${i}" class="cart-list-quantity" >${cart[i].count}</h3>
                      <h2 onclick="add_delete_items('+',${i})" class="btnc">+</h2>
                  </div>
                </div>`;
    }
    $('.cart-list').html(html);
  } else {
    $('.cart-list').html(`<p>Not found product list</p>`);
    $('#confirm_order').css('display', 'none');
  }
}

function add_delete_items(action, index) {
  if (action == '-') {
    if (cart[index].count > 0) {
      cart[index].count--;
      $('.count-item' + index).text(cart[index].count);

      if (cart[index].count <= 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Do you want to delete this item?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            confirmButton: 'swal-confirm-button',
            },
        }).then((res) => {
          if (res.isConfirmed) {
            cart.splice(index, 1); //to delete from array
            console.log(cart);
            render_cart();
            $('.cart-count').css('display', 'flex').text(cart.length);

            if (cart.length <= 0) {
              $('.cart-count').css('display', 'none');
            }
          } else {
            cart[index].count++;
            $('.count-item' + index).text(cart[index].count);
          }
        });
      }
    }
  } else if (action == '+') {
    cart[index].count++;
    $('.count-item' + index).text(cart[index].count);
  }
}

function open_confirm() {
  $('#modal-cart').css('display', 'none');
  $('#about-us').css('display', 'none');
  $('#contact-container').css('display', 'none');
  $('#product-list').css('display', 'none');
  $('#confirm-page').css('display', 'flex');
}

function takeScreenAndDownload() {
  const elm = document.querySelector(".modal-page-confirm");

  html2canvas(elm).then(function(canvas) {
    // Display the captured image in the "result" div
    document.querySelector(".result").appendChild(canvas);

    // Create a temporary anchor element to trigger download
    const tempLink = document.createElement('a');
    tempLink.href = canvas.toDataURL("image/png");
    tempLink.download = "Cat-ch-Your-Wishes.png";
    tempLink.click(); // Simulate click on the anchor to trigger download
  });
  console.log("takeScreenAndDownload-Success")
}



function takeScreenAndShare() {
  const elm = document.querySelector(".modal-page-confirm");

  html2canvas(elm).then(async function(canvas){
    document.querySelector(".result").append(canvas);
    // document.querySelector(".r2").append(canvas); // Add to another class to show in small scale
    let cvs = document.querySelector("canvas");
    let a = document.querySelector(".a");
    a.href = cvs.toDataURL("image/png");
    a.download = "Cat-ch-Your-Wishes.png";

    // Convert canvas to blob directly
    const blob = await fetch(cvs.toDataURL()).then(res => res.blob());
    const fileArray = [
      new File(
        [blob],
        'Cat-ch-Your-Wishes.png',
        {
          type: "image/png",
          lastModified: new Date().getTime()
        }
      )
    ];

    const shareData = {
      files: fileArray,
    };

    await navigator.share(shareData); // Trigger the sharing process
    console.log('Image shared successfully!');
  });
}



const shareTab = document.getElementById('shareTab');
if (shareTab) {
  shareTab.addEventListener('click', takeScreenAndShare);
}

