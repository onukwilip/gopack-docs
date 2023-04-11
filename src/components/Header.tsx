import { useState } from "react";
import css from "../styles/Header.module.scss";
import logo from "../assets/images/gopack_logo_new.png";
import { Input, Icon, Checkbox } from "semantic-ui-react";
import { NavClass, searchFunction } from "../utils/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SelectorType } from "../utils/types";
import {
  displayActions,
  responsiveActions,
  searchActions,
} from "../store/store";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";

const domain = "https://gopack.vercel.app";

export const nav = [
  new NavClass("Home", domain),
  new NavClass("Docs", "/docs"),
  new NavClass("Issues", "https://github.com/onukwilip/gopack/issues"),
];

export const social = [
  new NavClass(
    "Linkedin",
    "https://www.linkedin.com/company/goit-gopack/",
    "linkedin"
  ),
  new NavClass("GitHub", "https://www.github.com/onukwilip/gopack/", "github"),
  new NavClass(
    "Product Hunt",
    "https://www.producthunt.com/products/gopack",
    "product hunt"
  ),
];

const ToogleDisplay = () => {
  const dispatch = useDispatch();

  const toogle = () => {
    dispatch(displayActions.toogle());
  };

  return (
    <div className={css["display-toogle"]}>
      <i className="fa-solid fa-sun"></i>
      <Checkbox slider onChange={toogle} />
      <i className="fa-regular fa-moon"></i>
    </div>
  );
};

const MobileMenu = () => {
  const dispatch = useDispatch();
  const toogleMenu = () => {
    dispatch(responsiveActions.toogle());
  };
  const variants = {
    initial: {
      x: "-100px",
      opacity: 0.8,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-1000px",
      opacity: 0.5,
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={css["mobile-menu"]}
    >
      <Menu height="100vh" />
      <i
        className={`fa-solid fa-circle-xmark ${css.cancel}`}
        onClick={toogleMenu as any}
      ></i>
    </motion.div>
  );
};

const Header = () => {
  const [searchTimeout, setSearchTimeout] = useState<any>();
  const showMenu = useSelector(
    (state: SelectorType) => state?.responsive?.showMenu
  );

  const onSearch = (e: any) => {
    const value = e?.target?.value;
    dispatch(searchActions.searchHandler(value));
    searchFunction({ searchWord: value, searchTimeout, setSearchTimeout });
  };
  const displayState = useSelector(
    (state: SelectorType) => state?.display?.display
  );

  const dispatch = useDispatch();
  const toogleMenu = () => {
    dispatch(responsiveActions.toogle());
  };

  return (
    <>
      <AnimatePresence>{showMenu && <MobileMenu />}</AnimatePresence>

      <header
        className={`${css.header} ${displayState === "dark" ? "dark" : null}`}
      >
        <a href={domain} className={css["logo-container"]}>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <h1>GOPack</h1>
          </div>
        </a>
        <div className={css.other}>
          <div className={css["search-container"]}>
            <Input
              icon="search"
              onChange={onSearch}
              onKeyDown={onSearch}
              placeholder="Search"
              id="searchInput"
            />
          </div>
          <nav>
            {nav.map((eachMenu, i) => (
              <Link to={eachMenu?.link} key={i}>
                {eachMenu?.name}
              </Link>
            ))}
          </nav>
          <div className={css.social}>
            {social.map((eachMenu, i) => (
              <Link to={eachMenu?.link} key={i}>
                <Icon name={eachMenu?.icon as any} />
              </Link>
            ))}
          </div>
        </div>
        <ToogleDisplay />
        <div className={css.hamburger} onClick={toogleMenu}>
          <i className="fa-solid fa-bars-progress"></i>
        </div>
      </header>
    </>
  );
};

export default Header;
