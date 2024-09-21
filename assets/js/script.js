//****************************************
// Website scripts
//****************************************


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Event DOM ready
var callback = function () {
  // ================
  // Global data
  // ================
  const loadMoreBtn = document.querySelector("#load-more-posts");
  const darkSwitch = document.querySelector("#theme-dark");
  const lightSwitch = document.querySelector("#theme-light");
  const menuOpen = document.querySelector("#menu-open");
  const menuClose = document.querySelector("#menu-close");
  const searchOpen = document.querySelector("#search-open");
  const searchOpenMobile = document.querySelector("#search-open-mobile");
  const searchClose = document.querySelector("#search-close");
  const searchForm = document.querySelector("#search-form");
  const searchField = document.querySelector("#ghost-search-field");
  const searchByTags = document.querySelectorAll(".js-search-tag");
  const msgBoxes = document.querySelectorAll(".js-msg-close");
  const images = document.querySelectorAll(
    ".kg-image-card img, .kg-gallery-card img"
  );
  const galleryImages = document.querySelectorAll(".kg-gallery-image img");
  const subscribeButton = document.querySelector(".subscribe-button");
  
  const progressbar = document.querySelector("#progress");
  const postToc = document.querySelector(".post.has-toc");
  const scrollTop = document.querySelector(".scroll-to-top");

  // ===============================
  // Class modifying helepers
  // ===============================
  const toggleClass = (el, cls) => {
    document.querySelector(el).classList.toggle(cls);
  };

  const addClass = (el, cls) => {
    document.querySelector(el).classList.add(cls);
  };

  const removeClass = (el, cls) => {
    document.querySelector(el).classList.remove(cls);
  };

  // =======
  // fitvids
  // =======
  fitvids();

  // ================
  // Lazy load images
  // ================
  lazyLoad = newLazyLoad();

  // ========================================
  // Modify header when scrolled
  // ========================================
  window.addEventListener(
    "scroll",
    (event) => {
      // Modify header
      window.scrollY > 72 ? addClass(".header", "is-scrolled") : "";
      window.scrollY > 6 ? removeClass("#header-all-themes", "show") : "";
      window.scrollY <= 6 ? removeClass(".header", "is-scrolled") : "";

      // Progressbar
      if (progressbar) {
        if (config.enable_progress_bar) {
          var scrollTop =
            document.querySelector(".post")["scrollTop"] ||
            document.documentElement["scrollTop"] ||
            document.body["scrollTop"];

          var scrollBottom =
            (document.querySelector(".post")["scrollHeight"] ||
              document.documentElement["scrollHeight"] ||
              document.body["scrollHeight"]) -
            document.documentElement.clientHeight;

          scrollPercent = Math.round((scrollTop / scrollBottom) * 100) + "%";
          document
            .getElementById("progress")
            .style.setProperty("--scroll", scrollPercent);
        } else {
          progressbar.style.display = "none";
        }
      }

      if (config.enable_scroll_top) {
        // Scroll Top function
        window.scrollY > 200
          ? addClass(".scroll-to-top", "is-active")
          : removeClass(".scroll-to-top", "is-active");
      }

      if (document.querySelector("#button-spinner")) {
        onScrollLoadMore();
      }
    },
    false
  );

  // =============
  // Scroll Top
  // =============
  if (scrollTop) {
    scrollTop.onclick = (evt) => {
      // window.scrollTo({top: 0, behavior: 'smooth'}); // not supported in all browsers
      scrollToTop();
    };
  }

  // =======================================
  // Key press event handling
  // =======================================
  window.onkeydown = (evt) => {
    const sourceClass = evt.srcElement.className;

    switch (evt.key) {
      case "Escape":
        removeClass(".menu", "is-active");
        removeClass(".search", "is-active");
        document.body.style.overflowY = "auto";
        break;
      default:
        break; // nothing to do
    }
  };

  
  // ============
  // Menu actions
  // ============
  if (menuOpen && menuClose) {
    menuOpen.onclick = () => {
      addClass(".menu", "is-active");
    };

    menuOpen.onkeydown = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === "13") {
        addClass(".menu", "is-active");
        menuClose.focus();
      }
    };

    menuClose.onclick = () => {
      removeClass(".menu", "is-active");
    };

    menuClose.onkeydown = (evt) => {
      if (
        evt.key === "Escape" ||
        evt.keyCode === "27" ||
        evt.key === "Enter" ||
        evt.keyCode === "13"
      ) {
        removeClass(".menu", "is-active");
        menuOpen.focus();
      }
    };
  }

  // ============
  // User Menu
  // ============
  const userMenu = document.querySelector(".header__member--open");

  if (userMenu) {
    userMenu.onclick = () => {
      toggleClass(".header__member--open", "is-active");
    };

    userMenu.onkeydown = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === "13") {
        toggleClass(".header__member--open", "is-active");
        userMenu.focus();
      }
    };

    userMenu.blur = () => {
      removeClass(".header__member--open", "is-active");
    };
  }

  // ==============
  // Search actions
  // ==============
  if (searchOpen && searchClose) {
    searchOpen.onclick = () => {
      addClass(".search", "is-active");
      document.body.style.overflowY = "hidden";
      searchField.focus();
    };

    searchOpen.onkeydown = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === "13") {
        addClass(".search", "is-active");
        document.body.style.overflowY = "hidden";
        searchField.focus();
      }
    };

    searchClose.onclick = () => {
      removeClass(".search", "is-active");
      document.body.style.overflowY = "auto";
    };

    searchClose.onkeydown = (evt) => {
      if (
        evt.key === "Escape" ||
        evt.keyCode === "27" ||
        evt.key === "Enter" ||
        evt.keyCode === "13"
      ) {
        removeClass(".search", "is-active");
        document.body.style.overflowY = "auto";
        searchOpen.focus();
      }
    };
  }

  // ==============
  // Search mobile actions
  // ==============
  if (searchOpenMobile && searchClose) {
    searchOpenMobile.onclick = () => {
      addClass(".search", "is-active");
      document.body.style.overflowY = "hidden";
      ym(77659420, "reachGoal", "clickSearch");
      searchField.focus();
    };

    searchOpenMobile.onkeydown = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === "13") {
        addClass(".search", "is-active");
        document.body.style.overflowY = "hidden";
        ym(77659420, "reachGoal", "clickSearch");
        searchField.focus();
      }
    };

    searchClose.onclick = () => {
      removeClass(".search", "is-active");
      document.body.style.overflowY = "auto";
    };

    searchClose.onkeydown = (evt) => {
      if (
        evt.key === "Escape" ||
        evt.keyCode === "27" ||
        evt.key === "Enter" ||
        evt.keyCode === "13"
      ) {
        removeClass(".search", "is-active");
        document.body.style.overflowY = "auto";
        searchOpenMobile.focus();
      }
    };
  }

  if (searchField && searchForm) {
    searchField.onfocus = () => {
      addClass(".search__form", "focused");
    };

    searchForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
      },
      false
    );

    searchField.onblur = () => {
      removeClass(".search__form", "focused");
    };
  }

  if (searchByTags) {
    searchByTags.forEach((el) => {
      el.onclick = (evt) => {
        searchField.value = evt.srcElement.innerText;
        searchField.dispatchEvent(new Event("keyup"));
      };

      el.onkeydown = (evt) => {
        if (evt.key === "Enter" || evt.keyCode === "13") {
          searchField.value = evt.srcElement.innerText;
          searchField.dispatchEvent(new Event("keyup"));
        }
      };
    });
  }

  // =============
  // Theme actions
  // =============
  if (darkSwitch && lightSwitch) {
    darkSwitch.onclick = () => {
      setTheme("dark");
    };

    darkSwitch.onkeydown = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === "13") {
        setTheme("dark");
        lightSwitch.focus();
      }
    };

    lightSwitch.onclick = () => {
      setTheme("light");
    };

    lightSwitch.onkeydown = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === "13") {
        setTheme("light");
        darkSwitch.focus();
      }
    };
  }

  // =======================================
  // Message Box handling
  // =======================================
  if (msgBoxes) {
    if (msgBoxes.length === 1) {
      msgBoxes[0].onclick = (evt) => {
        closePopup(msgBoxes[0]);
      };
    } else {
      msgBoxes.forEach((el) => {
        el.onclick = (evt) => {
          closePopup(el);
        };
      });
    }
  }

  // ===============
  // Members Scripts
  // ===============
  // Give the parameter a variable name
  const action = getParameterByName("action");
  const stripe = getParameterByName("stripe");

  switch (action) {
    case "subscribe":
      // addClass('body', 'subscribe-success');
      ym(77659420, "reachGoal", "popupSubscribeSend");
      document.body.classList.add("subscribe-success");
      break;
    case "signup":
      window.location = "/signup/?action=checkout";
      break;
    case "checkout":
      // addClass('body', 'signup-success');
      // addClass('form[data-members-form]', 'success');
      document.body.classList.add("signup-success");
      break;
    case "signin":
      // addClass('body', 'signin-success');
      // addClass('form[data-members-form]', 'success');
      document.body.classList.add("signin-success");
      break;
    default:
      break;
  }

  if (stripe == "success") {
    // addClass('body', 'checkout-success');
    document.body.classList.add("checkout-success");
  }

  // Reset form on opening subscrion overlay
  if (subscribeButton) {
    subscribeButton.onclick = function (event) {
      document.querySelector(".subscribe-overlay form").className = "";
      document.querySelector(".subscribe-email").value = "";
    };
  }

  // =======================================
  // Disable load more posts button
  // =======================================
  if (loadMoreBtn && global.pagination_max_pages === 1) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add("btn--disabled");
  }

  // ===============
  // Load More Posts
  // ===============
  function onScrollLoadMore() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const spinner = document.querySelector("#button-spinner");

    if (scrollHeight - scrollTop <= clientHeight) {
      loadMorePosts(loadMoreBtn, spinner);
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      loadMorePosts(loadMoreBtn, undefined);
    };
  }

  

  // ===========
  // Blog search
  // ===========
  let ghostSearch = new GhostSearch({
    key: config.ghost_key,
    url: config.ghost_url,
    version: config.ghost_version,
    // button: '#search-button',
    template: function (result) {
      let postImage = "";

      const date = new Date(result.published_at);

      const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        date
      );
      const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
      const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

      const modifiedDate = `${da} ${mo} ${ye}`;

      result.feature_image
        ? (postImage =
            '<img class="search-result__image" src="' +
            result.feature_image +
            '"/>')
        : "";
      return (
        '<a href="/' +
        result.slug +
        '" class="search-result__post animate fade-in-up">' +
        '<div class="search-result__content">' +
        '<h5 class="search-result__title">' +
        result.title +
        "</h5>" +
        '<p class="search-result__date">' +
        modifiedDate +
        "</p>" +
        "</div>" +
        postImage +
        "</a>"
      );
    },
    trigger: "focus",
    options: {
      keys: ["title", "tags.0.name"],
    },
    api: {
      resource: "posts",
      parameters: {
        limit: "all",
        fields: ["title", "slug", "published_at", "feature_image"],
        filter: "",
        include: "tags",
        order: "",
        formats: "",
      },
    },
  });

  // ======================
  // Post Table of Contents
  // ======================
  if (postToc) {
    const tocToggle = document.querySelector(".js-toc-toggle");

    if (tocToggle) {
      tocToggle.onclick = (evt) => {
        toggleClass(".js-toc", "is-active");
        toggleClass(".js-toc-icon", "is-rotated");
      };
    }

    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      // smooth scroll
      scrollSmooth: false,
      // offset
      headingsOffset: 60,
    });

    const tocLinks = document.querySelectorAll('.toc-list-item a[href^="#"]');
    if (tocLinks) {
      tocLinks.forEach((link) => {
        link.onclick = function (e) {
          removeClass(".js-toc", "is-active");
        };
      });
    }
  }

  // =============
  // Image Gallery
  // =============
  images.forEach(function (image) {
    if (config.enable_image_lightbox) {
      var wrapper = document.createElement("a");
      wrapper.setAttribute("data-no-swup", "");
      wrapper.setAttribute("data-fslightbox", "");
      wrapper.setAttribute("href", image.src);
      wrapper.setAttribute("aria-label", "Click for Lightbox");
      image.parentNode.insertBefore(wrapper, image.parentNode.firstChild);
      wrapper.appendChild(image);
    }
    image.setAttribute("class", "lazyload lazy");
    // image.setAttribute('data-src', image.src);
    // image.removeAttribute('src');
    updateLazyLoad(lazyLoad);
  });

  galleryImages.forEach(function (image) {
    image.setAttribute("alt", "Gallery Image");
    var container = image.closest(".kg-gallery-image");
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + " 1 0%";
  });

  // =============
  // Lightbox
  // =============
  refreshFsLightbox();


  // ===============
  // Swiper Scripts
  // ===============
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: "auto",
    initialSlide: 1,
    centeredSlides: true,
    spaceBetween: 16,
    autoHeight: false,
  });

  // ===============
  // Employer/Applicants widgets in publications
  // ===============
  const employerWidget = document.getElementById("employer_widget");
  const applicantWidget = document.getElementById("applicant_widget");
  const currentTag =
    document.getElementsByClassName("post-hero__header")[0]?.childNodes[1]
      .classList[0];
  employerWidget.style.display = "none";

  if (currentTag === "tag-employers") {
    applicantWidget.style.display = "none";
    employerWidget.style.display = "block";
  }

  // ===============
  // Search Vacancies Scripts
  // ===============
  const searchVacancyForm = document.getElementById("findPosition");
  if (searchVacancyForm) {
    searchVacancyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      ym(77659420, "reachGoal", "show-vacancies");
      window.open(
        `https://www.zarplata.ru/vacancy?q=${event.target[0].value}&salary=${event.target[1].value}&utm_source=blog_vacancy`,
        "_blank"
      );
    });
  }

  // ==================
  // Post external links
  // ==================
  if (config.open_links_in_new_tab) {
    const domain = location.host.replace("www.", "");
    const postLinks = document.querySelectorAll(".post__content a");

    postLinks.forEach((link) => {
      if (!link.href.includes(domain)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noreferrer noopener");
      }
    });
  }

  // ==============
  // Function detect yandex browser
  // ==============
  function isYaBrowser() {
    var ua = navigator.userAgent;
    if (ua.search(/YaBrowser/) > 0) return true;
    return false;
  }

  // ==============
  // Hide scroll to top button if user using Ya Browser
  // ==============
  if (isYaBrowser()) {
    const scrollToTop = document.getElementsByClassName("scroll-to-top")[0];
    scrollToTop.style.display = "none";
  }

};

