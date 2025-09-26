import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DropDownMenu from "../../common/DropDownMenu/DropDownMenu";
import "./CitySelector.scss";

interface CitySelectorProps {
  fromCity: string;
  toCity: string;
  onFromChange: (city: string) => void;
  onToChange: (city: string) => void;
  cities: string[];
  isLoading?: boolean;
}

const CitySelector: React.FC<CitySelectorProps> = ({ fromCity, toCity, onFromChange, onToChange, cities, isLoading = false }) => {
  const { t } = useTranslation();
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwapCities = async () => {
    if (fromCity && toCity && !isSwapping) {
      setIsSwapping(true);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Анимация смены
      onFromChange(toCity);
      onToChange(fromCity);
      setIsSwapping(false);
    }
  };

  const availableFromCities = cities;
  const availableToCities = cities.filter((city) => city !== fromCity);

  const renderCityToggle = (selectedCity: string, type: "from" | "to") => (
    <div
      className={`
      city-selector__field 
      ${selectedCity ? "city-selector__field--filled" : ""}
      ${isLoading ? "city-selector__field--loading" : ""}
    `}
    >
      <div className="city-selector__label">{type === "from" ? t("home.form.from") : t("home.form.to")}</div>
      <div className="city-selector__value">{selectedCity || t("home.form.select_city")}</div>
      <div className="city-selector__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );

  const renderCityMenu = (cities: string[], onSelect: (city: string) => void, selectedCity?: string) => (
    <div className="city-selector__menu">
      {cities.length === 0 ? (
        <div className="city-selector__empty">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9V3H4V5H9V7H11V9H13V7H15V9H21Z"
              fill="currentColor"
            />
            <path d="M21 16V14H19V12H17V14H15V16H17V18H19V16H21Z" fill="currentColor" />
            <path d="M9 21V19H7V17H5V19H3V21H5V23H7V21H9Z" fill="currentColor" />
          </svg>
          <div>{t("home.form.no_cities_available")}</div>
        </div>
      ) : (
        cities.map((city) => (
          <div
            key={city}
            className={`
              city-selector__menu-item
              ${selectedCity === city ? "city-selector__menu-item--selected" : ""}
            `}
            onClick={() => onSelect(city)}
          >
            <span className="city-name">{city}</span>
            {selectedCity === city && (
              <div className="city-selector__menu-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="city-selector">
      <div className="city-selector__container">
        {/* Откуда */}
        <div className="city-selector__item">
          <DropDownMenu key={1} toggle={renderCityToggle(fromCity, "from")} menu={renderCityMenu(availableFromCities, onFromChange, fromCity)} />
        </div>

        {/* Кнопка смены местами */}
        <button
          type="button"
          className={`
            city-selector__swap 
            ${isSwapping ? "city-selector__swap--swapping" : ""}
          `}
          onClick={handleSwapCities}
          disabled={!fromCity || !toCity || isLoading}
          aria-label={t("home.form.swap_cities")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Куда */}
        <div className="city-selector__item">
          <DropDownMenu key={2} toggle={renderCityToggle(toCity, "to")} menu={renderCityMenu(availableToCities, onToChange, toCity)} />
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
