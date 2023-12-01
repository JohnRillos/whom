import React from 'react';
import { CollItem, InfoColl } from '../../types/ContactTypes';

function renderLabel(label: string, val: CollItem[]) {
  const opacity = !val.length ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

function renderValue(value: CollItem[]) {
  const asText = value.map(item => item.ship + '/' + item.slug).join(', ');
  return <p className='max-w-xs break-words max-h-20 overflow-y-auto'>{asText}</p>;
}

export default function TextField(
  props: {label: string, value: InfoColl}
): JSX.Element {
  const value = props.value;
  return (
    <div className='flex flex-row text-left'>
      {renderLabel(props.label, value.coll)}
      {renderValue(value.coll)}
    </div>
  );
}
