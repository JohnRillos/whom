import React from 'react';
import { Contact } from '../types/ContactTypes';
import { getDisplayName } from '../util/ContactUtil';

export const ContactCard = (contact: Contact) => {
  return (
    <button className='w-full'>
      <div className='py-2 text-sm text-black text-left'>
        <p>{getDisplayName(contact)}</p>
      </div>
    </button>
  );
};
