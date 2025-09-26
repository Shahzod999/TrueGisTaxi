import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { hapticVibration } from "../../../utils/hapticFeedback";
import "./SideMenu.scss";
import { ReactSVG } from "react-svg";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  // Обрабатываем нажатие клавиши Escape для закрытия меню
  useEffect(() => {
    // Блокировка прокрутки основного контента при открытом меню
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Обработчик клика по ссылке
  const handleLinkClick = () => {
    hapticVibration("medium");
    onClose();
  };

  // Формируем классы для меню и оверлея в зависимости от состояния
  const menuClasses = `side-menu__panel ${
    isOpen ? "side-menu__panel--open" : ""
  }`;
  const overlayClasses = `side-menu__overlay ${
    isOpen ? "side-menu__overlay--open" : ""
  }`;

  return (
    <div className="side-menu ">
      {/* Затемнение за меню */}
      <div className={overlayClasses} onClick={onClose} aria-hidden="true" />

      {/* Панель меню */}
      <div className={`${menuClasses} container`}>
        <div className="side-menu__header">
          <h2 className="side-menu__title">OKA</h2>
          <button className="side-menu__close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <nav className="side-menu__nav">
          <ul className="side-menu__list">
            <li className="side-menu__item">
              <Link
                to="/"
                className="side-menu__link"
                onClick={handleLinkClick}>
                <ReactSVG src="/public/svg/home.svg" /> <span>Главная</span>
              </Link>
            </li>
            <li className="side-menu__item">
              <Link
                to="/admin"
                className="side-menu__link"
                onClick={handleLinkClick}>
                <ReactSVG src="/public/svg/admin.svg" />{" "}
                <span>Админ-панель</span>
              </Link>
            </li>
            <li className="side-menu__item">
              <Link
                to="/settings"
                className="side-menu__link"
                onClick={handleLinkClick}>
                <ReactSVG src="/public/svg/settings.svg" />{" "}
                <span>Настройки</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
