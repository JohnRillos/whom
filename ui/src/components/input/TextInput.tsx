import React, { ChangeEvent } from 'react';

function renderLabel(label: string, val: string | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

export default function TextInput(
  props: {
    label: string,
    value: string | undefined,
    onChange: (arg: string) => void,
    pattern?: RegExp,
    placeholder?: string
  }
): JSX.Element {
  function renderValue() {
    return (
      <input className='px-1 flex-shrink w-full bg-transparent border-b-2 border-dotted border-neutral-500 bg-standard'
        type='text'
        onChange={handleEvent}
        value={props.value || ''}
        placeholder={props.placeholder}
      />
    );
  }

  function handleEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value && props.pattern) {
      if(!props.pattern.test(value)) {
        return;
      }
    }
    return props.onChange(value);
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}
