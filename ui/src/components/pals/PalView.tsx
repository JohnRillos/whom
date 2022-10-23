import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Pal } from '../../types/PalsTypes';
import { getContactWithKey, getDisplayName } from '../../util/ContactUtil';
import CloseButton from '../buttons/CloseButton';
import DangerButton from '../buttons/DangerButton';
import SubmitButton from '../buttons/SubmitButton';

enum Status {
  TARGET, LEECHE, MUTUAL
}

export default function PalView(props: { closeModal: () => void }): JSX.Element | null {
  const { api, contacts, palsInfo, selectedContactKey } = useContext(AppContext);
  let [ submitting, setSubmitting ] = useState<boolean>(false);
  if (!selectedContactKey) {
    return null;
  }
  const contact = getContactWithKey(contacts, selectedContactKey);
  if (!contact) {
    return null;
  }

  function addToPals() {
    // todo
  }

  function removeFromPals() {
    // todo
  }

  const name = getDisplayName(contact);
  const pal = palsInfo.pals[selectedContactKey]
  const status = getStatus();

  function getStatus(): Status | null {
    if (!pal) return null;
    if (pal.mutual) return Status.MUTUAL;
    if (pal.target) return Status.TARGET;
    if (pal.leeche) return Status.LEECHE;
    return null;
  }

  function renderStatus(): JSX.Element | null {
    let text: string;
    let color: string;
    switch (status) {
      case Status.MUTUAL:
        text = 'mutual';
        color = 'bg-green-500';
        break;
      case Status.TARGET:
        text = 'outgoing';
        color = 'bg-blue-500';
        break;
      case Status.LEECHE:
        text = 'incoming';
        color = 'bg-amber-400';
        break;
      default:
        return null;
    }
    return <p>Status: <span className={`${color} text-white px-2 py-0.5 rounded-full`}>{text}</span></p>
  }

  function getDescription(): string {
    switch (status) {
      case Status.MUTUAL:
        return 'You are mutual pals.';
      case Status.TARGET:
        return 'You\'ve sent them a pal request. If they accept, you\'ll be mutual pals.';
      case Status.LEECHE:
        return 'They sent you a pal request. If you accept, you\'ll be mutual pals.';
      default:
        return `Add ${name} as a pal?`;
    }
  }

  function addToPalsButton(): JSX.Element | null {
    if (pal) {
      return null;
    }
    return (
      <SubmitButton onClick={addToPals} disabled={submitting}>
        Send pal request
      </SubmitButton>
    );
  }

  function acceptButton(): JSX.Element | null {
    if (status != Status.LEECHE) {
      return null;
    }
    return (
      <SubmitButton onClick={addToPals} disabled={submitting}>
        Accept pal request
      </SubmitButton>
    );
  }

  function removeButton(): JSX.Element | null {
    if (status == Status.MUTUAL) {
      return (
        <DangerButton onClick={removeFromPals} disabled={submitting}>
          Remove as pal
        </DangerButton>
      );
    }
    if (status == Status.TARGET) {
      return (
        <DangerButton onClick={removeFromPals} disabled={submitting}>
          Cancel pal request
        </DangerButton>
      );
    }
    return null;
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
          {addToPalsButton()}
          {acceptButton()}
          {removeButton()}
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
