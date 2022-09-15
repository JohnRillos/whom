import React, { useState } from 'react';
import { useContext } from 'react';
import { editSelf } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { InfoValue, InfoDate, InfoFields } from '../../types/ContactTypes';
import BackButton from '../buttons/BackButton';
import SubmitButton from '../buttons/SubmitButton';
import DateInput from '../input/DateInput';
import TextInput from '../input/TextInput';
import isEqual from 'lodash.isequal';

export default function ProfileView(props: { closeContainer: () => void }): JSX.Element {
  const { api, displayError, fieldSettings, self } = useContext(AppContext);
  let [submitting, setSubmitting] = useState<boolean>(false);
  let [infoFields, setInfoFields] = useState<InfoFields>(self.info);

  function submitChanges() {
    setSubmitting(true);
    editSelf(
      api,
      sanitizeInfo(infoFields),
      onError,
      () => {
        setSubmitting(false);
      }
    );
  }

  function onError(error: string | null) {
    setSubmitting(false);
    displayError(error || 'Error editing profile!');
  }

  function sanitizeInfo(info: InfoFields): Record<string, InfoValue | null> {
    return Object.fromEntries(
      Object.entries(info).map(([key, val]) => {
        if (!val) {
          return [key, null] as [string, null];
        }
        return [key, val] as [string, InfoValue];
      }).filter(([key, val]) => {
        if (!val && !(key in self.info)) {
          return false;
        }
        return !isEqual(self.info[key], val);
      })
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
            {renderInfoField(key, hasEdits ? infoFields[key] : self.info[key])}
          </li>
        })}
      </ul>
    );
  }

  const hasEdits: boolean = Object.keys(sanitizeInfo(infoFields)).length > 0;
  const canSubmit: boolean = !submitting && hasEdits;

  function resetChanges() {
    setInfoFields(self.info);
  }

  function renderProfile() {
    return (
      <div className='text-left h-fit'>
        <h2 className='text-center mb-2 font-bold text-2xl'>~{window.ship}</h2>
        {renderInfoFields()}
        <div className='mt-2 space-x-2'>
          <SubmitButton
            className='font-bold'
            onClick={submitChanges}
            disabled={!canSubmit}
          >
            Publish
          </SubmitButton>
          {canSubmit ?
            <button
              type='button'
              className='px-1 py-0.5 rounded-md button-secondary font-bold hover:bg-neutral-500/20'
              onClick={resetChanges}
            >
              Cancel
            </button> : null
          }
        </div>
      </div>
    );
  }

  return (
    <div className='h-full w-full flex flex-col overflow-hidden'>
      <nav className='flex-shrink w-full flex flex-row p-4'>
        <div className='fixed'>
          <BackButton label='Contacts' onClick={props.closeContainer}/>
        </div>
        <h1 className='m-auto text-center text-3xl font-bold'>Profile</h1>
      </nav>
      <div className='mx-auto justify-self-center max-w-md px-4'>
        {renderProfile()}
      </div>
    </div>
  );
};
