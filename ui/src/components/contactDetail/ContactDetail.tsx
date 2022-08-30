import { Dialog } from '@headlessui/react';
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Contact, InfoValue, InfoDate, InfoKey } from '../../types/ContactTypes';
import { getContact, getDisplayName, getFieldDisplayName, getFieldType, OrderedInfoKeys } from '../../util/ContactUtil';
import EditForm from './EditForm';
import DateField from './fields/DateField';
import TextField from './fields/TextField';
import Menu from './Menu';

function renderShipName(contact: Contact) {
  if (!contact.ship) {
    return null;
  }
  return <TextField label='Urbit' value={contact.ship}/>
}

function sortCustomFields(info: { [key: string]: string }): [string, string][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
    return keyA > keyB ? 1 : -1;
  });
}

function renderInfoField(key: InfoKey, val: InfoValue | undefined) {
  const label = getFieldDisplayName(key);
  switch (getFieldType(key)) {
    case 'string':
      return <TextField label={label} value={val as string | undefined}/>;
    case 'InfoDate':
      return <DateField label={label} value={val as InfoDate | undefined}/>;
    default:
      return JSON.stringify(val);
  }
}

function renderInfoFields(contact: Contact) {
  return (
    <ul>
      {OrderedInfoKeys.map((key: InfoKey) => ({
        key: key,
        value: contact.info[key]
      }))
      .filter((arg: { key: string, value: InfoValue | undefined}) => arg.value !== undefined)
      .map((arg: {key: InfoKey, value: InfoValue | undefined}) => (
        <li key={arg.key}>
          {renderInfoField(arg.key, arg.value)}
        </li>
      ))}
    </ul>
  );
}

function renderContact(contact: Contact) {
  return (
    <div className='text-left h-fit'>
      <p className='mb-2'>
        <strong>{getDisplayName(contact)}</strong>
      </p>
      {renderShipName(contact)}
      {renderInfoFields(contact)}
      <ul>
        {sortCustomFields(contact.custom)
          .map(([key, val]) => (
            <li key={key}>
              <TextField label={key} value={val}/>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default function ContactDetail(): JSX.Element {
  const { contacts, selectedContactKey, editContactMode } = useContext(AppContext);
  if (!selectedContactKey) {
    return <p>Error</p>;
  }
  const contact = getContact(contacts, selectedContactKey);
  if (!contact) {
    return <p>Error</p>;
  }
  return (
    <div className='flex'>
      {editContactMode ? <EditForm contact={contact}/> : renderContact(contact)}
      <Menu/>
    </div>
  );
};
