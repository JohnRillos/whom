import React from 'react';
import { Contact, ContactWithKey } from '../types/ContactTypes';
import Sigil from './Sigil';

function getAvatarUrl(contact: Contact): string | undefined {
  return contact.info.avatar?.look ?? contact.profile?.info.avatar?.value.look;
}

function getImage(contact: Contact): JSX.Element | null {
  const url = getAvatarUrl(contact);
  if (!url) {
    return null;
  }
  return <img className='w-full h-full rounded' src={url}/>
}

function getSigil(ship: string | null): JSX.Element | null {
  return ship ? <Sigil ship={ship}/> : null;
}

export default function Avatar( props: { contact: ContactWithKey } ): JSX.Element | null {
  return getImage(props.contact) || getSigil(props.contact.ship);
}
