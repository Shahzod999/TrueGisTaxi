import "./search.scss";
import { useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";

interface City {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  region?: string;
}

const ClickMap = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [activeCities, setActiveCities] = useState<Set<string>>(new Set());
  const svgRef = useRef<HTMLDivElement>(null);

  // Список городов Узбекистана с их координатами и описаниями
  const cities: City[] = [
    {
      id: "tashkent",
      name: "Ташкент",
      coordinates: { x: 400, y: 200 },
      region: "Ташкентская область",
    },
    {
      id: "samarkand",
      name: "Самарканд",
      coordinates: { x: 350, y: 250 },
      region: "Самаркандская область",
    },
    {
      id: "bukhara",
      name: "Бухара",
      coordinates: { x: 300, y: 280 },
      region: "Бухарская область",
    },
    {
      id: "andijan",
      name: "Андижан",
      coordinates: { x: 500, y: 300 },
      region: "Андижанская область",
    },
    {
      id: "namangan",
      name: "Наманган",
      coordinates: { x: 480, y: 280 },
      region: "Наманганская область",
    },
    {
      id: "fergana",
      name: "Фергана",
      coordinates: { x: 520, y: 320 },
      region: "Ферганская область",
    },
    {
      id: "qashqadaryo",
      name: "Кашкадарья",
      coordinates: { x: 250, y: 350 },
      region: "Хорезмская область",
    },
    {
      id: "qoraqalpoghiston",
      name: "Каракалпакстан",
      coordinates: { x: 200, y: 400 },
      region: "Республика Каракалпакстан",
    },
    {
      id: "navoi",
      name: "Навои",
      coordinates: { x: 320, y: 320 },
      region: "Навоийская область",
    },
    {
      id: "surxondaryo",
      name: "Сурхандарья",
      coordinates: { x: 350, y: 350 },
      region: "Кашкадарьинская область",
    },
    {
      id: "xorazm",
      name: "Хорезм",
      coordinates: { x: 380, y: 420 },
      region: "Сурхандарьинская область",
    },
    {
      id: "sirdaryo",
      name: "Сырдарья",
      coordinates: { x: 420, y: 250 },
      region: "Сырдарьинская область",
    },
    {
      id: "jizzakh",
      name: "Джизак",
      coordinates: { x: 380, y: 270 },
      region: "Джизакская область",
    },
  ];

  const handleCityClick = (cityId: string) => {
    const city = cities.find((c) => c.id === cityId);
    if (city) {
      setSelectedCity(city);

      // Добавляем визуальное выделение выбранного города
      setActiveCities(new Set([cityId])); // Заменяем на новый Set с одним городом
    }
  };

  const handleCityHover = (cityId: string) => {
    setHoveredCity(cityId);
  };

  const handleCityLeave = () => {
    setHoveredCity(null);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    // Если кликнули не по городу, сбрасываем выбор
    if (e.target === e.currentTarget) {
      setSelectedCity(null);
      setActiveCities(new Set());
    }
  };

  const handleCloseInfo = () => {
    setSelectedCity(null);
    setActiveCities(new Set());
  };

  // Функция для настройки SVG путей
  const setupSVGPaths = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current.querySelector("svg");
    if (!svgElement) return;

    const paths = svgElement.querySelectorAll("path");

    // Очищаем предыдущие обработчики
    paths.forEach((path) => {
      path.replaceWith(path.cloneNode(true));
    });

    // Получаем обновленные пути после клонирования
    const newPaths = svgElement.querySelectorAll("path");

    // Сопоставляем пути с городами по названию или другому критерию
    // Для правильной работы нужно либо иметь атрибуты в SVG, либо использовать другой способ сопоставления
    newPaths.forEach((path) => {
      // Проверяем, есть ли атрибут с ID города в SVG
      const cityId = path.getAttribute("data-city") || path.getAttribute("id");

      // Если нет атрибута, пытаемся сопоставить по индексу (не надежно)
      const city = cities.find((c) => c.id === cityId);

      if (city) {
        path.setAttribute("data-city-id", city.id);
        path.setAttribute("data-city-name", city.name);
        path.style.cursor = "pointer";
        path.style.transition = "all 0.3s ease";

        // Добавляем обработчики событий
        const handlePathMouseEnter = () => handleCityHover(city.id);
        const handlePathMouseLeave = () => handleCityLeave();
        const handlePathClick = (e: Event) => {
          e.stopPropagation();
          handleCityClick(city.id);
        };

        path.addEventListener("mouseenter", handlePathMouseEnter);
        path.addEventListener("mouseleave", handlePathMouseLeave);
        path.addEventListener("click", handlePathClick);

        // Сохраняем ссылки на обработчики для возможной очистки
        (path as any)._eventHandlers = {
          mouseenter: handlePathMouseEnter,
          mouseleave: handlePathMouseLeave,
          click: handlePathClick,
        };
      }
    });
  };

  // Обновляем стили активных городов
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path[data-city-id]");
      paths.forEach((path: Element) => {
        const cityId = path.getAttribute("data-city-id");
        if (cityId) {
          if (activeCities.has(cityId)) {
            path.classList.add("active");
          } else {
            path.classList.remove("active");
          }
        }
      });
    }
  }, [activeCities]);

  // Добавляем обработчик для загрузки SVG
  const handleSVGLoad = () => {
    // Небольшая задержка для обеспечения полной загрузки SVG
    setTimeout(setupSVGPaths, 100);
  };

  return (
    <div className="search container">
      <div className="map-container" onClick={handleMapClick}>
        <div ref={svgRef}>
          <SVG src="/svg/uz.svg" className="uzbekistan-map" onLoad={handleSVGLoad} />
        </div>

        {/* Информационная панель */}
        {selectedCity && (
          <div className="city-info-panel">
            <h3>{selectedCity.name}</h3>
            <button className="close-btn" onClick={handleCloseInfo}>
              <SVG src="/svg/cross.svg" className="close-btn-icon" />
            </button>
          </div>
        )}

        {/* Подсказка при наведении */}
        {hoveredCity && (
          <div
            className="city-tooltip"
            style={{
              left: cities.find((c) => c.id === hoveredCity)?.coordinates.x + "px",
              top: cities.find((c) => c.id === hoveredCity)?.coordinates.y + "px",
            }}
          >
            {cities.find((c) => c.id === hoveredCity)?.name}
          </div>
        )}
      </div>

      {/* Список городов */}
      <div className="cities-list">
        <div className="cities-grid">
          {cities.map((city) => (
            <div key={city.id} className={`city-item ${selectedCity?.id === city.id ? "selected" : ""}`} onClick={() => handleCityClick(city.id)}>
              <span className="city-name">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClickMap;
