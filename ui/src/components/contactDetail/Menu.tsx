import React from 'react';
import { useContext } from 'react';
import { deleteContact } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import CloseButton from '../buttons/CloseButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';

export default function Menu() {
  const { api, closeModal, displayError, selectedContactKey, editContactMode, setEditContactMode } = useContext(AppContext);

  function onDeleteError(error: string | null) {
    displayError(error || 'Error deleting contact!');
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
    </div>
  );
}
