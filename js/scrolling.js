let categoriesList = document.querySelector(".categories-list");
let btnCategoriesList = document.getElementById("all-categories");
let timeElement = document.querySelectorAll(".time-span");

btnCategoriesList.addEventListener("click", function () {
  categoriesList.style.transform = "scaleY(1)";
});

setInterval(function () {
  timeElement.forEach((span) => {
    let timeValue = parseInt(span.innerHTML);
    if (timeValue > 0) {
      timeValue -= 1;
      span.innerHTML = timeValue;
    }
  });
}, 1000);

let counter = 1;
function fun() {
  const element = document.getElementById(`11${counter}`);

  if (element) {
    element.click();
  }

  counter = counter + 1;
  if (counter > 5) {
    counter = 1;
  }
}

setInterval(fun, 3000);

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".trend-container", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});
let superOnSale = document.getElementById("on-sale");
let superBest = document.getElementById("best-rated");
let superFeatured = document.getElementById("featured-super");
let fristSuper = document.querySelector(".frist-super-row");
let secandtSuper = document.querySelector(".secand-super-row");

let arrFeatured = document.getElementById("arr-featured");
let oudioVideo = document.getElementById("audio-video");
let lap = document.getElementById("lap");
let fristArr = document.querySelector(".frist-arr-row");
let secandtArr = document.querySelector(".secand-arr-row");

document.addEventListener("DOMContentLoaded", function () {
  function updateLayout() {
    if (window.innerWidth <= 991) {
      if (superOnSale.classList.contains("active")) {
        secandtSuper.style.display = "grid";
        fristSuper.style.display = "none";
      } else if (superBest.classList.contains("active")) {
        fristSuper.style.display = "grid";
        secandtSuper.style.display = "none";
      } else if (superFeatured.classList.contains("active")) {
        fristSuper.style.display = "grid";
        secandtSuper.style.display = "grid";
      }
    } else {
      if (superOnSale.classList.contains("active")) {
        secandtSuper.style.display = "flex";
        fristSuper.style.display = "none";
      } else if (superBest.classList.contains("active")) {
        fristSuper.style.display = "flex";
        secandtSuper.style.display = "none";
      } else if (superFeatured.classList.contains("active")) {
        fristSuper.style.display = "flex";
        secandtSuper.style.display = "flex";
      }
    }

    if (window.innerWidth <= 991) {
      if (lap.classList.contains("active")) {
        secandtArr.style.display = "grid";
        fristArr.style.display = "none";
      } else if (oudioVideo.classList.contains("active")) {
        fristArr.style.display = "grid";
        secandtArr.style.display = "none";
      } else if (arrFeatured.classList.contains("active")) {
        fristArr.style.display = "grid";
        secandtArr.style.display = "grid";
      }
    } else {
      if (lap.classList.contains("active")) {
        secandtArr.style.display = "flex";
        fristArr.style.display = "none";
      } else if (oudioVideo.classList.contains("active")) {
        fristArr.style.display = "flex";
        secandtArr.style.display = "none";
      } else if (arrFeatured.classList.contains("active")) {
        fristArr.style.display = "flex";
        secandtArr.style.display = "flex";
      }
    }
  }

  updateLayout();
  window.addEventListener("resize", updateLayout);

  superOnSale.addEventListener("click", function () {
    superOnSale.classList.add("active");
    superBest.classList.remove("active");
    superFeatured.classList.remove("active");
    updateLayout();
  });

  superBest.addEventListener("click", function () {
    superBest.classList.add("active");
    superOnSale.classList.remove("active");
    superFeatured.classList.remove("active");
    updateLayout();
  });

  superFeatured.addEventListener("click", function () {
    superFeatured.classList.add("active");
    superOnSale.classList.remove("active");
    superBest.classList.remove("active");
    updateLayout();
  });

  arrFeatured.addEventListener("click", function () {
    arrFeatured.classList.add("active");
    oudioVideo.classList.remove("active");
    lap.classList.remove("active");
    updateLayout();
  });

  oudioVideo.addEventListener("click", function () {
    oudioVideo.classList.add("active");
    arrFeatured.classList.remove("active");
    lap.classList.remove("active");
    updateLayout();
  });

  lap.addEventListener("click", function () {
    lap.classList.add("active");
    arrFeatured.classList.remove("active");
    oudioVideo.classList.remove("active");
    updateLayout();
  });
});
