import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import Loading from "../components/common/Loading/Loading";
import HomePage from "../pages/Home/HomePage";
import Settings from "../pages/Settings/Settings";
import OrdersPage from "../pages/Orders/OrdersPage";
// Функция проверки авторизации

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainRoutes />}>
            <Route index element={<HomePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
