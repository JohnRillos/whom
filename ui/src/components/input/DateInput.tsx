import React, { ChangeEvent } from 'react';
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
      <div className='border-b-2 border-dotted border-neutral-500'>
        <input type='date'
          id={props.label}
          className={getValueStyle()}
          onChange={handleDateChange}
          pattern='\d{4}-\d{2}-\d{2}'
          value={fromInfoDate(props.value)}
          min={'0001-01-01'}
        />
      </div>
    );
  }

  function getValueStyle(): string {
    const opacity = !props.value ? 'opacity-50' : '';
    return `bg-transparent text-black dark:invert ${opacity}`
  }

  function fromInfoDate(infoDate: InfoDate | undefined): string | undefined {
    if (infoDate == undefined) {
      return '';
    }
    const { year, month, day } = infoDate.date;
    const yearString = `${year}`.padStart(4, '0');
    const monthString = `${month}`.padStart(2, '0');
    const dayString = `${day}`.padStart(2, '0');
    return `${yearString}-${monthString}-${dayString}`;
  }

  function toInfoDate(date: string | undefined): InfoDate | undefined {
    if (!date) {
      return undefined;
    }
    const [year, month, day] = date.split('-');
    return {
      date: {
        year: Number(year),
        month: Number(month),
        day: Number(day)
      }
    }
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    const dateString = event.target.value;
    props.onChange(toInfoDate(dateString));
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}

