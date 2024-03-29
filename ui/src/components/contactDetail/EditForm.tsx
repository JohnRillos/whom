import React, { useContext, useState } from 'react';
import { editContact, editContactShip } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import { InfoValue, InfoDate, ContactWithKey, InfoFields, InfoLook, InfoTint, InfoColl } from '../../types/ContactTypes';
import { getDisplayName } from '../../util/ContactUtil';
import SubmitButton from '../buttons/SubmitButton';
import DateInput from '../input/DateInput';
import ShipInput from '../input/ShipInput';
import TextInput from '../input/TextInput';
import TintInput from '../input/TintInput';
import CollInput from '../input/CollInput';

export default function EditForm(props: { contact: ContactWithKey }) {
  const { api, closeModal, selectContact, displayError, setEditContactMode, fieldSettings } = useContext(AppContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [ship, setShip] = useState<string | null>(props.contact.ship);
  const [infoFields, setInfoFields] = useState<InfoFields>(props.contact.info);

  function submitChanges() {
    setSubmitting(true);
    editContact(
      api,
      props.contact.key,
      sanitizeInfo(infoFields),
      onError,
      () => {
        if (props.contact.ship != ship) {
          submitShipChange();
        } else {
          setEditContactMode(false);
          setSubmitting(false);
        }
      }
    );
  }

  function submitShipChange() {
    if (!ship) {
      closeModal(); // can't predict new key, close modal instead of showing error
    }
    editContactShip(
      api,
      props.contact.key,
      ship,
      onError,
      () => {
        if (ship) {
          selectContact(ship);
        }
        setEditContactMode(false);
        setSubmitting(false);
      }
    )
  }

  function onError(error: string | null) {
    setSubmitting(false);
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
        return [key, sanitizeInfoColl(val)];
      })
    );
  }

  function sanitizeInfoColl(infoValue: InfoValue): InfoValue {
    if (isInfoColl(infoValue)) {
      const sane = infoValue.coll.map(item => ({
        ship: item.ship,
        slug: item.slug
      }));
      return ({...infoValue, coll: sane });
    }
    return infoValue;
  }

  function isInfoColl(val: InfoValue): val is InfoColl {
    return typeof val === 'object' && ('coll' in val);
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

  function onInfoCollChange(key: string): (arg: InfoColl | undefined) => void {
    return (value: InfoColl | undefined) => {
      setInfoFields({
        ...infoFields,
        [key]: value
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
        return <TextInput label={label} value={val as string | undefined} onChange={onInfoTextChange(key)}/>;
      case 'date':
        return <DateInput label={label} value={val as InfoDate | undefined} onChange={onInfoDateChange(key)}/>;
      case 'look':
        return <TextInput label={label} value={(val as InfoLook | undefined)?.look} onChange={onInfoLookChange(key)}/>;
      case 'tint':
        return <TintInput label={label} value={val as InfoTint | undefined} onChange={onInfoTintChange(key)}/>;
      case 'coll':
        return <CollInput label={label} value={val as InfoColl | undefined} onChange={onInfoCollChange(key)}/>;
      default:
        return <span>error</span>;
    }
  }

  function renderInfoFields() {
    return (
      <ul>
        {fieldSettings.order
          .map(key => {
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
      {renderShipName()}
      {renderInfoFields()}
      <div className='mt-2 space-x-2'>
        <SubmitButton
          className='font-bold'
          onClick={submitChanges}
          disabled={submitting}
        >
          Save
        </SubmitButton>
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
