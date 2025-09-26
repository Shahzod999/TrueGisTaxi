import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SwipeableItem from "../../components/common/SwipeableItem/SwipeableItem";
import OrderCard, { Order } from "../../components/ui/OrderCard";
import "./OrdersPage.scss";

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "12345",
      from: "Ташкент",
      to: "Андижан",
      price: 150000,
      date: "2024-01-15 14:30",
      status: "completed",
      driver: {
        name: "Шоха",
        phone: "+998901234568",
        rating: 4.8,
      },
      car: {
        model: "Hyundai Elantra",
        color: "Черный",
        plate: "01A123BC",
      },
    },
  ]);

  const handleRepeatOrder = (order: Order) => {
    console.log("Повторить заказ:", order);
  };

  const handleCancelOrder = (orderId: string) => {
    console.log("Отменить заказ:", orderId);
  };

  const handleContactDriver = (driver: Order["driver"]) => {
    if (driver?.phone) {
      window.open(`tel:${driver.phone}`);
    }
  };

  const handleRateOrder = (order: Order) => {
    console.log("Оценить заказ:", order);
  };

  return (
    <div className="orders-page container">
      <div className="orders-page__header">
        <h1 className="orders-page__title">{t("orders.title")}</h1>
      </div>

      <div className="orders-page__content">
        {orders.length === 0 ? (
          <div className="orders-page__empty">
            <div className="orders-page__empty-icon">🚗</div>
            <p className="orders-page__empty-text">{t("orders.noOrders")}</p>
          </div>
        ) : (
          <div className="orders-page__list">
            {orders.map((order) => (
              <SwipeableItem key={order.id} onEdit={() => handleRepeatOrder(order)} onDelete={() => handleCancelOrder(order.id)}>
                <OrderCard
                  order={order}
                  onRepeatOrder={handleRepeatOrder}
                  onCancelOrder={handleCancelOrder}
                  onContactDriver={handleContactDriver}
                  onRateOrder={handleRateOrder}
                />
              </SwipeableItem>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
