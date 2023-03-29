import React from "react";
import Menu from "../components/Menu";
import css from "../styles/Docs.module.scss";

const Docs: React.FC = () => {
  return (
    <section className={css.docs}>
      <div className={css.left}>
        <Menu height="89vh" />
      </div>
      <div className={css.right}></div>
    </section>
  );
};

export default Docs;
