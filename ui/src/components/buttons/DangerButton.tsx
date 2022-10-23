import React from "react";

export default function DangerButton(
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
    return 'hover:bg-red-500 hover:border-red-500 hover:text-white';
  }

  return (
    <button
      className={`px-1 py-0.5 rounded-md button-secondary ${buttonColorClassName()} ${props.className || ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
