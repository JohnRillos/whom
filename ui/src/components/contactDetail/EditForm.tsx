import React, { useContext, useState } from 'react';
import { editContact } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { Contact, InfoValue, InfoDate, InfoKey, ContactWithKey, InfoFields } from '../../types/ContactTypes';
import { getDisplayName, getFieldType, getFieldDisplayName, OrderedInfoKeys } from '../../util/ContactUtil';
import TextField from '../fields/TextField';
import DateInput from '../input/DateInput';
import TextInput from '../input/TextInput';

function renderShipName(contact: Contact) {
  return <TextField label='Urbit' value={contact.ship} />
}

function sortCustomFields(info: { [key: string]: string }): [string, string][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
    return keyA > keyB ? 1 : -1;
  });
}

export default function EditForm(props: { contact: ContactWithKey }) {
  const { api, setEditContactMode } = useContext(AppContext);
  let [infoFields, setInfoFields] = useState<InfoFields>(props.contact.info);
  let [customFields, setCustomFields] = useState<Record<string, string>>(props.contact.custom);

  function submitChanges() {
    editContact(
      api,
      props.contact.key,
      sanitizeInfo(infoFields),
      customFields
    );
    setEditContactMode(false);
  }

  function sanitizeInfo(info: InfoFields): InfoFields {
    return Object.fromEntries(
      Object.entries(info).filter(([key, val]) => {
        return props.contact.info[key as InfoKey] !== val;
      }).map(([key, val]) => {
        if (val == '') {
          return [key, null];
        }
        return [key, val];
      })
    );
  }

  function onInfoTextChange(key: InfoKey): (arg: string) => void {
    return (value: string) => {
      console.log('key:', key);
      console.log('value:', value);
      setInfoFields({
        ...infoFields,
        [key]: value as InfoValue
      })
    }
  }

  function onCustomTextChange(key: string): (arg: string) => void {
    return (value: string) => {
      console.log('key:', key);
      console.log('value:', value);
      setCustomFields({
        ...customFields,
        [key]: value
      })
    }
  }

  function renderInfoField(key: InfoKey, val: InfoValue | undefined) {
    const label = getFieldDisplayName(key);
    switch (getFieldType(key)) {
      case 'string':
        return <TextInput label={label} value={val as string | undefined} onChange={onInfoTextChange(key)} />;
      case 'InfoDate':
        return <DateInput label={label} value={val as InfoDate | undefined} />;
      default:
        return <span>error</span>;
    }
  }

  function renderInfoFields() {
    return (
      <ul>
        {OrderedInfoKeys.map((key: InfoKey) => {
          return <li key={key}>
            {renderInfoField(key, infoFields[key])}
          </li>
        })}
      </ul>
    );
  }

  function renderCustomField(key: string, val: string) {
    return <TextInput label={key} value={val} onChange={onCustomTextChange(key)} />;
  }

  function renderCustomFields() {
    return (<>
      <p>Custom Fields</p>
      <ul>
        {sortCustomFields(customFields).map(([key, val]) =>
          <li key={key}>{renderCustomField(key, val)}</li>
        )}
      </ul>
    </>);
  }

  return (
    <div className='h-fit text-left'>
      <p className='mb-2'>
        <strong>{getDisplayName(props.contact)}</strong>
      </p>
      {renderShipName(props.contact)}
      {renderInfoFields()}
      {renderCustomFields()}
      <div className='mt-2 space-x-2'>
        <button
          type='submit'
          className='px-1 py-0.5 rounded-md button-primary font-bold hover:bg-blue-500 hover:border-blue-500'
          onClick={submitChanges}>
          Save
        </button>
        <button
          type='button'
          className='px-1 py-0.5 rounded-md button-secondary font-bold hover:bg-neutral-500/20'
          onClick={() => setEditContactMode(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
