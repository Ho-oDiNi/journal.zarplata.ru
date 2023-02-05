//****************************************
// Website scripts
//****************************************

// Event DOM ready
var callback = function(){
  // ================
  // Global data
  // ================
  const loadMoreBtn = document.querySelector('#load-more-posts');
  const darkSwitch = document.querySelector('#theme-dark');
  const lightSwitch = document.querySelector('#theme-light');
  const menuOpen = document.querySelector('#menu-open');
  const menuClose = document.querySelector('#menu-close');
  const searchOpen = document.querySelector('#search-open');
  const searchOpenMobile = document.querySelector('#search-open-mobile');
  const searchClose = document.querySelector('#search-close');
  const searchForm = document.querySelector('#search-form');
  const searchField = document.querySelector('#ghost-search-field');
  const searchByTags = document.querySelectorAll('.js-search-tag');
  const msgBoxes = document.querySelectorAll('.js-msg-close');
  const images = document.querySelectorAll('.kg-image-card img, .kg-gallery-card img');
  const galleryImages = document.querySelectorAll('.kg-gallery-image img');
  const subscribeButton = document.querySelector('.subscribe-button');
  const socialShare = document.querySelectorAll('.js-share');
  const progressbar = document.querySelector('#progress');
  const postToc = document.querySelector('.post.has-toc');
  const scrollTop = document.querySelector('.scroll-to-top');

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
  window.addEventListener('scroll', (event) => {
    // Modify header
    window.scrollY > 56 ? addClass('.header', 'is-scrolled') : '';
    window.scrollY <= 6 ? removeClass('.header', 'is-scrolled') : '';
    
    // Progressbar
    if (progressbar) {
      if (config.enable_progress_bar) {
        var scrollTop = document.querySelector('.post')["scrollTop"] ||
                        document.documentElement["scrollTop"] || 
                        document.body["scrollTop"];

        var scrollBottom = ( document.querySelector('.post')["scrollHeight"] ||
                            document.documentElement["scrollHeight"] ||
                            document.body["scrollHeight"]) - 
                            document.documentElement.clientHeight;

        scrollPercent = Math.round(scrollTop / scrollBottom * 100) + "%";
        document.getElementById("progress").style.setProperty("--scroll", scrollPercent);
      } else {
        progressbar.style.display = "none";
      }
    }

    if (config.enable_scroll_top) {
      // Scroll Top function
      window.scrollY > 200 ? addClass('.scroll-to-top', 'is-active') 
                           : removeClass('.scroll-to-top', 'is-active');
    }
    
  }, false);

  // =============
  // Scroll Top
  // =============
  if (scrollTop) {
    scrollTop.onclick = (evt) => {
      // window.scrollTo({top: 0, behavior: 'smooth'}); // not supported in all browsers
      scrollToTop();
    }
  }

  // =======================================
  // Key press event handling
  // =======================================
  window.onkeydown = (evt) => {
    const sourceClass = evt.srcElement.className;

    switch(evt.key) {
      case 'Escape':
        removeClass('.menu', 'is-active');
        removeClass('.search', 'is-active');
        document.body.style.overflowY = "auto"; 
        break;
      default:
        break;// nothing to do
    }
  }

  // ============
  // Menu actions
  // ============
  if (menuOpen && menuClose) {
    menuOpen.onclick = () => {
      addClass('.menu', 'is-active');
    }
  
    menuOpen.onkeydown = (evt) => {
      if (evt.key === 'Enter' || evt.keyCode === '13') {
        addClass('.menu', 'is-active');
        menuClose.focus();
      }
    }

    menuClose.onclick = () => {
      removeClass('.menu', 'is-active');
    }
  
    menuClose.onkeydown = (evt) => {
      if (evt.key === 'Escape' || evt.keyCode === '27' || 
          evt.key === 'Enter' || evt.keyCode === '13') {
        removeClass('.menu', 'is-active');
        menuOpen.focus();
      }
    }
  }

  // ============
  // User Menu 
  // ============
  const userMenu = document.querySelector('.header__member--open');

  if (userMenu) {
    userMenu.onclick = () => {
      toggleClass('.header__member--open', 'is-active');
    }
  
    userMenu.onkeydown = (evt) => {
      if (evt.key === 'Enter' || evt.keyCode === '13') {
        toggleClass('.header__member--open', 'is-active');
        userMenu.focus();
      }
    }

    userMenu.blur = () => {
      removeClass('.header__member--open', 'is-active');
    }
  }
  
  // ==============
  // Search actions
  // ==============
  if (searchOpen && searchClose) {
    searchOpen.onclick = () => {
      addClass('.search', 'is-active');
      document.body.style.overflowY = "hidden";
      searchField.focus();
    };
  
    searchOpen.onkeydown = (evt) => {
      if (evt.key === 'Enter' || evt.keyCode === '13') {
        addClass('.search', 'is-active');
        document.body.style.overflowY = "hidden";
        searchField.focus();
      }
    }

    searchClose.onclick = () => {
      removeClass('.search', 'is-active');
      document.body.style.overflowY = "auto";
    };
  
    searchClose.onkeydown = (evt) => {
      if (evt.key === 'Escape' || evt.keyCode === '27' || 
          evt.key === 'Enter' || evt.keyCode === '13') {
        removeClass('.search', 'is-active');
        document.body.style.overflowY = "auto";
        searchOpen.focus();
      }
    }
  }

  // ==============
  // Search mobile actions
  // ==============
  if (searchOpenMobile && searchClose) {
    searchOpenMobile.onclick = () => {
      addClass('.search', 'is-active');
      document.body.style.overflowY = "hidden";
      searchField.focus();
    };
  
    searchOpenMobile.onkeydown = (evt) => {
      if (evt.key === 'Enter' || evt.keyCode === '13') {
        addClass('.search', 'is-active');
        document.body.style.overflowY = "hidden";
        searchField.focus();
      }
    }

    searchClose.onclick = () => {
      removeClass('.search', 'is-active');
      document.body.style.overflowY = "auto";
    };
  
    searchClose.onkeydown = (evt) => {
      if (evt.key === 'Escape' || evt.keyCode === '27' || 
          evt.key === 'Enter' || evt.keyCode === '13') {
        removeClass('.search', 'is-active');
        document.body.style.overflowY = "auto";
        searchOpenMobile.focus();
      }
    }
  }

  if ( searchField && searchForm ) {
    searchField.onfocus = () => {
      addClass('.search__form', 'focused');
    };
  
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    }, false);
  
    searchField.onblur = () => {
      removeClass('.search__form', 'focused');
    };
  }

  if ( searchByTags ) {
    searchByTags.forEach((el) => {
      el.onclick = (evt) => {
        searchField.value = evt.srcElement.innerText;
        searchField.dispatchEvent(new Event('keyup'));
      }

      el.onkeydown = (evt) => {
        if (evt.key === 'Enter' || evt.keyCode === '13') { 
          searchField.value = evt.srcElement.innerText;
          searchField.dispatchEvent(new Event('keyup'));
        }
      }
    });
  }

  // =============
  // Theme actions
  // =============
  if (darkSwitch && lightSwitch) {
    darkSwitch.onclick = () => {
      setTheme('dark');
    }
  
    darkSwitch.onkeydown = (evt) => {
      if (evt.key === 'Enter' || evt.keyCode === '13') {
        setTheme('dark');
        lightSwitch.focus();
      }
    }
  
    lightSwitch.onclick = () => {
      setTheme('light');
    }
  
    lightSwitch.onkeydown = (evt) => {
      if (evt.key === 'Enter' || evt.keyCode === '13') {
        setTheme('light');
        darkSwitch.focus();
      }
    }
  }

  // =======================================
  // Message Box handling 
  // =======================================
  if (msgBoxes) {
    if ( msgBoxes.length === 1 ) {
      msgBoxes[0].onclick = (evt) => {
        closePopup(msgBoxes[0]);
      }
    }
    else {
      msgBoxes.forEach((el) => {
        el.onclick = (evt) => {
          closePopup(el);
        }
      });
    }
  }

  // ===============
  // Members Scripts
  // ===============
  // Give the parameter a variable name
  const action = getParameterByName('action');
  const stripe = getParameterByName('stripe');
  getVacancies();
  subscribePopip();

  switch (action) {
    case 'subscribe':
      // addClass('body', 'subscribe-success');
      ym(77659420,'reachGoal','popupSubscribeSend');
      document.body.classList.add('subscribe-success');
      break;
    case 'signup': 
      window.location = '/signup/?action=checkout';
      break;
    case 'checkout':
      // addClass('body', 'signup-success');
      // addClass('form[data-members-form]', 'success');
      document.body.classList.add('signup-success');
      break;
    case 'signin':
      // addClass('body', 'signin-success');
      // addClass('form[data-members-form]', 'success');
      document.body.classList.add('signin-success');
      break;
    default:
      break;
  }

  if (stripe == 'success') {
    // addClass('body', 'checkout-success');
    document.body.classList.add('checkout-success');
  }

  // Reset form on opening subscrion overlay
  if (subscribeButton) {
    subscribeButton.onclick = function(event){
      document.querySelector('.subscribe-overlay form').className = '';
      document.querySelector('.subscribe-email').value = '';
    };
  }

  // =======================================
  // Disable load more posts button 
  // =======================================
  if (loadMoreBtn && global.max_pages === 1) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('btn--disabled');
  }

  // ===============
  // Load More Posts
  // ===============
  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      loadMorePosts(loadMoreBtn);
    }
  }

  // ===========
  // Blog search
  // ===========
  let ghostSearch = new GhostSearch({
    key: config.ghost_key,
    url: config.ghost_url,
    version: config.ghost_version,
    // button: '#search-button',
    template: function(result) {
      let postImage = '';
      
      const date = new Date(result.published_at);

      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

      const modifiedDate = `${da} ${mo} ${ye}`;

      result.feature_image ? postImage = '<img class="search-result__image" src="' + result.feature_image + '"/>' : '';
      return  '<a href="/' + result.slug + '" class="search-result__post animate fade-in-up">' +
                '<div class="search-result__content">' +
                  '<h5 class="search-result__title">' + result.title + '</h5>' +
                  '<p class="search-result__date">' + modifiedDate + '</p>' +
                '</div>' +
                postImage + 
              '</a>';
    },
    trigger: 'focus',
    options: {
      keys: ['title', 'tags.0.name']
    },
    api: {
      resource: 'posts',
      parameters: {
          limit: 'all',
          fields: ['title', 'slug', 'published_at', 'feature_image'],
          filter: '',
          include: 'tags',
          order: '',
          formats: '',
      },
    }
  });

  // ======================
  // Post Table of Contents
  // ======================
  if (postToc) {
    const tocToggle = document.querySelector('.js-toc-toggle');

    if (tocToggle) {
      tocToggle.onclick = (evt) => {
        toggleClass('.js-toc', 'is-active');
        toggleClass('.js-toc-icon', 'is-rotated');
      }
    }

    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      // smooth scroll
      scrollSmooth: false,
      // offset
      headingsOffset: 60,
    });

    const tocLinks = document.querySelectorAll('.toc-list-item a[href^="#"]');
    if (tocLinks) {
      tocLinks.forEach(link => {
        link.onclick = function(e) {
          removeClass('.js-toc', 'is-active');
        }
      })
    }
  }

  // =============
  // Image Gallery
  // =============
  images.forEach(function (image) {
    if (config.enable_image_lightbox) {
      var wrapper = document.createElement('a');
      wrapper.setAttribute('data-no-swup', '');
      wrapper.setAttribute('data-fslightbox', '');
      wrapper.setAttribute('href', image.src);
      wrapper.setAttribute('aria-label', 'Click for Lightbox');
      image.parentNode.insertBefore(wrapper, image.parentNode.firstChild);
      wrapper.appendChild(image);
    }
    image.setAttribute('class', 'lazyload lazy');
    // image.setAttribute('data-src', image.src);
    // image.removeAttribute('src');
    updateLazyLoad(lazyLoad);
  });

  galleryImages.forEach(function (image) {
    image.setAttribute('alt', 'Gallery Image');
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  })
  
  // =============
  // Lightbox
  // =============
  refreshFsLightbox();

  // ==================
  // Social Share Logic
  // ==================
  if (socialShare.length > 0) {
    jsShareable(socialShare);
  }

  // ==================
  // Post external links
  // ==================
  if (config.open_links_in_new_tab) {
    const domain = location.host.replace('www.', '');
    const postLinks = document.querySelectorAll('.post__content a');
  
    postLinks.forEach((link) => {
      if(!link.href.includes(domain)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noreferrer noopener');
      }
    })
  }
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

