import css from "../styles/Header.module.scss";
import logo from "../assets/images/gopack_logo2.png";
import { Input, Icon } from "semantic-ui-react";
import { NavClass } from "../utils/utils";
import { Link } from "react-router-dom";

const nav = [
  new NavClass("Home", "/"),
  new NavClass("Docs", "/docs"),
  new NavClass("Issues", "/issues"),
];

const social = [
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

const Header = () => {
  return (
    <header className={css.header}>
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
          <Input icon="search" placeholder="Search" />
        </div>
        <nav>
          {nav.map((eachMenu, i) => (
            <Link to={eachMenu?.link}>{eachMenu?.name}</Link>
          ))}
        </nav>
        <div className={css.social}>
          {social.map((eachMenu) => (
            <Link to={eachMenu?.link}>
              <Icon name={eachMenu?.icon as any} />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
