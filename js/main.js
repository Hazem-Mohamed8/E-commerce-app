let loading = document.querySelector(".loading");
let addCart = Array.from(document.querySelectorAll(".add-cart"));
let heartBtn = Array.from(document.querySelectorAll(".heart"));
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let wishItems = JSON.parse(localStorage.getItem("wishItems")) || [];
let numItemsInCart = document.getElementById("in-cart");
let totalPrice = document.getElementById("total");
let numItemsInWish = document.querySelector(".short-wish");

function addCartFun() {
  addCart.forEach((button) => {
    button.addEventListener("click", function (e) {
      let product = products.find((p) => p.id === parseInt(e.currentTarget.id));

      if (product) {
        // Check if the product is already in the cart
        if (!cartItems.some((item) => item.id === product.id)) {
          cartItems.push(product);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          updateCartCount();

          button.innerHTML = "Remove";
          button.classList.remove("mainBtn");
          button.classList.add("remove");

          button.removeEventListener("click", addCartFun);
          removeCartFun(button);
        } else {
          handleAlret(button);
        }
      } else {
        console.error("No product found for this button.");
      }
    });
  });
}

function handleAlret(button) {
  if (button.classList.contains("mainBtn")) {
    Swal.fire({
      title: "Product already in cart!",
      icon: "info",
      width: 400,
    });
  }
}

function removeCartFun(button) {
  button.addEventListener("click", function (e) {
    let product = products.find((p) => p.id === parseInt(e.currentTarget.id));

    if (product) {
      const index = cartItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartCount();

        button.innerHTML = "Add to Cart";
        button.classList.remove("remove");
        button.classList.add("mainBtn");

        button.removeEventListener("click", removeCartFun);
        addCartFun();
      } else {
        console.log("Product not found in cart.");
      }
    } else {
      console.error("No product found for this button.");
    }
  });
}

function addWishFun() {
  heartBtn.forEach((button) => {
    button.addEventListener("click", function (e) {
      let product = products.find((p) => p.id === parseInt(e.currentTarget.id));

      if (product) {
        // Don't add the same product twice
        if (!wishItems.some((item) => item.id === product.id)) {
          wishItems.push(product);
          localStorage.setItem("wishItems", JSON.stringify(wishItems));
          updateWishCount();

          button.innerHTML = '<i class="fa-solid fa-heart-crack"></i>';
          button.classList.add("broken-heart");

          button.removeEventListener("click", addWishFun);
          removeWishFun(button);
        } else {
          if (!button.classList.contains("broken-heart")) {
            Swal.fire({
              title: "Product already in wish list!",
              icon: "info",
              width: 400,
            });
          }
        }
      } else {
        console.error("No product found for this button.");
      }
    });
  });
}

function removeWishFun(button) {
  button.addEventListener("click", function (e) {
    let product = products.find((p) => p.id === parseInt(e.currentTarget.id));
    if (product) {
      const index = wishItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        // Remove the product from wishItems
        wishItems.splice(index, 1);
        localStorage.setItem("wishItems", JSON.stringify(wishItems));
        updateWishCount();

        button.innerHTML = '<i class="fa-solid fa-heart"></i>';
        button.classList.remove("broken-heart");

        button.removeEventListener("click", removeWishFun);
        addWishFun(button);
      } else {
        console.log("Product not found in wish list.");
      }
    } else {
      console.error("No product found for this button.");
    }
  });
}

function updateCartCount() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  numItemsInCart.innerHTML = cartItems.length;
  let peice = cartItems.reduce((total, item) => total + item.price, 0);
  totalPrice.setAttribute(
    "data-progress",
    +localStorage.getItem("result") || peice || 0
  );
}

function updateWishCount() {
  let wishItems = JSON.parse(localStorage.getItem("wishItems")) || [];
  numItemsInWish.setAttribute("data-progress", wishItems.length);
}

function showLoading() {
  if (loading) {
    window.scrollTo(0, 0);
    loading.style.opacity = "1";
    loading.style.display = "block";
    document.body.classList.add("no-scroll");
  }
}

function hideLoading() {
  if (loading) {
    loading.style.opacity = "0";
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
      loading.style.display = "none";
    }, 500);
  }
}

window.addEventListener("load", () => {
  showLoading();

  setTimeout(() => {
    updateCartCount();
    updateWishCount();

    hideLoading();
  }, 1000);
});

addCartFun();
addWishFun();
