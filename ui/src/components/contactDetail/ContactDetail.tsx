import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Contact, InfoValue, InfoDate } from '../../types/ContactTypes';
import { getContactWithKey, getDisplayName } from '../../util/ContactUtil';
import EditForm from './EditForm';
import DateField from '../fields/DateField';
import TextField from '../fields/TextField';
import Menu from './Menu';

export default function ContactDetail(): JSX.Element {
  const { contacts, selectedContactKey, editContactMode, fieldSettings } = useContext(AppContext);
  if (!selectedContactKey) {
    return <p>Error</p>;
  }
  const contact = getContactWithKey(contacts, selectedContactKey);
  if (!contact) {
    return <p>Error</p>;
  }

  function renderShipName(contact: Contact) {
    if (!contact.ship) {
      return null;
    }
    return <TextField label='Urbit' value={contact.ship}/>
  }
  
  function renderInfoField(key: string, val: InfoValue | undefined) {
    const label = fieldSettings.defs[key]?.name || key;
    switch (fieldSettings.defs[key]?.type) {
      case 'text':
        return <TextField label={label} value={val as string | undefined}/>;
      case 'date':
        return <DateField label={label} value={val as InfoDate | undefined}/>;
      default:
        return <span>{JSON.stringify(val)}</span>;
    }
  }

  function renderInfoFields(contact: Contact) {
    return (
      <ul>
        {fieldSettings.order.map((key: string) => ({
          key: key,
          value: contact.info[key]
        }))
        .filter((arg: { key: string, value: InfoValue | undefined}) => arg.value !== undefined)
        .map((arg: {key: string, value: InfoValue | undefined}) => (
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
      </div>
    );
  }

  return (
    <div className='flex'>
      {editContactMode ? <EditForm contact={contact}/> : renderContact(contact)}
      <Menu/>
    </div>
  );
};