// ===============================
// Dark/Light mode theme handling
// ===============================
const setTheme = (sTheme) => {
  document.documentElement.setAttribute('data-color-scheme', sTheme);
  localStorage.setItem('USER_COLOR_SCHEME', sTheme);
}

// ===============================
// Class modifying helepers
// ===============================
const toggleClass = (el, cls) => {
  document.querySelector(el).classList.toggle(cls);
}

const addClass = (el, cls) => {
  document.querySelector(el).classList.add(cls);
}

const removeClass = (el, cls) => {
  document.querySelector(el).classList.remove(cls);
}

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

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return(
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
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
    callback_enter: function(el) {
      el.classList.add('loading');
    },
    callback_set: function(el) {
      el.classList.remove('loading');
      el.classList.add('loaded');
    }
  });
}

function updateLazyLoad(lazyLoad) {
  lazyLoad.update();
}

// =================
// Close popup
// =================
const closePopup = (el) => {
  el.parentNode.parentNode.classList.add('is-closed');
  setTimeout(function(){
    el.parentNode.parentNode.style.display = "none";
  }, 1000); 
}

// =================
// Copy to clipboard
// =================
const copyToClipboard = (src, str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  src.classList.add('has-tooltip');
  src.setAttribute('data-label', 'Copied!');

  src.onmouseleave = () => { 
    src.classList.remove('has-tooltip');
    setTimeout(function(){
      src.setAttribute('data-label', '');
    }, 500); 
  }
};

