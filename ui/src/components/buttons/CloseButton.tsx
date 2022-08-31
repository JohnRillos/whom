import React from 'react';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CloseButton = (props: {onClick: () => void}) => {
  return (
    <button onClick={props.onClick} title='Close'>
      <div className='hover:text-blue-500 -mt-1'>
        {icon}
      </div>
    </button>
  );
};

export default CloseButton;