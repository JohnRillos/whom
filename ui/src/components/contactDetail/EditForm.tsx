import React from 'react';
import { Contact, InfoValue, InfoDate, InfoKey } from '../../types/ContactTypes';
import { getDisplayName, getFieldType, getFieldDisplayName, OrderedInfoKeys } from '../../util/ContactUtil';
import DateField from './fields/DateField';
import TextField from './fields/TextField';

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

function renderShipName(contact: Contact) {
  return <TextField label='Urbit' value={contact.ship}/>
}

function sortCustomFields(info: { [key: string]: string }): [string, string][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
    return keyA > keyB ? 1 : -1;
  });
}

function renderInfoFields(contact: Contact) {
  return (
    <ul>
      {OrderedInfoKeys.map((key: InfoKey) => ({
        key: key,
        value: contact.info[key]
      }))
      .map((arg: {key: InfoKey, value: InfoValue | undefined}) => (
        <li key={arg.key}>
          {renderInfoField(arg.key, arg.value)}
        </li>
      ))}
    </ul>
  );
}

export default function EditForm(props: {contact: Contact}) {
  return (
    <div className='h-full text-left'>
      <p>Edit Contact</p>
      <p className='mb-2'>
        <strong>{getDisplayName(props.contact)}</strong>
      </p>
      {renderShipName(props.contact)}
      {renderInfoFields(props.contact)}
      <p>Custom Fields</p>
      <ul>
        {sortCustomFields(props.contact.custom)
          .map(([key, val]) => (
            <li key={key}>
              <TextField label={key} value={val}/>
            </li>
          ))}
      </ul>
    </div>
  );
}
