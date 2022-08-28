import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Subscribe } from './api/Subscribe';
import { ContactList } from './components/ContactList';
import { AppContext, AppContextType, initialContext } from './context/AppContext';
import { Contacts } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';
import Modal from './components/contactModal/Modal';

// const urbit = new Urbit('', '', '');
// urbit.ship = window.ship;

async function scryContacts(urbit: Urbit): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

export function App() {
  const [contacts, setContacts] = useState<Contacts>();
  const [selectedContactKey, setSelectedContact] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>();

  useEffect(() => {
    scryContacts(initialContext.api)
      .then(res => setContacts(res))
      .then(() => Subscribe(initialContext.api, handleUpdate));
  }, []);

  function handleUpdate(update: GallUpdate) {
    if (update.app === 'whom' && update.data) {
      setContacts({
        urbitContacts: update.data.urbitContacts,
        earthContacts: update.data.earthContacts
      });
    }
  };

  const appContext: AppContextType = {
    api: initialContext.api,
    contacts: contacts || null,
    selectedContactKey: selectedContactKey || null,
    selectContact: (key) => setSelectedContact(key),
    isModalOpen: modalOpen || false,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false)
  };

  return (
    <main className="fixed w-full h-full bg-standard flex">
      <AppContext.Provider value={appContext} >
        <div className="h-full w-full mx-auto flex flex-col p-4 overflow-hidden">
          <h1 className="text-center text-3xl font-bold pb-4">Contacts</h1>
          {contacts && <ContactList/>}
        </div>
        <Modal/>
      </AppContext.Provider>
    </main>
  );
}
