import React from 'react';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
  </svg>
);

const ChevronButton = (props: { onClick: () => void, label: string }) => {
  return (
    <button
      className='flex flex-row items-center p-1 hover:transition-colors ease-out duration-300 hover:bg-sky-500/10 dark:hover:bg-gray-800'
      onClick={props.onClick}
    >
      <span className='mr-2'>{props.label}</span><div className='ml-auto'>{icon}</div>
    </button>
  );
};

export default ChevronButton;
