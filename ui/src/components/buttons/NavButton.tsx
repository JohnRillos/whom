import React from 'react';

const NavButton = (props: { onClick: () => void, children: JSX.Element | string }) => {
  return (
    <button
      className='flex flex-row hover:button-primary text-xl items-center border-none px-2 py-1 rounded-xl'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default NavButton;
