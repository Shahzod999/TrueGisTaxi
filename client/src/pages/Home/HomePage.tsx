import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button/Button";
import CitySelector from "../../components/ui/CitySelector";
import DateTimeSelector from "../../components/ui/DateTimeSelector";
import RegionsIcons from "../../components/ui/RegionsIcons";
import "./HomePage.scss";
import { succesToast } from "../../store/slices/Toast/toastSlice";
import { useAppDispatch } from "../../hooks/redux";

interface OrderForm {
  from: string;
  to: string;
  passengers: number;
  hasCargo: boolean;
  cargoDescription: string;
  phone: string;
  date: string;
  time: string;
}

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<OrderForm>({
    from: "",
    to: "",
    passengers: 1,
    hasCargo: false,
    cargoDescription: "",
    phone: "",
    date: "",
    time: "",
  });

  const popularCities = ["Ташкент", "Самарканд", "Бухара", "Андижан", "Наманган", "Фергана", "Нукус", "Термез", "Карши", "Навои"];

  const handleInputChange = (field: keyof OrderForm, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    dispatch(succesToast("Заказ успешно отправлен"));
    // Здесь будет отправка заказа
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.startsWith("998")) {
      const formatted = numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
      return formatted;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleInputChange("phone", formatted);
  };

  return (
    <div className="home-page container ">
      <div className="home-page__header">
        <RegionsIcons />

        <div className="home-page__header-logo">
          <img src="./logo.png" alt="TrueGis-Taxi" />
          <h1 className="home-page__title">TrueGis-Taxi</h1>
        </div>
      </div>

      <form className="home-page__form" onSubmit={handleSubmit}>
        {/* Выбор городов */}
        <div className="form-group">
          <CitySelector
            fromCity={formData.from}
            toCity={formData.to}
            onFromChange={(city) => handleInputChange("from", city)}
            onToChange={(city) => handleInputChange("to", city)}
            cities={popularCities}
          />
        </div>

        {/* Дата и время */}
        <div className="form-group">
          <DateTimeSelector
            date={formData.date}
            time={formData.time}
            onDateChange={(date) => handleInputChange("date", date)}
            onTimeChange={(time) => handleInputChange("time", time)}
          />
        </div>

        {/* Количество пассажиров */}
        <div className="form-group">
          <label className="form-label">{t("home.form.passengers")}</label>
          <div className="passenger-selector">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                className={`passenger-btn ${formData.passengers === num ? "active" : ""}`}
                onClick={() => handleInputChange("passengers", num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Груз/посылка */}
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={formData.hasCargo} onChange={(e) => handleInputChange("hasCargo", e.target.checked)} />
            <span className="checkmark"></span>
            {t("home.form.cargo")}
          </label>
        </div>

        {formData.hasCargo && (
          <div className="form-group">
            <label className="form-label">{t("home.form.cargoDescription")}</label>
            <textarea
              className="form-textarea"
              placeholder={t("home.form.cargoPlaceholder")}
              value={formData.cargoDescription}
              onChange={(e) => handleInputChange("cargoDescription", e.target.value)}
              rows={3}
            />
          </div>
        )}

        {/* Телефон */}
        <div className="form-group">
          <label className="form-label">{t("home.form.phone")}</label>
          <input
            type="tel"
            inputMode="numeric"
            className="form-input"
            placeholder={t("home.form.phonePlaceholder")}
            value={formData.phone}
            onChange={handlePhoneChange}
            required
          />
        </div>

        {/* Кнопка заказа */}
        <Button type="submit" variant="primary" size="large" fullWidth className="order-button">
          {t("home.form.orderButton")}
        </Button>
      </form>

      {/* Как это работает */}
      <div className="home-page__info">
        <h3 className="info-title">{t("home.info.howItWorks")}</h3>
        <div className="info-steps">
          <div className="info-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>{t("home.info.step1")}</h4>
              <p>{t("home.info.step1Desc")}</p>
            </div>
          </div>
          <div className="info-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>{t("home.info.step2")}</h4>
              <p>{t("home.info.step2Desc")}</p>
            </div>
          </div>
          <div className="info-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>{t("home.info.step3")}</h4>
              <p>{t("home.info.step3Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
