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
    { id: "samarqand", name: "Самарқанд", image: "/uz/samarqand.jpg" },
    { id: "buhoro", name: "Бухоро", image: "/uz/buhoro.jpg" },
    { id: "andijon", name: "Андижон", image: "/uz/andijon.jpg" },
    { id: "fargona", name: "Фарғона", image: "/uz/fargona.jpg" },
    { id: "namangan", name: "Наманган", image: "/uz/namangan.jpg" },
    { id: "qashqadaryo", name: "Қашқадарё", image: "/uz/qashqadaryo.jpg" },
    { id: "surhandaryo", name: "Сурхондарё", image: "/uz/surhandaryo.png" },
    { id: "jizzah", name: "Жиззах", image: "/uz/jizzah.jpg" },
    { id: "sirdaryo", name: "Сирдарё", image: "/uz/sirdaryo.jpg" },
    { id: "navoiy", name: "Навоий", image: "/uz/navoiy.jpg" },
    { id: "xorazm", name: "Хоразм", image: "/uz/xorazm.jpg" },
    { id: "qoraqolpogiston", name: "Қорақалпоғистон", image: "/uz/Qoraqolpoaiston.jpg" },
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
