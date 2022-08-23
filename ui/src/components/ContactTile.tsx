import { Contact, InfoValue, InfoDate} from '../types/ContactTypes';
import React, { useState } from 'react';

const displayKeys: {[key: string]: string} = {
  "first-name": "First Name",
  "last-name": "Last Name",
  "dob": "Date of Birth",
  "note": "Note"
};

function getDisplayKey(key: string) {
  return displayKeys[key] || key;
}

function getFieldType(val: InfoValue) {
  if (typeof val === 'string') {
    return 'string';
  }
  return Object.keys(val)[0];
}

function renderTextValue(val: string) {
  return val;
}

function renderDateValue({ date }: InfoDate) {
  return `${date.year}/${date.month}/${date.day}`;
}

function renderInfoValue(val: InfoValue) {
  switch (getFieldType(val)) {
    case 'string': return renderTextValue(val as string);
    case 'date': return renderDateValue(val as InfoDate);
    default: return JSON.stringify(val);
  }
}

function renderField(key: string, val: InfoValue) {
  return <p>{`${getDisplayKey(key)}: ${renderInfoValue(val)}`}</p>;
};

function getFullName(contact: Contact) {
  var first = contact.info['first-name'];
  var last = contact.info['last-name'];
  return [first, last].filter(s => !!s).join(' ');
}

function getDisplayName(contact: Contact) {
  if (contact.ship) {
    return contact.ship;
  }
  return getFullName(contact);
}

export const ContactTile = (contact: Contact) => {
  return (
    <div className="flex-1 text-black">
      <p>
        <strong>{getDisplayName(contact)}</strong>
      </p>
      <ul>
        {Object.entries(contact.info) // todo: sort fields
          .map(([key, val]: [string, InfoValue]) => (
            <li key={key}>
              {renderField(key, val)}
            </li>
          ))}
      </ul>
    </div>
  );
};
