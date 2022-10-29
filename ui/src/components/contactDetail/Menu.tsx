import React from 'react';
import { useContext } from 'react';
import { deleteContact } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import { PalStatus } from '../../types/PalsTypes';
import CloseButton from '../buttons/CloseButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
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
    setPalModalOpen,
  } = useContext(AppContext);

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
    switch (pal?.status) {
      case PalStatus.MUTUAL:
        return <MutualButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
      case PalStatus.TARGET:
        return <TargetButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
      case PalStatus.LEECHE:
        return <LeecheButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
      default:
        return <AddPalButton onClick={() => setPalModalOpen(true)} disabled={editContactMode}/>;
    }
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
