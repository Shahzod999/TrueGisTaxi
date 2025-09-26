import { Link, useLocation } from "react-router-dom";
import "./tabBar.scss";
import SVG from "react-inlinesvg";

const TabBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="tab-bar">
      <Link to="/" className={`tab-bar__item ${pathname === "/" ? "tab-bar__item__active" : ""}`}>
        <SVG src="/svg/home.svg" />
        <span>Главная</span>
      </Link>

      <Link to="/orders" className={`tab-bar__item ${pathname.startsWith("/orders") ? "tab-bar__item__active" : ""}`}>
        <SVG src="/svg/search.svg" />
        <span>Мои заказы</span>
      </Link>
    </div>
  );
};

export default TabBar;
