import React, { useContext, useState } from 'react';
import { createContact } from '../api/ContactPokes';
import { AppContext } from '../context/AppContext';
import { InfoValue, InfoDate, InfoFields } from '../types/ContactTypes';
import CloseButton from './buttons/CloseButton';
import DateInput from './input/DateInput';
import ShipInput from './input/ShipInput';
import TextInput from './input/TextInput';

export default function AddContactForm() {
  const { api, closeAddContactModal, fieldSettings } = useContext(AppContext);
  let [ship, setShip] = useState<string | null>(null);
  let [infoFields, setInfoFields] = useState<InfoFields>({});

  function submitChanges() {
    createContact(api, {
      ship: ship,
      info: sanitizeInfo(infoFields),
    }, onError)
    closeAddContactModal();
  }

  function onError(error: any) {
    console.error(error);
  }

  function sanitizeInfo(info: InfoFields): InfoFields {
    return Object.fromEntries(
      Object.entries(info).filter(([key, val]) => val != '')
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

  function renderShipName() {
    return <ShipInput label='Urbit' value={ship || undefined} onChange={setShip}/>
  }

  function renderInfoField(key: string, val: InfoValue | undefined) {
    const label = fieldSettings.defs[key]?.name || key;
    switch (fieldSettings.defs[key]?.type) {
      case 'text':
        return <TextInput label={label} value={val as string | undefined} onChange={onInfoTextChange(key)} />;
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
    <div className='flex'>
      <div className='h-fit text-left'>
        <p className='mb-2'>
          <strong>New Contact</strong>
        </p>
        {renderShipName()}
        {renderInfoFields()}
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
      <div className='flex-col items-center max-w-fit ml-2'>
        <CloseButton onClick={closeAddContactModal}/>
      </div>
    </div>
  );
}