var reactionsLoader = function (){
  // ==============
  // Reactions
  // ==============
  const reactionsButtons = document.querySelectorAll(".rctbt");
  const reactionsCounters = document.querySelectorAll(".rctcnt");

  const rLike = document.querySelector("#r-like");
  const rFire = document.querySelector("#r-fire");
  const rFace = document.querySelector("#r-face");
  const rPoo = document.querySelector("#r-poo");
  const rDislike = document.querySelector("#r-dislike");

  const rLikeButton = document.querySelector("#r-like-button");
  const rFireButton = document.querySelector("#r-fire-button");
  const rFaceButton = document.querySelector("#r-face-button");
  const rPooButton = document.querySelector("#r-poo-button");
  const rDislikeButton = document.querySelector("#r-dislike-button");

  if (rLikeButton) {
    rLikeButton.addEventListener("click", () => {
      if (!rLikeButton.classList.contains("active")) {
        ym(77659420, "reachGoal", "reactionLike");
      }
    });
  }

  if (rFireButton) {
    rFireButton.addEventListener("click", () => {
      if (!rFireButton.classList.contains("active")) {
        ym(77659420, "reachGoal", "reactionFire");
      }
    });
  }

  if (rFaceButton) {
    rFaceButton.addEventListener("click", () => {
      if (!rFaceButton.classList.contains("active")) {
        ym(77659420, "reachGoal", "reactionNeutral");
      }
    });
  }

  if (rPooButton) {
    rPooButton.addEventListener("click", () => {
      if (!rPooButton.classList.contains("active")) {
        ym(77659420, "reachGoal", "reactionPoo");
      }
    });
  }

  if (rDislikeButton) {
    rDislikeButton.addEventListener("click", () => {
      if (!rDislikeButton.classList.contains("active")) {
        ym(77659420, "reachGoal", "reactionDislike");
      }
    });
  }

  const emoj = ["like", "fire", "poker_face", "poo", "dislike"];

  const post_name = document.querySelector("#site_url");

  let postHash = "";

  if (post_name) {
    const md5 = CryptoJS.MD5(post_name.innerHTML.replaceAll("/", ""));
    postHash = md5.toString(CryptoJS.enc.Base64);
  }

  // ==============
  // Publication reactions buttons
  // Load data from database
  // ==============
  if (postHash) {
    const ref = db.collection("reactions").doc(postHash);

    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            rLike.innerText = data.like;
            rFire.innerText = data.fire;
            rFace.innerText = data.poker_face;
            rPoo.innerText = data.poo;
            rDislike.innerText = data.dislike;
          }
        } else {
          // doc.data() will be undefined in this case
          db.collection("reactions").doc(postHash).set({
            like: 0,
            fire: 0,
            poker_face: 0,
            poo: 0,
            dislike: 0,
          });
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  // ==============
  // Publication reactions buttons
  // Set selected emoji
  // ==============
  if (window.sessionStorage.getItem(postHash)) {
    const obj = window.sessionStorage.getItem(postHash);
    reactionsButtons[emoj.indexOf(obj)].classList.add("active");
  }

  // ==============
  // Publication reactions buttons
  // Set actions
  // ==============
  reactionsButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      // Функция для обновления счетчика реакции и сохранения его в базе данных
      function updateReaction(postHash, idx, counterChange) {
        const currentCounter = parseInt(reactionsCounters[idx].innerText);
        reactionsCounters[idx].innerText = currentCounter + counterChange;

        const reactionUpdate = { [emoj[idx]]: currentCounter + counterChange };
        db.collection("reactions").doc(postHash).update(reactionUpdate);
      }

      // Функция для добавления или удаления класса "active" у кнопки реакции
      function toggleButtonActive(idx, isActive) {
        const method = isActive ? "add" : "remove";
        reactionsButtons[idx].classList[method]("active");
      }

      // Получаем сохраненную реакцию из sessionStorage
      const storedReaction = window.sessionStorage.getItem(postHash);

      // Если была сохраненная реакция, уменьшаем счетчик этой реакции на 1 и убираем активность с кнопки
      if (storedReaction) {
        const storedReactionIdx = emoj.findIndex((el) => el === storedReaction);
        updateReaction(postHash, storedReactionIdx, -1);
        toggleButtonActive(storedReactionIdx, false);
      }

      // Если пользователь повторно нажал на ту же реакцию, убираем эту реакцию
      if (storedReaction === emoj[idx]) {
        window.sessionStorage.removeItem(postHash);
      } else {
        // В противном случае, сохраняем выбранную реакцию, увеличиваем счетчик на 1 и добавляем активность кнопке
        window.sessionStorage.setItem(postHash, emoj[idx]);
        updateReaction(postHash, idx, 1);
        toggleButtonActive(idx, true);
      }
    });
  });
}

