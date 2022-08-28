import React from 'react';
import Urbit from '@urbit/http-api';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CloseButton from '../buttons/CloseButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';

const deleteContact = (api: Urbit, contactKey: string) => {
  api.poke({
    app: 'whom',
    mark: 'whom-action',
    json: {
      'del-contact': {
        key: contactKey,
      }
    }
  });
}

export default function Menu() {
  const { api, closeModal, selectedContactKey, editContactMode, setEditContactMode } = useContext(AppContext);
  return (
    <div className='flex flex-col items-center w-full max-w-fit ml-2 space-y-1'>
      <CloseButton onClick={closeModal}/>
      <EditButton onClick={() => setEditContactMode(true)} disabled={editContactMode}/>
      <DeleteButton onClick={() => {
        closeModal();
        deleteContact(api, selectedContactKey!!);
      }} disabled={editContactMode}/>
    </div>
  );
}
