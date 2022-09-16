import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Contact, InfoValue, InfoDate, ContactWithKey } from '../../types/ContactTypes';
import { getContactWithKey, getDisplayName } from '../../util/ContactUtil';
import { combineFieldOrders } from '../../util/FieldUtil';
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

  const profileFieldDefs = contact.profile?.fields || {};
  const profileFieldOrder = Object.keys(profileFieldDefs).sort();
  const fieldOrder = combineFieldOrders(fieldSettings.order, profileFieldOrder);

  function renderShipName(contact: ContactWithKey) {
    if (!contact.ship) {
      return null;
    }
    return <TextField label='Urbit' value={contact.ship}/>
  }

  function renderInfoField(key: string, val: InfoValue | undefined, fromProfile: boolean) {
    const defs = fromProfile ? profileFieldDefs : fieldSettings.defs;
    const label = defs[key]?.name || key;
    switch (defs[key]?.type) {
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
        {fieldOrder.map((key: string) => ({
          key: key,
          value: contact.info[key] || contact.profile?.info[key],
          fromProfile: !(key in contact.info) && !!contact.profile && (key in contact.profile.info)
        }))
        .filter((arg: { key: string, value: InfoValue | undefined, fromProfile: boolean}) => arg.value !== undefined)
        .map((arg: {key: string, value: InfoValue | undefined, fromProfile: boolean}) => (
          <li key={arg.key}>
            {renderInfoField(arg.key, arg.value, arg.fromProfile)}
          </li>
        ))}
      </ul>
    );
  }

  function renderContact(contact: ContactWithKey) {
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
