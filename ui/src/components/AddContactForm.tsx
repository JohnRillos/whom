import React, { useContext, useState } from 'react';
import { createContact } from '../api/ContactPokes';
import { AppContext } from '../context/AppContext';
import { InfoValue, InfoDate, InfoKey, InfoFields } from '../types/ContactTypes';
import { getFieldType, getFieldDisplayName, OrderedInfoKeys } from '../util/ContactUtil';
import DateInput from './input/DateInput';
import ShipInput from './input/ShipInput';
import TextInput from './input/TextInput';

function sortCustomFields(info: { [key: string]: string }): [string, string][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
    return keyA > keyB ? 1 : -1;
  });
}

export default function AddContactForm() {
  const { api, closeAddContactModal } = useContext(AppContext);
  let [ship, setShip] = useState<string | null>(null);
  let [infoFields, setInfoFields] = useState<InfoFields>({});
  let [customFields, setCustomFields] = useState<Record<string, string>>({});

  function submitChanges() {
    createContact(api, {
      ship: ship,
      info: sanitizeInfo(infoFields),
      custom: customFields
    })
    closeAddContactModal();
  }

  function sanitizeInfo(info: InfoFields): InfoFields {
    return Object.fromEntries(
      Object.entries(info).filter(([key, val]) => val != '')
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

  function renderShipName() {
    return <ShipInput label='Urbit' value={ship || undefined} onChange={setShip}/>
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
        <strong>New Contact</strong>
      </p>
      {renderShipName()}
      {renderInfoFields()}
      {renderCustomFields()}
      <div className='mt-2 space-x-2'>
        <button
          type='submit'
          className='px-1 py-0.5 rounded-md button-primary font-bold hover:bg-blue-500 hover:border-blue-500'
          onClick={submitChanges}>
          Create
        </button>
        <button
          type='button'
          className='px-1 py-0.5 rounded-md button-secondary font-bold hover:bg-neutral-500/20'
          onClick={closeAddContactModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
