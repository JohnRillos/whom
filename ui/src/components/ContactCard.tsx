import React from 'react';
import { Contact } from '../types/ContactTypes';
import { getDisplayName } from '../util/ContactUtil';

export const ContactCard = (contact: Contact) => {
  return (
    <button className='w-full hover:bg-sky-500/10 dark:hover:bg-gray-800'>
      <div className='px-2 py-2 text-sm text-left'>
        <p>{getDisplayName(contact)}</p>
      </div>
    </button>
  );
};
