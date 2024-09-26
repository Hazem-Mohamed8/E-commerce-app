let wishItems = JSON.parse(localStorage.getItem("wishItems")) || [];
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let detailsContainer = document.querySelector(".details-container");
let wishContent = document.querySelector(".wishlist-content");
let clearAll = document.getElementById("clear-wishlist");
let loading = document.querySelector(".loading");

function renderWishItems() {
  detailsContainer.innerHTML = "";

  if (wishItems.length === 0) {
    wishContent.innerHTML = "";
    const emptyWishImg = document.createElement("img");
    emptyWishImg.src = "../imgs/wish-list.svg";
    emptyWishImg.alt = "Wish List is Empty";
    emptyWishImg.classList.add("wish-img");
    wishContent.appendChild(emptyWishImg);
  } else {
    wishItems.forEach((item) => {
      const detailsAdd = document.createElement("div");
      detailsAdd.classList.add("details-row");

      const itemDetails = document.createElement("div");
      itemDetails.classList.add("item-details");

      const itemImg = document.createElement("div");
      itemImg.classList.add("item-img");
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      itemImg.appendChild(img);

      const itemTxt = document.createElement("div");
      itemTxt.classList.add("item-txt");
      const h4 = document.createElement("h4");
      h4.textContent = item.name;
      itemTxt.appendChild(h4);

      itemDetails.appendChild(itemImg);
      itemDetails.appendChild(itemTxt);

      const itemPrice = document.createElement("div");
      itemPrice.classList.add("item-price");
      const priceSpan = document.createElement("span");
      priceSpan.textContent = `$${item.price}`;
      itemPrice.appendChild(priceSpan);

      const itemRemove = document.createElement("div");
      itemRemove.classList.add("item-remove");
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.id = "remove-heart";
      removeButton.innerHTML = `<i class="fa-solid fa-heart-crack"></i>`;

      itemRemove.appendChild(removeButton);

      if (!item.inCart) {
        const addCartButton = document.createElement("button");
        addCartButton.classList.add("add-cart");
        addCartButton.textContent = "Add to Cart";
        addCartButton.addEventListener("click", () => {
          addToCart(item);
        });
        itemRemove.appendChild(addCartButton);
      }

      detailsAdd.appendChild(itemDetails);
      detailsAdd.appendChild(itemPrice);
      detailsAdd.appendChild(itemRemove);

      detailsContainer.appendChild(detailsAdd);

      removeButton.addEventListener("click", () => {
        removeItemFromWish(item.id);
      });
    });
  }
}

function addToCart(item) {
  if (!cartItems.some((product) => product.id === item.id)) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1500,
    });

    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const itemIndex = wishItems.findIndex(
      (wishItem) => wishItem.id === item.id
    );
    if (itemIndex !== -1) {
      wishItems[itemIndex].inCart = true;
      localStorage.setItem("wishItems", JSON.stringify(wishItems));
      renderWishItems();
    }
  }
}

function removeItemFromWish(itemId) {
  wishItems = wishItems.filter((item) => item.id !== itemId);
  localStorage.setItem("wishItems", JSON.stringify(wishItems));
  renderWishItems();
}

clearAll.addEventListener("click", () => {
  wishItems = [];
  localStorage.setItem("wishItems", JSON.stringify(wishItems));
  renderWishItems();
});

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
    hideLoading();
  }, 2000);
});

renderWishItems();
