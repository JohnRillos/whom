import React from 'react';
import { useContext } from 'react'
import { ContactWithKey } from '../types/ContactTypes';
import { getDisplayName } from '../util/ContactUtil';
import { AppContext } from '../context/AppContext'
import Avatar from './Avatar';

export const ContactCard = (props:{contact:ContactWithKey}) => {
  const { selectContact, openModal } = useContext(AppContext);

  return (
    <button
      className='hover:transition-colors ease-out duration-300 hover:bg-sky-500/10 dark:hover:bg-gray-800 max-w-sm w-full'
      onClick={() => {
        selectContact(props.contact.key);
        openModal();
      }}
    >
      <div className='p-2 text-left text-lg flex flex-row'>
        <div className='w-7 mr-2'>
          <Avatar contact={props.contact}/>
        </div>
        <p>{getDisplayName(props.contact)}</p>
      </div>
    </button>
  );
};
