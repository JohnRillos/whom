import React from "react";

export default function Toggle(
  props: {
    label: string,
    checked: boolean,
    onChange: () => void,
    disabled?: boolean
  }
) {
  return (
    <div className='flex flex-row p-1'>
      <span className={`mr-2 ${props.disabled ? 'opacity-50' : ''}`}>{props.label}</span>
      <input className='ml-auto mr-1'
        type='checkbox'
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
}