var themesLoader = function () {
  // ==============
  // Show All themes Desktop
  // ==============

  const navAllThemesButton = document.getElementById("nav-all-themes");
  const headerAllThemesContainter = document.getElementById("header-all-themes");

  navAllThemesButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (headerAllThemesContainter.classList.contains("show")) {
      headerAllThemesContainter.classList.remove("show");
      return;
    }

    headerAllThemesContainter.classList.add("show");
  });

  // ==============
  // Show All themes Mobile
  // ==============

  const cloudMin = document.querySelector("#tag-cloud-min");
  const cloudAll = document.querySelector("#tag-cloud-all");
  const showAllTagsButton = document.querySelector("#show-all-tags");
  const closeAllTagsButton = document.querySelector("#close-all-tags");

  if (showAllTagsButton){
  showAllTagsButton.addEventListener("click", () => {
      if (cloudMin.style.display === "block") {
        cloudAll.style.display = "block";
        cloudMin.style.display = "none";
      }
    });
  }

  if (closeAllTagsButton){
  closeAllTagsButton.addEventListener("click", () => {
      if (cloudAll.style.display === "block") {
        cloudAll.style.display = "none";
        cloudMin.style.display = "block";
      }
    });
  }

}

var sharePostLoader = function() {

  const socialShare = document.querySelectorAll(".js-share");
  
  // ==================
  // Social Share Logic
  // ==================
  if (socialShare.length > 0) {
    jsShareable(socialShare);
  }

  // ==============
  // Social Sharing Post
  // ==============
  const socialsButtonShare = document.querySelector("#share-socials-button");

  if (socialsButtonShare) {
    const hiddedSocials = document.querySelector("#share-socials");
    socialsButtonShare.addEventListener("click", () => {
      if (hiddedSocials.style.display === "none") {
        hiddedSocials.style.display = "flex";
      } else {
        hiddedSocials.style.display = "none";
      }
    });
  }

  function shareOnFacebook(link) {
    const urlToShare = window.location.href;
    const baseURL = link;
    const params = `${encodeURIComponent(urlToShare)}`;
    ym(77659420, "reachGoal", "sharePost");

    const shareWindow = window.open(`${baseURL}${params}`);
    shareWindow.focus();
  }

  // ============
  // Share links
  // ============
  if (document.querySelector(".post-hero")) {
    const wpShare = document.getElementById("wpShare");
    wpShare.addEventListener("click", () => {
      shareOnFacebook("https://api.whatsapp.com/send?text=");
    });

    const vkShare = document.getElementById("vkShare");
    vkShare.addEventListener("click", () => {
      shareOnFacebook("https://vk.com/share.php?url=");
    });

    const tgShare = document.getElementById("tgShare");
    tgShare.addEventListener("click", () => {
      shareOnFacebook("https://telegram.me/share/url?url=");
    });
  }


  // ==============
  // Social Sharing
  // ==============
  function jsShareable(socialShare) {
    if (socialShare.length > 1) {
      socialShare.forEach((el) => {
        let title = el.getAttribute("data-title");
        let url = el.getAttribute("data-url");
        let type = el.getAttribute("data-type");

        jsShare(el, title, url, type);
      });
    } else {
      let title = socialShare.getAttribute("data-title");
      let url = socialShare.getAttribute("data-url");
      let type = socialShare.getAttribute("data-type");

      jsShare(socialShare, title, url, type);
    }
  }

}


