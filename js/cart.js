let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let detailsContainer = document.querySelector(".details-container");
let cartContent = document.querySelector(".card-content");
let buy = document.getElementById("buy");
let loading = document.querySelector(".loading");

function renderCartItems() {
  detailsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = "";
    const emptyCartImg = document.createElement("img");
    emptyCartImg.src = "../imgs/empty-cart.svg";
    emptyCartImg.alt = "Empty Cart";
    emptyCartImg.classList.add("empty-cart-img");
    cartContent.appendChild(emptyCartImg);
  } else {
    cartItems.forEach((item) => {
      const detailsAdd = document.createElement("div");
      detailsAdd.classList.add("details-add");

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
      const spanCart = document.createElement("span");
      spanCart.textContent = "cart";
      itemTxt.appendChild(h4);
      itemTxt.appendChild(spanCart);

      itemDetails.appendChild(itemImg);
      itemDetails.appendChild(itemTxt);

      const itemPrice = document.createElement("div");
      itemPrice.classList.add("item-price");
      const priceSpan = document.createElement("span");
      priceSpan.textContent = `$${item.price}`;
      itemPrice.appendChild(priceSpan);

      const itemCount = document.createElement("div");
      itemCount.classList.add("item-count");

      const savedQuantity = item.quantity || 1;

      const input = document.createElement("input");
      input.type = "number";
      input.value = savedQuantity;
      input.disabled = true;

      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.id = "edit";
      editButton.textContent = "Edit";
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.id = "remove";
      removeButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      itemCount.appendChild(input);
      itemCount.appendChild(editButton);
      itemCount.appendChild(removeButton);

      const itemTotalPrice = document.createElement("div");
      itemTotalPrice.classList.add("item-total-price");
      const totalPriceSpan = document.createElement("span");
      totalPriceSpan.id = "total";
      totalPriceSpan.textContent = `$${(item.price * input.value).toFixed(2)}`;
      itemTotalPrice.appendChild(totalPriceSpan);

      detailsAdd.appendChild(itemDetails);
      detailsAdd.appendChild(itemPrice);
      detailsAdd.appendChild(itemCount);
      detailsAdd.appendChild(itemTotalPrice);

      detailsContainer.appendChild(detailsAdd);

      editButton.addEventListener("click", (e) => {
        if (e.target.textContent === "Edit") {
          e.target.textContent = "Done";
          editButton.classList.remove("edit");
          editButton.classList.add("done");
          input.disabled = false;
          input.focus();
        } else {
          e.target.textContent = "Edit";
          editButton.classList.remove("done");
          editButton.classList.add("edit");
          input.disabled = true;

          const updatedQuantity = parseInt(input.value);
          updateItemQuantity(item.id, updatedQuantity);
        }
      });

      removeButton.addEventListener("click", () => {
        removeItemFromCart(item.id);
      });

      input.addEventListener("change", () => {
        const updatedQuantity = parseInt(input.value);
        totalPriceSpan.textContent = `$${(item.price * updatedQuantity).toFixed(
          2
        )}`;
        updateItemQuantity(item.id, updatedQuantity);

        const totalPrices = document.querySelectorAll("#total");
        let result = Array.from(totalPrices).reduce((total, item) => {
          return total + parseFloat(item.innerHTML.replace("$", ""));
        }, 0);
        let total = result.toFixed(2);
        localStorage.setItem("result", total);
      });
    });
  }
}

function updateItemQuantity(itemId, quantity) {
  cartItems = cartItems.map((item) =>
    item.id === itemId ? { ...item, quantity: quantity } : item
  );
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

buy.addEventListener("click", () => {
  let result = localStorage.getItem("result") || 0;

  alert(`Total Price: $${parseFloat(result).toFixed(2)}`);

  cartItems = [];
  total = 0;
  localStorage.setItem("result", total);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
});

function removeItemFromCart(itemId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      cartItems = cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      let totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0);

      localStorage.setItem("result", totalPrice.toFixed(2));

      Swal.fire({
        title: "Deleted!",
        text: "Your item has been removed from the cart.",
        icon: "success",
      });

      renderCartItems();
    }
  });
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
    hideLoading();
  }, 2000);
});
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    const totalPrices = document.querySelectorAll("#total");
    let result = Array.from(totalPrices).reduce((total, item) => {
      return total + parseFloat(item.innerHTML.replace("$", ""));
    }, 0);
    let total = result.toFixed(2);
    localStorage.setItem("result", total);
  });
});

renderCartItems();
