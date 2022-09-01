import React, { ChangeEvent } from 'react';

function renderLabel(label: string, val: string | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

export default function ShipInput(
  props: {
    label: string,
    value: string | undefined,
    onChange: (arg: string) => void
  }
): JSX.Element {
  function renderValue() {
    return (
      <input className='flex-shrink w-full bg-transparent border-b-2 border-dotted border-neutral-500 bg-standard'
        type='text'
        onChange={handleEvent}
        value={props.value}/>
    );
  }

  function handleEvent(event: ChangeEvent<HTMLInputElement>) {
    return props.onChange(event.target.value);
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}