// ==============
// Social Sharing
// ==============
function jsShareable(socialShare) {
  if (socialShare.length > 1) {
    socialShare.forEach((el) => {
      let title = el.getAttribute('data-title');
      let url = el.getAttribute('data-url');
      let type = el.getAttribute('data-type');
      
      jsShare(el, title, url, type);
    });
  } else {
    let title = socialShare.getAttribute('data-title');
    let url = socialShare.getAttribute('data-url');
    let type = socialShare.getAttribute('data-type');

    jsShare(socialShare, title, url, type);
  }
}

function jsShare (el, title, url, type) {
  let shareLink;

  switch(type) {
    case 'twitter':
      shareLink = 'https://twitter.com/share?text=' + title + '&amp;url=' + url;
      break;
    case 'facebook':
      shareLink = 'https://www.facebook.com/sharer/sharer.php?u='+ url;
      break;
    case 'linkedin':
      shareLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + title;
      break;
    case 'email':
      el.onclick = () => {
        location.href = el.getAttribute('href');
      }
      el.onkeydown = (evt) => {
        if (evt.key === 'Enter') {
          location.href = el.getAttribute('href');
        }
      }
      break;
    case 'copy': 
      el.onclick = () => {
        copyToClipboard(el, location.href);
      }
      el.onkeydown = (evt) => {
        if (evt.key === 'Enter') {
          copyToClipboard(el, location.href);
        }
      }
      break;
    default:
      break;
  }

  if (shareLink) {
    el.onclick = () => {
      socialWindow(shareLink);
    }

    el.onkeydown = (evt) => {
      if (evt.key === 'Enter') {
        socialWindow(shareLink);
      }
    }
  }
}

