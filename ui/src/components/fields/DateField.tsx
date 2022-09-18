import moment from 'moment';
import React from 'react';
import { InfoDate } from '../../types/ContactTypes';

function renderLabel(label: string, val: InfoDate | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

function renderValue(value: InfoDate | undefined) {
  if (value == undefined) {
    return '______________';
  }
  const { date } = value;
  const dateMoment = moment(`${date.year}-${date.month}-${date.day}`, 'yyyy-MM-DD');
  return (
    <p>
      {dateMoment.format('l')}
    </p>
  );
}

export default function DateField(
  props: {label: string, value: InfoDate | undefined}
): JSX.Element {
  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue(props.value)}
    </div>
  );
}
