import React, { useState } from "react";
import css from "../styles/Menu.module.scss";
import { Input, Icon, Form } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { NavClass } from "../utils/utils";
import { nav, social } from "./Header";

const menus = [
  new NavClass("Introduction", "#introduction", "info icon"),
  new NavClass("Installation", "#installation", "fas fa-download"),
  new NavClass("Usage", "#usage", "fa-solid fa-screwdriver-wrench", [
    new NavClass("Initialization", "#initialization", undefined),
    new NavClass("Start", "#start", undefined),
    new NavClass("Serve", "#serve", undefined),
    new NavClass("Build", "#build", undefined),
    new NavClass("GOPack config", "#gopackconfig", "fas fa-gears", [
      new NavClass("generateCSSFiles", "#generatecssfiles", undefined),
      new NavClass("devtool", "#devtool", undefined),
      new NavClass("useCoreJs", "#usecorejs", undefined),
      new NavClass("entry", "#entry", undefined),
      new NavClass("outputFilenameFormat", "#outputfilenameformat", undefined),
      new NavClass("outputFilename", "#outputfilename", undefined),
      new NavClass("outputFolder", "#outputfolder", undefined),
      new NavClass("pages", "#pages", undefined),
      new NavClass("assetsFolder", "#assetsfolder", undefined),
    ]),
  ]),
  new NavClass("Libraries", "#libraries", "fas fa-book", [
    new NavClass("React", "#react", undefined),
    new NavClass("Typescript", "#typescript", undefined),
    new NavClass("SASS", "#sass", undefined),
  ]),
];

const EachMenu = ({ menu, indent }: { menu: NavClass; indent: number }) => {
  return (
    <a
      href={menu?.link}
      className={css["each-menu"]}
      style={{ marginLeft: `${indent * 12}px` }}
    >
      {menu?.subMenu ? (
        <>
          <div className={css["sub-menu-parent"]}>
            <i className={menu?.icon || "fas fa-circle-dot"}></i>
            <em>{menu?.name}</em>
            <i className={`fa-solid fa-angle-down ${css.caret}`}></i>
          </div>
          <div className={css["sub-menu"]}>
            {menu?.subMenu?.map((eachMenu, i) => (
              <EachMenu menu={eachMenu} key={i} indent={indent + 1} />
            ))}
          </div>
        </>
      ) : (
        <div className={css.single}>
          <i className={menu?.icon || "fas fa-circle-dot"}></i>
          <em>{menu?.name}</em>
        </div>
      )}
    </a>
  );
};

const Menu = ({
  setSearchWord,
  height,
}: {
  setSearchWord: Function;
  height?: string;
}) => {
  const onSearch = (e: any) => {
    setSearchWord(e?.target?.value);
  };

  return (
    <>
      <div
        className={`${css.menu}`}
        data-testid="menu"
        style={height ? { height: height } : {}}
      >
        <div className={css["mobile-view"]}>
          <div className={css["input-container"]}>
            <div className={css.input}>
              <Input icon="search" onChange={onSearch} placeholder="Search" />
            </div>
            <i
              className={`fa-solid fa-magnifying-glass ${css["search-icon"]}`}
            ></i>
          </div>
          <div className={css.social}>
            {social.map((eachMenu, i) => (
              <Link to={eachMenu?.link} key={i}>
                <Icon name={eachMenu?.icon as any} />
              </Link>
            ))}
          </div>
          <nav>
            {nav.map((eachMenu, i) => (
              <Link to={eachMenu?.link} key={i}>
                {eachMenu?.name}
              </Link>
            ))}
            <i className="fa-solid fa-bars"></i>
          </nav>
        </div>
        {menus?.map((eachMenu, i) => (
          <EachMenu menu={eachMenu} key={i} indent={0} />
        ))}
      </div>
    </>
  );
};

export default Menu;
