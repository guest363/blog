import React from "react";
import { useMount } from "react-use";

const hideDOM = (elem: string, action = true) => {
  const domElement = document.getElementById(elem);
  const cssClass = "sub-menu--display";
  action
    ? domElement?.classList.remove(cssClass)
    : domElement?.classList.add(cssClass);
};
const unselectDOM = (elem: string, action = true) => {
  const domElement = document.getElementById(elem);
  const cssClass = "is--selected";
  action
    ? domElement?.classList.remove(cssClass)
    : domElement?.classList.add(cssClass);
};
const SUB_CSS = "sub-menu--";
const LINK_CSS = "menu--list--link--";

export const NavComponent = ({
  categories,
  postsByCategory,
}: { categories: Set<string>; postsByCategory: Map<string, string[]> }) => {
  console.log(postsByCategory);
  const [openCategory, setOpenCategory] = React.useState(
    `${SUB_CSS}Разработка`,
  );
  const [selectedMenu, setSelectedMenu] = React.useState(
    `${LINK_CSS}Разработка`,
  );

  const categoryFromLocalStorage = localStorage.getItem("category");

  const changeCategory = (category: string) => {
    localStorage.setItem("category", category);
    const idShowElem = `${SUB_CSS}${category}`;
    const idSelectedElem = `${LINK_CSS}${category}`;
    if (openCategory === idShowElem) return;

    hideDOM(idShowElem, false);
    unselectDOM(idSelectedElem, false);

    hideDOM(openCategory);
    unselectDOM(selectedMenu);

    setOpenCategory(idShowElem);
    setSelectedMenu(idSelectedElem);
  };

  useMount(() => {
    /* Если в localstore есть категория, то сделать ее активной */
    if (categoryFromLocalStorage) {
      changeCategory(categoryFromLocalStorage);
    }
  });

  return (
    <nav id="nav" className="layout--menu nav--hide">
      <div className="menu">
        <ul className="menu--list">
          <a className="menu--list--logo" href="{{ site.baseurl }}/" rel="home">
            <img
              className="logo"
              src="/assets/logo.gif"
              alt="Лиса спряталась и торчит один хвост"
              srcSet=""
            />
          </a>
          <div className="menu-separator" />
          {Array.from(categories).map((category) => (
            <li
              key={category}
              className={`menu--list--link ${category === "Разработка" ? "is--selected" : ""}`}
              id={`menu--list--link--${category}`}
            >
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" onClick={() => changeCategory(category)}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`sub-menu ${openCategory === `${SUB_CSS}Разработка` ? "sub-menu--display" : ""}`}
        id={`sub-menu--${openCategory}`}
      >
        <ul className="sub-menu--list">
          {Array.from(postsByCategory).map(([category, postsByTag]) => {
            console.log(category, postsByTag, Object.entries(postsByTag));
            return Object.entries(postsByTag).map(([tag, posts]) => {
              console.log(tag, posts);
              return (
                <>
                  {console.log(posts)}
                  <span class="sub-menu--list--header">{tag}</span>
                  {posts.map((post) => (
                    <li class="sub-menu--list--link">
                      <a href={post.id}>{post.data.title}</a>
                    </li>
                  ))}
                </>
              );
            });
          })}
        </ul>
      </div>
    </nav>
  );
};
