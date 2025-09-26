import React, { useState, useRef, useEffect } from "react";
import "./DropDownMenu.scss";

interface DropDownMenuProps {
  toggle: React.ReactNode;
  menu: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  disabled?: boolean;
  className?: string;
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  closeOnSelect?: boolean;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  toggle,
  menu,
  isOpen: controlledIsOpen,
  onToggle,
  disabled = false,
  className = "",
  placement = "bottom-left",
  closeOnSelect = true,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Используем внешнее состояние, если оно передано, иначе внутреннее
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (disabled) return;

    const newState = !isOpen;
    
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newState);
    }
    
    if (onToggle) {
      onToggle(newState);
    }
  };

   const handleClose = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    if (onToggle) {
      onToggle(false);
    }
  };

  // Закрытие при клике внутри меню (если включена опция closeOnSelect)
  useEffect(() => {
    const handleMenuClick = (event: MouseEvent) => {
      if (closeOnSelect && menuRef.current && menuRef.current.contains(event.target as Node)) {
        // Проверяем, что клик был по элементу меню, а не по самому контейнеру
        const target = event.target as HTMLElement;
        if (target.closest('[role="menuitem"], .city-selector__menu-item, [data-close-on-select]') || 
            target.classList.contains('city-selector__menu-item')) {
          handleClose();
        }
      }
    };

    if (isOpen && closeOnSelect) {
      document.addEventListener("click", handleMenuClick);
    }

    return () => {
      document.removeEventListener("click", handleMenuClick);
    };
  }, [isOpen, closeOnSelect]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${className} ${disabled ? "dropdown--disabled" : ""}`}
    >
      <div
        ref={toggleRef}
        className={`dropdown__toggle ${isOpen ? "dropdown__toggle--open" : ""}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        {toggle}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`dropdown__menu dropdown__menu--${placement}`}
          role="menu"
          aria-orientation="vertical"
        >
          {menu}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
