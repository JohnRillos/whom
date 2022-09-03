import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Subscribe } from './api/Subscribe';
import { ContactList } from './components/ContactList';
import Modal from './components/Modal';
import ContactDetail from './components/contactDetail/ContactDetail';
import { AppContext, AppContextType, initialContext } from './context/AppContext';
import { Contacts } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';
import AddContactForm from './components/AddContactForm';

async function scryContacts(urbit: Urbit): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

export function App() {
  const [contacts, setContacts] = useState<Contacts>({});
  const [selectedContactKey, setSelectedContact] = useState<string>();
  const [isAddContactModalOpen, setAddContactModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>();
  const [editContactMode, setEditContactMode] = useState<boolean>(false);

  useEffect(() => {
    scryContacts(initialContext.api)
      .then(res => setContacts(res))
      .then(() => Subscribe(initialContext.api, handleUpdate));
  }, []);

  function handleUpdate(update: GallUpdate) {
    if (update.app === 'whom' && update.data) {
      setContacts(update.data.contacts);
    }
  };

  const appContext: AppContextType = {
    api: initialContext.api,
    contacts: contacts,
    selectedContactKey: selectedContactKey || null,
    selectContact: (key) => setSelectedContact(key),
    closeAddContactModal: () => setAddContactModalOpen(false),
    isModalOpen: isDetailModalOpen || false,
    openModal: () => {
      setEditContactMode(false);
      setDetailModalOpen(true);
    },
    closeModal: () => {
      setDetailModalOpen(false);
      setTimeout(() => setEditContactMode(false), 300);
    },
    editContactMode: editContactMode,
    setEditContactMode: setEditContactMode
  };

  return (
    <main className="fixed w-full h-full bg-standard flex">
      <AppContext.Provider value={appContext} >
        <div className="h-full w-full mx-auto flex flex-col overflow-hidden">
          <h1 className="text-center text-3xl font-bold py-4">Contacts</h1>
          <ContactList/>
        </div>
        <button
          className='absolute bottom-8 right-8 px-1 py-1 rounded-3xl border-2 text-lg button-secondary hover:button-primary shadow-md'
          onClick={() => setAddContactModalOpen(true)}
          >
          Add Contact
        </button>
        <Modal isOpen={isAddContactModalOpen} closeModal={() => setAddContactModalOpen(false)}>
          <AddContactForm/>
        </Modal>
        <Modal isOpen={appContext.isModalOpen} closeModal={appContext.closeModal}>
          <ContactDetail/>
        </Modal>
      </AppContext.Provider>
    </main>
  );
}
