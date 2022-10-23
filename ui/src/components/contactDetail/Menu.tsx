import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { deleteContact } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import CloseButton from '../buttons/CloseButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import { scryPals } from '../../api/Scry';
import MutualButton from '../buttons/pals/MutualButton';
import TargetButton from '../buttons/pals/TargetButton';
import LeecheButton from '../buttons/pals/LeecheButton';
import AddPalButton from '../buttons/pals/AddPalButton';

export default function Menu() {
  const {
    api,
    closeModal,
    displayError,
    selectedContactKey,
    editContactMode,
    setEditContactMode,
    palsInfo,
    setPalsInfo,
    setPalModalOpen,
  } = useContext(AppContext);

  useEffect(() => {
    scryPals(api).then(setPalsInfo);
  }, [ selectedContactKey ]);

  function onDeleteError(error: string | null) {
    displayError(error || 'Error deleting contact!');
  }

  function renderPalsButton(): JSX.Element | null {
    if (!palsInfo.running || !selectedContactKey) {
      return null;
    }
    if (selectedContactKey[0] !== '~') {
      return null;
    }
    const pal = palsInfo.pals[selectedContactKey];
    if (!pal) {
      return <AddPalButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
    }
    if (pal.mutual) {
      return <MutualButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
    }
    if (pal.target) {
      return <TargetButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
    }
    if (pal.leeche) {
      return <LeecheButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
    }
    return null;
  }

  return (
    <div className='flex flex-col items-center w-full max-w-fit ml-2 space-y-1'>
      <CloseButton onClick={closeModal}/>
      <EditButton onClick={() => setEditContactMode(true)} disabled={editContactMode}/>
      <DeleteButton
        title='Delete Contact'
        onClick={() => {
          closeModal();
          deleteContact(api, selectedContactKey!!, onDeleteError);
        }}
        disabled={editContactMode}/>
      {renderPalsButton()}
    </div>
  );
}
