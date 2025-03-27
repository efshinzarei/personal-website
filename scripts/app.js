const navToggleIcon = document.querySelector(".nav__toggle-icon");
const menu = document.querySelector(".menu");
const cover = document.querySelector(".cover");
const resumeListItems = document.querySelectorAll(".resume-list__item");
const portfolioListItems = document.querySelectorAll(".portfolio-list__item");
const menuItems = document.querySelectorAll(".menu__item");
const sections = document.querySelectorAll("main > section");
const changeThemeBtn = document.querySelector(".change-theme");
const lightModeTheme = `<svg width="35" height="35" fill="#fff" viewBox="0 0 24 24" id="light-mode"><path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5zm5-3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm1-4V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1zm6.1-.1c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.3.4-1 0-1.4zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1zm-3.3 5.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1.4-1.4zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1s-1 .4-1 1zm-6.1.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4c-.4.3-.4 1 0 1.4zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3c-.6 0-1 .4-1 1zm4.3-7.1c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.3.5.4.8.4s.5-.1.7-.3c.4-.4.4-1 0-1.4L6.3 4.9z"/></svg>`;
const darkModeTheme = `<svg class="change-theme__icon" width="35" height="35"viewBox="0 0 30 30" id="moon"><path fill="transparent" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.63 20a9 9 0 0 1-9.12-8.78A8.61 8.61 0 0 1 14.17 5 10.17 10.17 0 0 0 5 15a10.23 10.23 0 0 0 10.42 10A10.43 10.43 0 0 0 25 18.9a9.3 9.3 0 0 1-4.37 1.1Z"/></svg>`;

if (window.localStorage.getItem("theme") === "dark-theme") {
  document.documentElement.classList.add("dark-theme");
  changeThemeBtn.innerHTML = lightModeTheme;
}

// Intersection Observer
const observer = new IntersectionObserver(observerHandler, {
  threshold: 0.5,
});
function observerHandler(allSections) {
  allSections.map((section) => {
    let sectionClassName = section.target.className;
    let sectionMenuItem = document.querySelector(
      `.menu__item[data-section=${sectionClassName}]`
    );
    if (section.isIntersecting) {
      sectionMenuItem.classList.add("menu__item--active");
    } else {
      sectionMenuItem.classList.remove("menu__item--active");
    }
  });
}

// Custom Function
function navigationTabsInit(
  listItems,
  listItemActiveClass,
  contentItemShowClass
) {
  listItems.forEach((listItem) => {
    listItem.addEventListener("click", () => {
      removeActiveClass(listItemActiveClass);
      removeActiveClass(contentItemShowClass);
      listItem.classList.add(listItemActiveClass);
      let contentId = listItem.getAttribute("data-content-id");
      document.querySelector(contentId).classList.add(contentItemShowClass);
    });
  });
}
function removeActiveClass(className) {
  document.querySelector(`.${className}`).classList.remove(className);
}

// App Navigation Tabs Setting uo
navigationTabsInit(
  portfolioListItems,
  "portfolio-list__item--active",
  "portfolio-content--show"
);
navigationTabsInit(
  resumeListItems,
  "resume-list__item--active",
  "resume-content--show"
);

// Event Listeners
navToggleIcon.addEventListener("click", () => {
  navToggleIcon.classList.toggle("nav__toggle-icon--open");
  menu.classList.toggle("menu--open");
  cover.classList.toggle("cover--show");
});
changeThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-theme");
  if (document.documentElement.classList.contains("dark-theme")) {
    window.localStorage.setItem("theme", "dark-theme");
    changeThemeBtn.innerHTML = lightModeTheme;
  } else {
    window.localStorage.setItem("theme", "light-theme");
    changeThemeBtn.innerHTML = darkModeTheme;
  }
});

// Loops
sections.forEach((section) => {
  observer.observe(section);
});
menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    removeActiveClass("menu__item--active");
    item.classList.add("menu__item--active");

    let sectionClass = item.getAttribute("data-section");
    let sectionOffsetTop = document.querySelector(`.${sectionClass}`).offsetTop;

    window.scrollTo({
      top: sectionOffsetTop - 170,
      behavior: "smooth",
    });
  });
});
