import React, { FC } from "react";
import cls from "./Footer.module.scss";

const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={cls.footer}>
      <div className={cls.wrapper}>
        <div className={cls.copyright}>© {year} luckyboggy</div>
      </div>
    </footer>
  );
};
export default Footer;
