import React from "react";
import { useTranslation } from "react-i18next";
import "./OrderCard.scss";

export interface Order {
  id: string;
  orderNumber: string;
  from: string;
  to: string;
  price: number;
  date: string;
  status: "pending" | "confirmed" | "inProgress" | "completed" | "cancelled";
  driver?: {
    name: string;
    phone: string;
    rating: number;
  };
  car?: {
    model: string;
    color: string;
    plate: string;
  };
}

interface OrderCardProps {
  order: Order;
  onRepeatOrder?: (order: Order) => void;
  onCancelOrder?: (orderId: string) => void;
  onContactDriver?: (driver: Order["driver"]) => void;
  onRateOrder?: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onRepeatOrder,
  onCancelOrder,
  onContactDriver,
  onRateOrder
}) => {
  // Подавляем предупреждения о неиспользуемых переменных - они будут использоваться позже
  void onRepeatOrder;
  void onCancelOrder;
  void onContactDriver;
  void onRateOrder;
  const { t } = useTranslation();

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "var(--warning-color)";
      case "confirmed":
        return "var(--primary-color)";
      case "inProgress":
        return "var(--success-color)";
      case "completed":
        return "var(--hint-color)";
      case "cancelled":
        return "var(--destructive-color)";
      default:
        return "var(--hint-color)";
    }
  };

  return (
    <div className="order-card">
      <div className="order-card__header">
        <div className="order-card__number">
          {t("orders.orderNumber")} {order.orderNumber}
        </div>
        <div className="order-card__status" style={{ color: getStatusColor(order.status) }}>
          {t(`orders.status.${order.status}`)}
        </div>
      </div>

      <div className="order-card__route">
        <div className="order-card__route-item">
          <div className="order-card__route-label">{t("orders.from")}</div>
          <div className="order-card__route-address">{order.from}</div>
        </div>
        <div className="order-card__route-separator">→</div>
        <div className="order-card__route-item">
          <div className="order-card__route-label">{t("orders.to")}</div>
          <div className="order-card__route-address">{order.to}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