const socialWindow = (url) => {
  var left = (screen.width - 580) / 2;
  var top = (screen.height - 580) / 2;
  var params = "menubar=no,toolbar=no,status=no,width=580,height=296,top=" + top + ",left=" + left;
  window.open(url,"NewWindow",params);
}; 

// if last page disable button
if (global.pagination_current_page === global.pagination_max_pages) {
  const loadMore = document.querySelector('#load-more-posts')
  loadMore.disabled = true;
  loadMore.classList.add('btn--disabled');
}

// ===============
// Load More Posts
// ===============
const loadMorePosts = (button) => {
  
  // Next link
  const nextPage = document.querySelector('link[rel=next]');

  global.pagination_next_page_link = nextPage && !global.pagination_next_page_link
                        ? nextPage.getAttribute('href') 
                        : global.pagination_next_page_link;

  // Update current page value
  if (nextPage && global.pagination_next_page <= global.pagination_max_pages) {
    const fetchLink = global.pagination_next_page_link

    // Fetch next page content
    fetch(fetchLink).then(function (response) {
      // Fetch Successfull
      return response.text();
    }).then(function (html) {
      // Convert the HTML string into a document object
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      
      // Get posts
      const posts = doc.querySelectorAll('.post-wrap');
      const postContainer  = document.querySelector('.posts');
      const nextPage = doc.querySelector('link[rel=next]');
      
      // Add each post to the page
      posts.forEach(post => {
        postContainer.appendChild(post);
      })
      
      // Update lazyload for images
      updateLazyLoad(lazyLoad);

      // Disable button on last page
      if (global.pagination_next_page === global.pagination_max_pages) {
        button.disabled = true;
        button.classList.add('btn--disabled');
      }

      // Update next page number
      global.pagination_next_page_link = nextPage ? nextPage.getAttribute('href') : '';
      global.pagination_next_page = global.pagination_next_page_link ? global.pagination_next_page + 1 : NaN;

    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  } 
  else {
    // No more pages, disable button
    button.disabled = true;
    button.classList.add('btn--disabled');
  }
}


// ================================
// Members Parse the URL parameter
// ================================
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// ================================
// Get Vacancies
// ================================
const LAT_COEFFICIENT = 0.50;
const LTD_COEFFICIENT = 0.19;
const GEOHASH_MOSCOW = "1203101010112";

function getVacancies() {
  // fetching optimization
  if (sessionStorage.getItem('vacancies')) {
    createListOfVacancies(JSON.parse(sessionStorage.getItem('vacancies')));
    return;
  }

  //get user location
  window.navigator.geolocation.getCurrentPosition( 
    async (position) => {
      const urlSearchParams = new URLSearchParams({
        bottom_lat: position.coords.latitude - LAT_COEFFICIENT,
        left_lng: position.coords.longitude - LTD_COEFFICIENT,
        top_lat: position.coords.latitude + LAT_COEFFICIENT,
        right_lng: position.coords.longitude + LTD_COEFFICIENT,
        width_points: 1000,
        height_points: 300,
        map_zoom: 12
      });
      
      //get geohash of user location
      const geohash = await fetch(`https://api.hh.ru/vacancies/map?${urlSearchParams}`)
      .then(res => res.json())
      .then(data => data.geo_clusters[0]?.geohash)
      .catch((e) => {throw new Error(e)}) || GEOHASH_MOSCOW;

      await fetchVacanciesByGeoHash(geohash);
    }, 
    async () => {
      await fetchVacanciesByGeoHash(GEOHASH_MOSCOW);
    }
  );
}

// ================================
// Get Vacancies with GeoHash
// ================================
async function fetchVacanciesByGeoHash(geohash) {
  //get current date for new vacancies 
  const today = new Date();
  const formattedDay = today.getFullYear() + '-' +
                       String(today.getMonth() + 1).padStart(2, '0') + '-' +
                       String(today.getDate()).padStart(2, '0');
                       
  
  const urlSearchParams = new URLSearchParams({
    geohash: geohash,
    date_from: formattedDay,
    date_to: formattedDay,
    limit: 5
  });

  const vacancies = await fetch(`https://api.zarplata.ru/vacancies?${urlSearchParams}`)
  .then((res) => res.json())
  .then(data => data)
  .catch((e) => {throw new Error(e)});
  
  if (vacancies) {
    sessionStorage.setItem(
      'vacancies', 
      JSON.stringify(vacancies.items.slice(0,5))
    );
    createListOfVacancies(vacancies.items.slice(0,5));
  }
}

// ================================
// Generate list of vacancies
// ================================
function createListOfVacancies(vacancies) {
  const vacanciesPlacement = document.querySelector('#vacancies-placements');

  if (vacancies && vacanciesPlacement) {
    vacancies.forEach((item) => {
      const li = document.createElement('li');
      let formatted_salary = 'договорная оплата';
      const vacancyUrl =`https://www.zarplata.ru/vacancy/card/id${item.id}?utm_source=blog_vacancy`;
      
      if (item.salary) {
        if (item.salary.from && item.salary.to) {
          formatted_salary = item.salary.from + ' - ' + item.salary.to + ' ₽';
        } else if (item.salary.to) {
          formatted_salary = item.salary.to + ' ₽';
        }
      }

      li.innerHTML = `
        <a href="${vacancyUrl}" style="color:#0055d2;" target="_blank">
          ${item.name}
        </a><br>
        <span>${formatted_salary}</span><br>
        <span style="color:#68696a;">${item.employer.name}</span>
      `;
  
      li.style.marginBottom = '18px';
      vacanciesPlacement.appendChild(li);
    });
  }
}

function subscribePopip () {
  // ================================
  // Show subscribe popup
  // ================================
  
  const closeButton = document.getElementById('subscribe_popup-close');
  // const subscribeButtonPopup = document.getElementById('subscribe-button');
  const popup = document.querySelector('#subscribe_popup');
  const postContent = document.querySelector('.post__content');
  const popupLink = document.querySelector('.subscribe__popup-link');
  let timeout = null;
  let popups = [];

  if (!window.sessionStorage.getItem("subscribe-popup-session-end")) {
    if (window.sessionStorage.getItem("subscribe-popups")) {
      popups = window.sessionStorage.getItem("subscribe-popups").split(' ');
    } else {
      popups = [1001,1002,1003,1004,1005];
    }
  }
  
  const randomPopupIndex = Math.floor(Math.random() * popups.length);

  // window.addEventListener('beforeunload', function () {
  //   if(popup.classList.contains('_show') && !window.sessionStorage.getItem("subscribe-popup-show")) {
  //     ym(77659420,'reachGoal','popupUserLeave');
  //   }
  // });

  // if (subscribeButtonPopup) {
  //   subscribeButtonPopup.addEventListener('click', () => {
  //     ym(77659420,'reachGoal','emailSubscribe'); 
  //     return true;
  //   });
  // }

  if (postContent) {
    const showPoint = (postContent.offsetHeight / 3) * 2;
    window.onscroll = function (e) {  
      if (window.scrollY >= showPoint) {
        showPopup('publication');
      }
    } 
  } else {
    timeout = setTimeout(() => {
      showPopup('mainPage');
    }, 15000);
  }

  function showPopup(from) {
    if (popup && !window.sessionStorage.getItem("subscribe-popup-session-end") && !popup.classList.contains("_show")) {
      if (from === 'publication') {
        ym(77659420,'reachGoal','showPopupPublication');
      } else if (from === 'mainPage') {
        ym(77659420,'reachGoal','showPopupMain');
      }

      popup.classList.add("_show");
      const content = document.getElementById(popups[randomPopupIndex]);
      content.style.display = 'inherit';

      window.sessionStorage.setItem("subscribe-popups", popups.filter(i => i !== popups[randomPopupIndex]).join(' '));

      popupLink.addEventListener('click', () => {
        ym(77659420,'reachGoal','click-popup');
      })

      closeButton.addEventListener('click', () => {
        if (popup) {
          popup.classList.remove("_show");
          closeButton.style.display="none";
          ym(77659420,'reachGoal','close-popup');
          window.sessionStorage.setItem("subscribe-popup-session-end", 'true');
        }
      })
    }
    clearTimeout(timeout);
  }
}