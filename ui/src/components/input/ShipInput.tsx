import React, { ChangeEvent } from 'react';
import { isValidPatp } from 'urbit-ob';

function renderLabel(label: string, val: string | null) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

export default function ShipInput(
  props: {
    label: string,
    value: string | null,
    onChange: (arg: string | null) => void
  }
): JSX.Element {
  const isValid = !props.value || isValidPatp(props.value);

  function renderValue() {
    const bg = isValid ? 'bg-transparent' : 'bg-red-500/10';
    const border = isValid ? 'border-neutral-500' : 'border-red-500';
    return (
      <input className={`px-1 flex-shrink w-full ${bg} border-b-2 border-dotted ${border}`}
        type='text'
        onChange={handleEvent}
        value={props.value || undefined}
        placeholder='~sampel-palnet'
      />
    );
  }

  function handleEvent(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      return props.onChange(null);
    }
    return props.onChange(event.target.value);
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}
