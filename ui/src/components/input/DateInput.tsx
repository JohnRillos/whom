import React from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { InfoDate } from '../../types/ContactTypes';
import './styles/Calendar.css';
import './styles/DatePicker.css'

function renderLabel(label: string, val: InfoDate | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

export default function DateInput(
  props: {
    label: string,
    value: InfoDate | undefined,
    onChange: (arg: InfoDate | undefined) => void
  }
): JSX.Element {
  function renderValue() {
    return (
      <DatePicker
        className='stroke-black dark:stroke-light bg-standard'
        calendarClassName='bg-standard border-inset border-2 border-black dark:border-light shadow-lg'
        formatMonth={formatCalendarMonth}
        onChange={handleDateChange}
        value={fromInfoDate(props.value)}
        format='y/M/d'
        yearPlaceholder='yyyy'
        monthPlaceholder='mm'
        dayPlaceholder='dd'
        maxDate={new Date()}
      />
    );
  }

  function formatCalendarMonth(locale: string, date: Date): string {
    return date.toLocaleDateString(locale, { month: 'short' })
  }

  function fromInfoDate(infoDate: InfoDate | undefined): Date | undefined {
    if (infoDate == undefined) {
      return undefined;
    }
    const { year, month, day } = infoDate.date;
    const date = new Date(year, month - 1, day);
    if (year < 100) {
      date.setFullYear(year);
    }
    return date;
  }

  function toInfoDate(date: Date | undefined): InfoDate | undefined {
    if (date == undefined) {
      return undefined;
    }
    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    }
  }

  function handleDateChange(value: Date | undefined) {
    console.log('handleDateChange.value', value);
    console.log('transformed: ', toInfoDate(value))
    props.onChange(toInfoDate(value));
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}

