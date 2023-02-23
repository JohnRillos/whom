import React from 'react';

const icon = (
  <svg width="24" height="24" viewBox="0 20 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 95
        C44.0905 95 38.2389 93.836 32.7792 91.5746
        C27.3196 89.3131 22.3588 85.9984 18.1802 81.8198
        C14.0016 77.6412 10.6869 72.6804 8.42542 67.2208
        C6.16396 61.7611 5 55.9095 5 50"
      stroke="currentColor"
      strokeWidth="10">
    </path>
    <path
      d="M30.5546 65.9099
        L28.7868 67.6777
        L32.3223 71.2132
        L34.0901 69.4454
        L30.5546 65.9099
        Z
        M67.6777 32.3223
        L39.7938 39.7938
        L60.2062 60.2062
        L67.6777 32.3223
        Z
        M34.0901 69.4454
        L53.5355 50
        L50 46.4645
        L30.5546 65.9099
        L34.0901 69.4454
        Z"
      fill="currentColor">
    </path>
  </svg>
);

export default function TargetButton(props: { onClick: () => void, disabled: boolean }) {
  const colorClass = props.disabled ? 'opacity-40' : 'hover:text-blue-500';
  return (
    <button onClick={props.onClick} title={'Pal request sent'} disabled={props.disabled}>
      <div className={colorClass}>
        {icon}
      </div>
    </button>
  );
}
