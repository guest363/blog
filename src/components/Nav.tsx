import React from "react";
import type { PostsData } from "./Nav.astro";

export const NavComponent = ({
  categories,
  postsByCategory,
}: { categories: Set<string>; postsByCategory: Map<string, PostsData> }) => {
  const [openCategory, setOpenCategory] = React.useState(
    typeof localStorage !== "undefined" ? localStorage.getItem("category") : "",
  );

  const changeCategory = (category: string) => {
    localStorage.setItem("category", category);
    setOpenCategory(category);
  };

  return (
    <nav id="nav" className="layout--menu nav--hide">
      <div className="menu">
        <ul className="menu--list">
          <a className="menu--list--logo" href="/" rel="home">
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
              className={`menu--list--link ${category === openCategory ? "is--selected" : ""}`}
              id={`menu--list--link--${category}`}
            >
              <button type="button" onClick={() => changeCategory(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sub-menu">
        <ul className="sub-menu--list">
          {Array.from(postsByCategory)
            .filter(([category]) => category === openCategory)
            .map(([category, postsByTag]) => {
              return Object.entries(postsByTag).map(([tag, posts]) => {
                return (
                  <React.Fragment key={tag}>
                    <span className="sub-menu--list--header">{tag}</span>
                    {posts.map((post) => (
                      <li
                        key={post.data.title}
                        className="sub-menu--list--link"
                      >
                        <a href={post.id}>{post.data.title}</a>
                      </li>
                    ))}
                  </React.Fragment>
                );
              });
            })}
        </ul>
      </div>
    </nav>
  );
};
