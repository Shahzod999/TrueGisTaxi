import React from "react";
import "./RegionsIcons.scss";

interface RegionIcon {
  id: string;
  name: string;
  image: string;
}

interface RegionsIconsProps {
  className?: string;
}

const RegionsIcons: React.FC<RegionsIconsProps> = ({ className = "" }) => {
  const regions: RegionIcon[] = [
    { id: "toshkent", name: "Тошкент", image: "/uz/toshkent.jpeg" },
    { id: "samarqand", name: "Самарқанд", image: "/uz/samarqand.jpeg" },
    { id: "buhoro", name: "Бухоро", image: "/uz/buhoro.jpeg" },
    { id: "andijon", name: "Андижон", image: "/uz/andijon.jpeg" },
    { id: "fargona", name: "Фарғона", image: "/uz/fargona.jpeg" },
    { id: "namangan", name: "Наманган", image: "/uz/namangan.jpeg" },
    { id: "qashqadaryo", name: "Қашқадарё", image: "/uz/qashqadaryo.jpeg" },
    { id: "surhandaryo", name: "Сурхондарё", image: "/uz/surhandaryo.jpeg" },
    { id: "jizzah", name: "Жиззах", image: "/uz/jizzah.jpeg" },
    { id: "sirdaryo", name: "Сирдарё", image: "/uz/sirdaryo.jpeg" },
    { id: "navoiy", name: "Навоий", image: "/uz/navoiy.jpeg" },
    { id: "xorazm", name: "Хоразм", image: "/uz/xorazm.jpeg" },
    { id: "qoraqolpogiston", name: "Қорақалпоғистон", image: "/uz/Qoraqolpoaiston.jpeg" },
  ];

  // Массивы для коллажного эффекта
  const rotations = [-3, 2, -1, 4, -2, 1, -4, 3, -1, 2, -3, 1, 2];
  const verticalOffsets = [0, -4, 2, -2, 3, -1, 4, -3, 1, -2, 2, -4, 1]; // в пикселях

  return (
    <div className={`regions-icons ${className}`}>
      <div className="regions-icons__container">
        {regions.map((region, index) => (
          <div
            key={region.id}
            className="regions-icons__item"
            style={{ 
              animationDelay: `${index * 0.15}s`,
              '--rotation': `${rotations[index]}deg`,
              transform: `translateY(${verticalOffsets[index]}px)`,
              zIndex: index % 3 + 1 // Разные слои для глубины
            } as React.CSSProperties}
            title={region.name}
          >
            <img
              src={region.image}
              alt={region.name}
              className="regions-icons__image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionsIcons;
