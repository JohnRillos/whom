import React, { useContext, useState } from 'react';
import { byePal, heyPal } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import { PalStatus } from '../../types/PalsTypes';
import { getContactWithKey, getDisplayName } from '../../util/ContactUtil';
import CloseButton from '../buttons/CloseButton';
import DangerButton from '../buttons/DangerButton';
import SubmitButton from '../buttons/SubmitButton';

export default function PalView(props: { closeModal: () => void }): JSX.Element | null {
  const {
    api,
    contacts,
    displayError,
    palsInfo,
    selectedContactKey
  } = useContext(AppContext);
  let [ submitting, setSubmitting ] = useState<boolean>(false);
  if (!selectedContactKey) {
    return null;
  }
  const ship = selectedContactKey;

  const contact = getContactWithKey(contacts, selectedContactKey);
  if (!contact) {
    return null;
  }

  function addToPals() {
    setSubmitting(true);
    heyPal(api, ship,
      () => {
        setSubmitting(false);
        displayError('Failed to add pal');
      },
      () => setSubmitting(false)
    );
  }

  function removeFromPals() {
    setSubmitting(true);
    byePal(
      api,
      ship,
      () => {
        setSubmitting(false);
        displayError('Failed to remove pal');
      },
      () => setSubmitting(false)
    );
  }

  const name = getDisplayName(contact);
  const pal = palsInfo.pals[selectedContactKey]

  function renderStatus(): JSX.Element | null {
    let text: string;
    let color: string;
    switch (pal?.status) {
      case PalStatus.MUTUAL:
        text = 'mutual';
        color = 'bg-green-500';
        break;
      case PalStatus.TARGET:
        text = 'outgoing';
        color = 'bg-blue-500';
        break;
      case PalStatus.LEECHE:
        text = 'incoming';
        color = 'bg-amber-400';
        break;
      default:
        return null;
    }
    return <p className='mb-1'>Status: <span className={`${color} text-white px-2 py-0.5 rounded-full`}>{text}</span></p>
  }

  function getDescription(): string {
    switch (pal?.status) {
      case PalStatus.MUTUAL:
        return 'You are mutual pals.';
      case PalStatus.TARGET:
        return 'You\'ve sent this person a pal request. If they accept, you\'ll be mutual pals.';
      case PalStatus.LEECHE:
        return 'This person sent you a pal request. If you accept, you\'ll be mutual pals.';
      default:
        return `Add ${name} as a pal?`;
    }
  }

  function palRequestButton(): JSX.Element {
    switch (pal?.status) {
      case PalStatus.LEECHE:
        return (
          <SubmitButton onClick={addToPals} disabled={submitting}>
            Accept pal request
          </SubmitButton>
        );
      case PalStatus.MUTUAL:
        return (
          <DangerButton onClick={removeFromPals} disabled={submitting}>
            Remove as pal
          </DangerButton>
        );
      case PalStatus.TARGET:
        return (
          <DangerButton onClick={removeFromPals} disabled={submitting}>
            Cancel pal request
          </DangerButton>
        );
      default:
        return (
          <SubmitButton onClick={addToPals} disabled={submitting}>
            Send pal request
          </SubmitButton>
        );
    }
  }

  function renderContent(): JSX.Element {
    return (
      <div>
        <h1 className='mb-2 text-center font-bold'>
          %pals: {name}
        </h1>
        {renderStatus()}
        <p>{getDescription()}</p>
        <div className='mt-2 space-x-2'>
          {palRequestButton()}
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-fit'>
      {renderContent()}
      <div className='flex-col items-center max-w-fit ml-2'>
        <CloseButton onClick={props.closeModal}/>
      </div>
    </div>
  );
}
