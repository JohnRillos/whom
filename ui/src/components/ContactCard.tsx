import React from 'react';
import { Contact, InfoValue, InfoDate } from '../types/ContactTypes';
import { getDisplayName } from '../util/ContactUtil';

const displayFieldNames: { [key: string]: string } = {
  "first-name": "First Name",
  "middle-name": "Middle Name",
  "last-name": "Last Name",
  "nickname": "Nickname",
  "dob": "Date of Birth",
  "note": "Note",
  "job": "Occupation",
  "phone": "Phone #",
  "email": "Email",
  "website": "Website",
  "github": "GitHub",
  "twitter": "Twitter"
};

const fieldPositions: { [key: string]: number } =
  Object.fromEntries(Object.keys(displayFieldNames).map((key, i) => ([key, i])));

function getDisplayKey(key: string) {
  return displayFieldNames[key] || key;
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
  return (
    <span>
      {`${date.year}/${date.month}/${date.day}`}
    </span>
  );
}

function renderInfoValue(val: InfoValue) {
  switch (getFieldType(val)) {
    case 'string': return renderTextValue(val as string);
    case 'date': return renderDateValue(val as InfoDate);
    default: return JSON.stringify(val);
  }
}

function renderField(key: string, val: InfoValue) {
  return (
    <div>
      <span>{getDisplayKey(key)}: </span>{renderInfoValue(val)}
    </div>
  );
}

function sortInfoFields(info: { [key: string]: InfoValue }): [string, InfoValue][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
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

export const ContactCard = (contact: Contact) => {
  return (
    <div className='flex-1 text-black'>
      <p>
        <strong>{getDisplayName(contact)}</strong>
      </p>
      <ul>
        {sortInfoFields(contact.info)
          .map(([key, val]) => (
            <li key={key}>
              {renderField(key, val)}
            </li>
          ))}
      </ul>
      <ul>
        {sortCustomFields(contact.custom)
          .map(([key, val]) => (
            <li key={key}>
              {renderField(key, val)}
            </li>
          ))}
      </ul>
    </div>
  );
};
