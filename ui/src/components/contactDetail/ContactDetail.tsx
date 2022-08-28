import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Contact, InfoValue, InfoDate, InfoKey, InfoFields } from '../../types/ContactTypes';
import { getContact, getDisplayName, withKey } from '../../util/ContactUtil';
import EditForm from './EditForm';
import Menu from './Menu';

const displayFieldNames: Record<InfoKey, string> = {
  "first-name": "First Name",
  "middle-name": "Middle Name",
  "last-name": "Last Name",
  "nickname": "Nickname",
  "label": "Label",
  "dob": "Date of Birth",
  "note": "Note",
  "job": "Occupation",
  "phone": "Phone #",
  "email": "Email",
  "website": "Website",
  "github": "GitHub",
  "twitter": "Twitter",
};

const fieldPositions: { [key: string]: number } =
  Object.fromEntries(Object.keys(displayFieldNames).map((key, i) => ([key, i])));

function getDisplayKey(key: InfoKey) {
  return displayFieldNames[key] || key;
}

function getFieldType(val: InfoValue) {
  if (typeof val === 'string') {
    return 'string';
  }
  return Object.keys(val)[0];
}

function renderTextValue(val: string) {
  return <p>{val}</p>;
}

function renderDateValue({ date }: InfoDate) {
  return (
    <p>
      {`${date.year}/${date.month}/${date.day}`}
    </p>
  );
}

function renderInfoValue(val: InfoValue): JSX.Element {
  switch (getFieldType(val)) {
    case 'string': return renderTextValue(val as string);
    case 'date': return renderDateValue(val as InfoDate);
    default: return <p>{JSON.stringify(val)}</p>;
  }
}

function renderInfoField(key: InfoKey, val: InfoValue) {
  return (
    <div className='flex'>
      <p className='flex-none font-semibold mr-2'>{getDisplayKey(key)}: </p>
      <div className='inline-block'>
        {renderInfoValue(val)}
      </div>
    </div>
  );
}

function renderCustomField(key: string, val: InfoValue) {
  return (
    <div className='flex'>
      <p className='flex-none font-semibold mr-2'>{key}: </p>
      <div className='inline-block'>
        {renderInfoValue(val)}
      </div>
    </div>
  );
}

function renderShipName(contact: Contact) {
  if (contact.ship) {
    return <>
      <span className='font-semibold mr-2'>Urbit: </span>
      {contact.ship}
    </>
  }
  return null;
}

function sortInfoFields(info: InfoFields): [InfoKey, InfoValue][] {
   var entries = Object.entries(info) as [InfoKey, InfoValue][];
   return entries.sort(([keyA], [keyB]) => {
    if (keyA in fieldPositions && keyB in fieldPositions) {
      return fieldPositions[keyA] - fieldPositions[keyB];
    }
    if (keyA in fieldPositions) {
      return -1;
    }
    if (keyB in fieldPositions) {
      return 1;
    }
    return keyA > keyB ? 1 : -1;
  });
}

function sortCustomFields(info: { [key: string]: string }): [string, string][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
    return keyA > keyB ? 1 : -1;
  });
}

function renderContact(contact: Contact) {
  return (
    <div className='text-left'>
      <p className='mb-2'>
        <strong>{getDisplayName(contact)}</strong>
      </p>
      {renderShipName(contact)}
      <ul>
        {sortInfoFields(contact.info)
          .map(([key, val]) => (
            <li key={key}>
              {renderInfoField(key, val)}
            </li>
          ))}
      </ul>
      <ul>
        {sortCustomFields(contact.custom)
          .map(([key, val]) => (
            <li key={key}>
              {renderCustomField(key, val)}
            </li>
          ))}
      </ul>
    </div>
  )
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
