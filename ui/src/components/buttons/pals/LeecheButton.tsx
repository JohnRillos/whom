import React from 'react';

const icon = (
  <svg width="24" height="24" viewBox="12 10 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M95 50
        C95 55.9095 93.836 61.7611 91.5746 67.2208
        C89.3131  72.6804 85.9984 77.6412 81.8198 81.8198
        C77.6412 85.9984 72.6804 89.3131 67.2208 91.5746
        C61.7611 93.836 55.9095 95 50 95"
      stroke="currentColor"
      strokeWidth="10">
    </path>
    <path
      d="M67.2383 68.7383
        L59.7669 40.8545
        L39.3545 61.2669
        L67.2383 68.7383
        Z
        M31.5294 29.4939
        L29.7617 27.7262
        L26.2261 31.2617
        L27.9939 33.0295
        L31.5294 29.4939
        Z
        M53.0962 51.0607
        L31.5294 29.4939
        L27.9939 33.0295
        L49.5607 54.5962
        L53.0962 51.0607
        Z"
      fill="currentColor">
    </path>
  </svg>
);

export default function LeecheButton(props: { onClick: () => void, disabled: boolean }) {
  const colorClass = props.disabled ? 'opacity-40' : 'hover:text-blue-500';
  return (
    <button onClick={props.onClick} title={'Wants to be your pal'} disabled={props.disabled}>
      <div className={colorClass}>
        {icon}
      </div>
    </button>
  );
};
