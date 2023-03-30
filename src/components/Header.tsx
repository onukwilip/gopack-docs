import { useRef } from "react";
import css from "../styles/Header.module.scss";
import logo from "../assets/images/gopack_logo2.png";
import { Input, Icon, Checkbox } from "semantic-ui-react";
import { NavClass } from "../utils/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SelectorType } from "../utils/types";
import { displayActions } from "../store/store";

const nav = [
  new NavClass("Home", "/"),
  new NavClass("Docs", "/docs"),
  new NavClass("Issues", "/issues"),
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

const Header = ({ setSearchWord }: { setSearchWord: Function }) => {
  const onSearch = (e: any) => {
    setSearchWord(e?.target?.value);
  };
  const displayState = useSelector(
    (state: SelectorType) => state?.display?.display
  );

  return (
    <header
      className={`${css.header} ${displayState === "dark" ? "dark" : null}`}
    >
      <div className={css["logo-container"]}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <h1>GOPack</h1>
        </div>
      </div>
      <div className={css.other}>
        <div className={css["search-container"]}>
          <Input icon="search" onChange={onSearch} placeholder="Search" />
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
      <div className={css.hamburger}>
        <i className="fa-solid fa-bars-progress"></i>
      </div>
    </header>
  );
};

export default Header;
