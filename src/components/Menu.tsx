import React, { useState } from "react";
import css from "../styles/Menu.module.scss";
import { Input, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { NavClass } from "../utils/utils";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ toogleMenu }: { toogleMenu: Function }) => {
  const variants = {
    initial: {
      // opacity: 0.5,
      x: -100,
    },
    animate: {
      // opacity: 1,
      x: 0,
    },
    exit: {
      // opacity: 0,
      x: -1000,
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={css["mobile-menu"]}
      data-testid="mobileMenu"
    >
      <div
        className={css["search-container"]}
        data-testid="mobileSearchContainer"
      >
        <Input
          className={css.search}
          action={{
            color: "blue",
            icon: "search",
          }}
          placeholder="Search for anything"
        />

        <div
          className={css["icon-container"]}
          onClick={(e) => toogleMenu((prev: any) => !prev)}
          data-testid="hideMenu"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div
        className={css["profile-container"]}
        data-testid="mobileProfileContainer"
      >
        <div className={css.profile}>
          <img
            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="profile pic"
          />
          <em>Prince Onukwili</em>
          <Icon name="caret down" />
        </div>
        <a href="#">Docs</a>
        <Icon name="bell outline" />
      </div>
      <Menu data-testid="menu" />
    </motion.div>
  );
};

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
    <NavLink
      to={menu?.link}
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
            {menu?.subMenu?.map((eachMenu) => (
              <EachMenu menu={eachMenu} indent={indent + 1} />
            ))}
          </div>
        </>
      ) : (
        <div className={css.single}>
          <i className={menu?.icon || "fas fa-circle-dot"}></i>
          <em>{menu?.name}</em>
        </div>
      )}
    </NavLink>
  );
};

const Menu = ({ height }: { height?: string }) => {
  return (
    <>
      <section
        className={css.menu}
        data-testid="menu"
        style={height ? { height: height } : {}}
      >
        {menus?.map((eachMenu) => (
          <EachMenu menu={eachMenu} indent={0} />
        ))}
      </section>
    </>
  );
};

export default Menu;
