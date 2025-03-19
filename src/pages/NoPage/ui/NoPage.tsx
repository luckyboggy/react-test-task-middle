import React, { FC } from "react";
import cls from "./NoPage.module.scss";

const NoPage: FC = () => {
  return <div className={cls.noPage}>Страница не найдена</div>;
};

export default NoPage;