if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) 
{
  callback();
  themesLoader();

  if (document.location != document.location.origin + '/')
  {
    sharePostLoader();
    reactionsLoader();
  } 
} 
else 
{
  document.addEventListener("DOMContentLoaded", callback);
  document.addEventListener("DOMContentLoaded", themesLoader);

  if (document.location != document.location.origin + '/')
  {
    document.addEventListener("DOMContentLoaded", reactionsLoader);
    document.addEventListener("DOMContentLoaded", sharePostLoader);
  } 
}



// ===============================
// Dark/Light mode theme handling
// ===============================
const setTheme = (sTheme) => {
  document.documentElement.setAttribute("data-color-scheme", sTheme);
  localStorage.setItem("USER_COLOR_SCHEME", sTheme);
};

// ===============================
// Scroll to function
// ===============================
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

// ===============================
// Check if element is in viewport
// ===============================
function isInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}

// =================
// Lazyload function
// =================
function newLazyLoad() {
  return new LazyLoad({
    elements_selector: ".lazyload",
    class_loading: "loading",
    class_loaded: "loaded",
    treshold: 100,
    // use_native: true,
    callback_enter: function (el) {
      el.classList.add("loading");
    },
    callback_set: function (el) {
      el.classList.remove("loading");
      el.classList.add("loaded");
    },
  });
}

