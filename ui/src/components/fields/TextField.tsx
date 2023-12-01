import React from 'react';

function renderLabel(label: string, val: string) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

function renderValue(value: string) {
  return <p className='max-w-xs break-words max-h-20 overflow-y-auto'>{value}</p>;
}

export default function TextField(
  props: {label: string, value: string}
): JSX.Element {
  const value = props.value;
  return (
    <div className='flex flex-row text-left'>
      {renderLabel(props.label, value)}
      {renderValue(value)}
    </div>
  );
}
