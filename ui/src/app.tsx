import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Subscribe } from './api/Subscribe';
import { ContactList } from './components/ContactList';
import Modal from './components/Modal';
import ContactDetail from './components/contactDetail/ContactDetail';
import { AppContext, AppContextType, initialContext } from './context/AppContext';
import { Contacts } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';
import { initialContacts } from './util/ContactUtil';

async function scryContacts(urbit: Urbit): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

export function App() {
  const [contacts, setContacts] = useState<Contacts>(initialContacts);
  const [selectedContactKey, setSelectedContact] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>();
  const [editContactMode, setEditContactMode] = useState<boolean>(false);

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
    contacts: contacts,
    selectedContactKey: selectedContactKey || null,
    selectContact: (key) => setSelectedContact(key),
    isModalOpen: modalOpen || false,
    openModal: () => {
      setEditContactMode(false);
      setModalOpen(true);
    },
    closeModal: () => {
      setModalOpen(false);
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
        <Modal>
          <ContactDetail/>
        </Modal>
      </AppContext.Provider>
    </main>
  );
}
