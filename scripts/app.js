const navToggleIcon = document.querySelector(".nav__toggle-icon");
const menu = document.querySelector(".menu");
const cover = document.querySelector(".cover");
const resumeListItems = document.querySelectorAll(".resume-list__item");
const portfolioListItems = document.querySelectorAll(".portfolio-list__item");

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
      document
        .querySelector(`.${listItemActiveClass}`)
        .classList.remove(listItemActiveClass);
      document
        .querySelector(`.${contentItemShowClass}`)
        .classList.remove(contentItemShowClass);
      listItem.classList.add(listItemActiveClass);
      let contentId = listItem.getAttribute("data-content-id");
      document.querySelector(contentId).classList.add(contentItemShowClass);
    });
  });
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