function updateLazyLoad(lazyLoad) {
  lazyLoad.update();
}

// =================
// Close popup
// =================
const closePopup = (el) => {
  el.parentNode.parentNode.classList.add("is-closed");
  setTimeout(function () {
    el.parentNode.parentNode.style.display = "none";
  }, 1000);
};

// =================
// Copy to clipboard
// =================
const copyToClipboard = (src, str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  src.classList.add("has-tooltip");
  src.setAttribute("data-label", "Copied!");

  src.onmouseleave = () => {
    src.classList.remove("has-tooltip");
    setTimeout(function () {
      src.setAttribute("data-label", "");
    }, 500);
  };
};

function jsShare(el, title, url, type) {
  let shareLink;

  switch (type) {
    case "twitter":
      shareLink = "https://twitter.com/share?text=" + title + "&amp;url=" + url;
      break;
    case "facebook":
      shareLink = "https://www.facebook.com/sharer/sharer.php?u=" + url;
      break;
    case "linkedin":
      shareLink =
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        url +
        "&title=" +
        title +
        "&summary=" +
        title;
      break;
    case "email":
      el.onclick = () => {
        location.href = el.getAttribute("href");
      };
      el.onkeydown = (evt) => {
        if (evt.key === "Enter") {
          location.href = el.getAttribute("href");
        }
      };
      break;
    case "copy":
      el.onclick = () => {
        copyToClipboard(el, location.href);
      };
      el.onkeydown = (evt) => {
        if (evt.key === "Enter") {
          copyToClipboard(el, location.href);
        }
      };
      break;
    default:
      break;
  }

  if (shareLink) {
    el.onclick = () => {
      socialWindow(shareLink);
    };

    el.onkeydown = (evt) => {
      if (evt.key === "Enter") {
        socialWindow(shareLink);
      }
    };
  }
}

