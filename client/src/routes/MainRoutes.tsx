import { Outlet } from "react-router-dom";
import useTelegramBackButton from "../hooks/useTelegramBackButton";

const MainRoutes = () => {
  useTelegramBackButton();

  return (
    <div className="main__content">
      <Outlet />
    </div>
  );
};

export default MainRoutes;
