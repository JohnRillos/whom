import React from 'react';

function renderLabel(label: string, val: string | null) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

function renderValue(value: string | null) {
  if (value == null) {
    return '______________';
  }
  return <p className='max-w-xs break-words max-h-16 overflow-y-auto'>{value}</p>;
}

export default function TextField(
  props: {label: string, value: string | null | undefined}
): JSX.Element {
  const value = props.value || null;
  return (
    <div className='flex flex-row text-left'>
      {renderLabel(props.label, value)}
      {renderValue(value)}
    </div>
  );
}
