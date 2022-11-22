import React, { ChangeEvent } from 'react';

function renderLabel(label: string, val: string | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

export default function SelectInput(
  props: {
    label: string,
    value: string | undefined,
    options: { value: string, display: string }[],
    onChange: (arg: string) => void,
    disabled?: boolean
  }
): JSX.Element {
  function renderValue() {
    return (
      <select className='bg-transparent border-b-2 border-dotted border-neutral-500 bg-standard'
        onChange={handleEvent}
        value={props.value}
        disabled={props.disabled}>
          {props.options.map(opt => 
            <option key={opt.value} value={opt.value}>{opt.display}</option>
          )}
      </select>
    );
  }

  function handleEvent(event: ChangeEvent<HTMLSelectElement>) {
    return props.onChange(event.target.value);
  }

  return (
    <div className='flex'>
      {props.label ? renderLabel(props.label, props.value) : null}
      {renderValue()}
    </div>
  );
}
