import React from "react";

export default function SubmitButton(
  props: {
    className?: string,
    children: string,
    onClick: () => void,
    disabled: boolean
  }
) {
  
  function buttonColorClassName(): string {
    if (props.disabled) {
      return 'opacity-50';
    }
    return 'hover:bg-blue-500 hover:border-blue-500';
  }

  return (
    <button
      type='submit'
      className={`px-1 py-0.5 rounded-md button-primary ${buttonColorClassName()} ${props.className || ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
