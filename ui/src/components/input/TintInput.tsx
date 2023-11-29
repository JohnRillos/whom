import React, { ChangeEvent } from 'react';
import { InfoTint } from '../../types/ContactTypes';

function renderLabel(label: string, val: InfoTint | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

const HEX_PATTERN = /^[A-Fa-f0-9]{1,6}$/;

export default function TintInput(
  props: {
    label: string,
    value: InfoTint | undefined,
    onChange: (arg: string | undefined) => void
  }
): JSX.Element {
  const isValid = !props.value || HEX_PATTERN.test(props.value.tint);

  function renderValue() {
    const bg = isValid ? 'bg-transparent' : 'bg-red-500/10';
    const border = isValid ? 'border-neutral-500' : 'border-red-500';
    return (
      <input className={`px-1 flex-shrink w-full ${bg} border-b-2 border-dotted ${border}`}
        type='text'
        onChange={handleEvent}
        value={props.value?.tint || ''}
        pattern={HEX_PATTERN.source}
        title='color hex code'
      />
    );
  }

  function handleEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (!value || value.length == 0) {
      return props.onChange(undefined);
    }
    if (HEX_PATTERN.test(value)) {
      return props.onChange(value);
    }
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}
