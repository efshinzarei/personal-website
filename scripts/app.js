const navToggleIcon = document.querySelector(".nav__toggle-icon");
const menu = document.querySelector(".menu");
const cover = document.querySelector(".cover");
const resumeListItems = document.querySelectorAll(".resume-list__item");
const portfolioListItems = document.querySelectorAll(".portfolio-list__item");
const menuItems = document.querySelectorAll(".menu__item");
const sections = document.querySelectorAll("main > section");

navToggleIcon.addEventListener("click", () => {
  navToggleIcon.classList.toggle("nav__toggle-icon--open");
  menu.classList.toggle("menu--open");
  cover.classList.toggle("cover--show");
});

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

const observer = new IntersectionObserver(observerHandler, {
  threshold: 0.50,
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
