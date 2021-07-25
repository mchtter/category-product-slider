loadContent = () => {
  const item = new XMLHttpRequest();
  item.open("GET", "../assets/db/product-list.json", true);
  item.onload = function () {
    let itemObject, itemList, itemHTML, categoryList;
    var selectedElement = 0;
    var items = [];
    var titles = [];

    itemObject = JSON.parse(this.responseText);
    itemList = itemObject.responses[0][0].params.recommendedProducts;
    categoryList = itemObject.responses[0][0].params.userCategories;

    categoryList.forEach((element) => {
      items.push(itemList[element]);
      titles.push(element);
    });

    const zip = (a, b) =>
      Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

    let buttonHTML = "";
    let buttonArea = document.querySelector("#leftMenu");
    let contentArea = document.querySelector("#sliderCards");

    buttonArea.addEventListener("click", (e) => {
      this.selectedElement = e.target.id[e.target.id.length - 1];

      refreshView(this.selectedElement);

      swiperLoad();
    });

    zip(titles, items).forEach((element) => {
      var index = items.indexOf(element[1]);
      var flag = index == selectedElement;
      var text = flag ? "active" : "";

      function contentLengthCounter() {
        var contentLength = element[0].split(">");

        if (contentLength.length == 1) {
          return contentLength[0];
        } else {
          return contentLength[contentLength.length - 1];
        }
      }

      element[0] = contentLengthCounter();

      buttonHTML += `<button class="nav-link ${text}" id="v-pills-special-tab-${index}" data-bs-toggle="pill"
                      data-bs-target="#v-pills-special" type="button" role="tab" aria-controls="v-pills-special"
                      aria-selected="true"> ${element[0]} </button>`;
    });

    refreshView(0);

    function refreshView(index) {
      itemHTML = "";
      items[index].forEach((element) => {
        function shippingFee() {
          if (element.params.shippingFee == "FREE") {
            return "Ücretsiz Kargo";
          }
        }
        itemHTML += `<div class="swiper-slide">
                        <div class="card mb-2">
                            <img class="card-img-top swiper-lazy" data-src="${
                              element.image
                            }" alt="${element.name}">
                            <div class="swiper-lazy-preloader"></div>

                            <div class="card-body">
                                <h4 class="card-title">${element.name}</h4>
                            </div>
                            <p class="card-text card-price"><span>${
                              element.priceText
                            }</span></p>
                            <div class="cargoSection">
                                <div class="freeCargo">
                                    <div fill="#36b458" width="16" height="16" radius="0"
                                        color="inherit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#36b458">
                                            <path
                                                d="M23.808 9.733L21.552 6.6A1.421 1.421 0 0020.4 6h-4.08V4.5c0-.828-.645-1.5-1.44-1.5H1.44C.645 3 0 3.672 0 4.5v12c0 .828.645 1.5 1.44 1.5h1.44c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h5.76c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h1.92c1.06 0 1.92-.895 1.92-2v-5.667c0-.216-.067-.427-.192-.6zM5.76 20c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm11.52 0c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm5.76-9h-6.72V7h4.08c.15 0 .293.075.384.2l2.256 3.133V11z">
                                            </path>
                                        </svg>
                                    </div>
                                    <span>${shippingFee()}</span>
                                </div>
                            </div>
                            <button class="btn btn-primary" onclick="AddToast()">Sepete Ekle</button>
                        </div>
                    </div>`;
      });

      contentArea.innerHTML = itemHTML;
    }

    buttonArea.innerHTML = buttonHTML;
  };
  item.send();
};

let toastArea = document.querySelector("#liveToast");
function swiperLoad() {
  const mainSwiper = new Swiper(".mySwiper", {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
      loadOnTransitionStart: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 2,
        slidesPerGroup: 1,
      },
      360: {
        slidesPerView: 2,
        spaceBetween: 4,
        slidesPerGroup: 2,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 6,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 8,
        slidesPerGroup: 4,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 10,
        slidesPerGroup: 5,
      },
      1600: {
        slidesPerView: 6,
        spaceBetween: 12,
        slidesPerGroup: 6,
      },
      1920: {
        slidesPerView: 7,
        spaceBetween: 14,
        slidesPerGroup: 7,
      },
      2150: {
        slidesPerView: 8,
        spaceBetween: 16,
        slidesPerGroup: 8,
      },
      2400: {
        slidesPerView: 9,
        spaceBetween: 18,
        slidesPerGroup: 9,
      },
      2650: {
        slidesPerView: 10,
        spaceBetween: 20,
        slidesPerGroup: 10,
      },
      2900: {
        slidesPerView: 11,
        spaceBetween: 22,
        slidesPerGroup: 11,
      },
    },
  });

  mainSwiper.slideNext();
  mainSwiper.slideTo(0, 1000, false);
}

function showLiveToast() {
  toastHTML = "";

  toastHTML += `<div class="toast-body toastCard">
                  <section>
                      <div fill="#333" name="check" width="14" height="14" radius="0" class="successToast"
                          color="inherit">
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="#333">
                              <path
                                  d="M10.522 2.326L4.182 8.62 1.364 5.664a.828.828 0 00-1.169.087.824.824 0 00.095 1.162l3.465 3.52a.823.823 0 00.54.202l.082-.004a.829.829 0 00.573-.32l6.875-6.979a.824.824 0 10-1.304-1.006z"
                                  fill="#FFF" fill-rule="nonzero">
                              </path>
                          </svg>
                      </div>
                      <div class="toastText">
                          <span> Ürün sepete eklendi.</span>
                          <a href="/sepet"> Sepete Git</a>
                      </div>
                  </section>
                  <button type="button" class="btn" data-bs-dismiss="toast" aria-label="Close">
                      <div fill="#fff" name="close" width="14" height="14" radius="0" color="inherit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                              <path
                                  d="M14.207 12.027l9.352-9.351c.609-.61.609-1.59 0-2.2a1.551 1.551 0 00-2.2 0l-9.351 9.352L2.656.477c-.61-.61-1.59-.61-2.199 0-.61.609-.61 1.59 0 2.199l9.352 9.351L.457 21.38c-.61.605-.61 1.59 0 2.2a1.553 1.553 0 002.2 0l9.35-9.352 9.352 9.351a1.553 1.553 0 002.2 0c.609-.61.609-1.594 0-2.2zm0 0">
                              </path>
                          </svg>
                      </div>
                  </button>
              </div>`;

  toastArea.innerHTML = toastHTML;
}

function AddToast() {
  showLiveToast();
  var option = {
    animation: true,
    delay: 2000,
  };
  var toastElement = document.getElementById("liveToast");
  var newToast = new bootstrap.Toast(toastElement, option);
  newToast.show();
}

window.onload = () => {
  setTimeout(() => {
    swiperLoad();
  }, 500);
};

loadContent();