const socialWindow = (url) => {
  var left = (screen.width - 580) / 2;
  var top = (screen.height - 580) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=580,height=296,top=" +
    top +
    ",left=" +
    left;
  window.open(url, "NewWindow", params);
};

// if last page disable button
if (global.pagination_current_page === global.pagination_max_pages) {
  const loadMore = document.querySelector("#load-more-posts");
  loadMore.disabled = true;
  loadMore.classList.add("btn--disabled");
}

// ===============
// Load More Posts
// ===============
function loadMorePosts (button, spinner)  {
  // Next link
  const nextPage = document.querySelector("link[rel=next]");

  global.pagination_next_page_link =
    nextPage && !global.pagination_next_page_link
      ? nextPage.getAttribute("href")
      : global.pagination_next_page_link;

  // Update current page value
  if (nextPage && global.pagination_next_page <= global.pagination_max_pages) {
    const fetchLink = global.pagination_next_page_link;

    if (spinner) {
      spinner.style.visibility = "visible";
    }

    // Fetch next page content
    fetch(fetchLink)
      .then(function (response) {
        // Fetch Successfull
        return response.text();
      })
      .then(function (html) {
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        function isNotHidden(el) {
          var style = window.getComputedStyle(el);
          return style.display !== "none";
        }

        // Get posts
        const posts = doc.querySelectorAll(".post-wrap");
        // const postContainer = document.querySelectorAll(".posts");
        const postContainer = [...document.querySelectorAll(".posts")].filter(
          isNotHidden
        );
        const nextPage = doc.querySelector("link[rel=next]");

        // Add each post to the page
        posts.forEach((post) => {
          postContainer[postContainer.length - 1].appendChild(post);
        });

        // Update lazyload for images
        updateLazyLoad(lazyLoad);

        // Disable button on last page
        if (global.pagination_next_page === global.pagination_max_pages) {
          button.disabled = true;
          button.classList.add("btn--disabled");
        }

        // Update next page number
        global.pagination_next_page_link = nextPage
          ? nextPage.getAttribute("href")
          : "";
        global.pagination_next_page = global.pagination_next_page_link
          ? global.pagination_next_page + 1
          : NaN;

        if (spinner) {
          spinner.style.visibility = "hidden";
        }
      })
      .catch(function (err) {
        if (spinner) {
          spinner.style.visibility = "hidden";
        }
        // There was an error

        console.warn("Something went wrong.", err);
      });
  } else {
    // No more pages, disable button
    button.disabled = true;
    button.classList.add("btn--disabled");
  }
};

// ================================
// Members Parse the URL parameter
// ================================
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
