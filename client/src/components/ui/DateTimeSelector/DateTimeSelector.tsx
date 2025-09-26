import React from 'react';
import { useTranslation } from 'react-i18next';
import './DateTimeSelector.scss';

interface DateTimeSelectorProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange
}) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'short',
      weekday: 'short'
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return timeString;
  };

  return (
    <div className="datetime-selector">
      <div className="datetime-selector__container">
        {/* Дата */}
        <div className="datetime-selector__item">
          <label className="datetime-selector__field">
            <div className="datetime-selector__label">
              {t('home.form.date')}
            </div>
            <div className="datetime-selector__value">
              {date ? formatDate(date) : 'Выберите дату'}
            </div>
            <input
              type="date"
              className="datetime-selector__input"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </label>
        </div>

        {/* Время */}
        <div className="datetime-selector__item">
          <label className="datetime-selector__field">
            <div className="datetime-selector__label">
              {t('home.form.time')}
            </div>
            <div className="datetime-selector__value">
              {time ? formatTime(time) : 'Выберите время'}
            </div>
            <input
              type="time"
              className="datetime-selector__input"
              value={time}
              onChange={(e) => onTimeChange(e.target.value)}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
