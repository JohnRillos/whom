import React, { useContext, useState } from 'react';
import { editContact } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { Contact, InfoValue, InfoDate, ContactWithKey, InfoFields } from '../../types/ContactTypes';
import { getDisplayName } from '../../util/ContactUtil';
import TextField from '../fields/TextField';
import DateInput from '../input/DateInput';
import TextInput from '../input/TextInput';

function renderShipName(contact: Contact) {
  if (!contact.ship) {
    return null;
  }
  return <TextField label='Urbit' value={contact.ship}/>
}

export default function EditForm(props: { contact: ContactWithKey }) {
  const { api, displayError, setEditContactMode, fieldSettings } = useContext(AppContext);
  let [infoFields, setInfoFields] = useState<InfoFields>(props.contact.info);

  function submitChanges() {
    editContact(
      api,
      props.contact.key,
      sanitizeInfo(infoFields),
      onError
    );
    setEditContactMode(false);
  }

  function onError(error: string | undefined) {
    displayError(error || 'Error editing contact!');
  }

  function sanitizeInfo(info: InfoFields): Record<string, InfoValue | null> {
    return Object.fromEntries(
      Object.entries(info).filter(([key, val]) => {
        return props.contact.info[key] !== val;
      }).map(([key, val]) => {
        if (val == '' || val == undefined) {
          return [key, null];
        }
        return [key, val];
      })
    );
  }

  function onInfoTextChange(key: string): (arg: string) => void {
    return (value: string) => {
      setInfoFields({
        ...infoFields,
        [key]: value as InfoValue
      })
    }
  }

  function onInfoDateChange(key: string): (arg: InfoDate | undefined) => void {
    return (value: InfoDate | undefined) => {
      setInfoFields({
        ...infoFields,
        [key]: value as InfoValue | undefined
      })
    }
  }

  function renderInfoField(key: string, val: InfoValue | undefined) {
    const label = fieldSettings.defs[key]?.name || key;
    switch (fieldSettings.defs[key]?.type) {
      case 'text':
        return <TextInput label={label} value={val as string | undefined} onChange={onInfoTextChange(key)}/>;
      case 'date':
        return <DateInput label={label} value={val as InfoDate | undefined} onChange={onInfoDateChange(key)}/>;
      default:
        return <span>error</span>;
    }
  }

  function renderInfoFields() {
    return (
      <ul>
        {fieldSettings.order.map((key: string) => {
          return <li key={key}>
            {renderInfoField(key, infoFields[key])}
          </li>
        })}
      </ul>
    );
  }

  return (
    <div className='h-fit text-left'>
      <p className='mb-2'>
        <strong>{getDisplayName(props.contact)}</strong>
      </p>
      {renderShipName(props.contact)}
      {renderInfoFields()}
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
