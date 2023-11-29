import React, { useContext, useState } from 'react';
import { isValidPatp } from 'urbit-ob';
import { createContact } from '../api/WhomPokes';
import { AppContext } from '../context/AppContext';
import { InfoValue, InfoDate, InfoFields, InfoLook, InfoTint } from '../types/ContactTypes';
import CloseButton from './buttons/CloseButton';
import SubmitButton from './buttons/SubmitButton';
import DateInput from './input/DateInput';
import ShipInput from './input/ShipInput';
import TextInput from './input/TextInput';
import TintInput from './input/TintInput';

export default function AddContactForm() {
  const { api, closeAddContactModal, displayError, fieldSettings } = useContext(AppContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [ship, setShip] = useState<string | null>(null);
  const [infoFields, setInfoFields] = useState<InfoFields>({});

  function submitChanges() {
    const contact = {
      info: sanitizeInfo(infoFields),
      profile: null
    };
    setSubmitting(true);
    createContact(api, ship || null, contact, onError, () => {
      closeAddContactModal();
      setTimeout(() => setSubmitting(false), 1000);
    });
  }

  function canSubmit() {
    if (submitting) {
      return false;
    }
    if (ship && !isValidPatp(ship)) {
      return false;
    }
    return true;
  }

  function onError(error: string | null) {
    setSubmitting(false);
    displayError(error || 'Error creating contact!');
  }

  function sanitizeInfo(info: InfoFields): InfoFields {
    return Object.fromEntries(
      Object.entries(info).filter(([, val]) => val != '')
    );
  }

  function onInfoTextChange(key: string): (arg: string) => void {
    return (value: string) => {
      setInfoFields({
        ...infoFields,
        [key]: value
      })
    }
  }

  function onInfoDateChange(key: string): (arg: InfoDate | undefined) => void {
    return (value: InfoDate | undefined) => {
      setInfoFields({
        ...infoFields,
        [key]: value
      })
    }
  }

  function onInfoLookChange(key: string): (arg: string) => void {
    return (value: string) => {
      setInfoFields({
        ...infoFields,
        [key]: (value && value.length) ? { look: value } : undefined
      });
    }
  }

  function onInfoTintChange(key: string): (arg: string | undefined) => void {
    return (value: string | undefined) => {
      setInfoFields({
        ...infoFields,
        [key]: (value && value.length) ? { tint: value } : undefined
      });
    }
  }

  function renderShipName() {
    return <ShipInput label='Urbit' value={ship} onChange={setShip}/>
  }

  function renderInfoField(key: string, val: InfoValue | undefined) {
    const label = fieldSettings.defs[key]?.name || key;
    switch (fieldSettings.defs[key]?.type) {
      case 'text':
        return <TextInput label={label} value={val as string | undefined} onChange={onInfoTextChange(key)} />;
      case 'date':
        return <DateInput label={label} value={val as InfoDate | undefined} onChange={onInfoDateChange(key)}/>;
      case 'look':
        return <TextInput label={label} value={(val as InfoLook | undefined)?.look} onChange={onInfoLookChange(key)}/>;
      case 'tint':
        return <TintInput label={label} value={val as InfoTint | undefined} onChange={onInfoTintChange(key)}/>;
      default:
        return <span>error</span>;
    }
  }

  function renderInfoFields() {
    return (
      <ul>
        {fieldSettings.order
          .filter(key => fieldSettings.defs[key]?.type !== 'coll') // todo
          .map(key => {
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
          <SubmitButton
            className='font-bold'
            onClick={submitChanges}
            disabled={!canSubmit()}
          >
            Create
          </SubmitButton>
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
