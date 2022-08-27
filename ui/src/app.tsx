import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Subscribe } from './api/Subscribe';
import { ContactList } from './components/ContactList';
import { ModalContext, AppContextType } from './context/ModalContext';
import { Contacts } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';
import Modal from './components/Modal';

const urbit = new Urbit('', '', '');
urbit.ship = window.ship;

async function scryContacts(): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

export function App() {
  const [contacts, setContacts] = useState<Contacts>();
  const [selectedContact, setSelectedContact] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>();

  useEffect(() => {
    scryContacts()
      .then(res => setContacts(res))
      .then(() => Subscribe(handleUpdate));
  }, []);

  function handleUpdate(update: GallUpdate) {
    if (update.app === 'whom' && update.data) {
      setContacts({
        urbitContacts: update.data.urbitContacts,
        earthContacts: update.data.earthContacts
      });
    }
  };

  const modalContext: AppContextType = {
    contacts: contacts || null,
    selectedContact: selectedContact || null,
    selectContact: (key) => setSelectedContact(key),
    isOpen: modalOpen || false,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false)
  };

  return (
    <main className="fixed w-full h-full bg-standard flex">
      <ModalContext.Provider value={modalContext} >
        <div className="h-full w-full mx-auto flex flex-col p-4 overflow-hidden">
          <h1 className="text-center text-3xl font-bold pb-4">Contacts</h1>
          {contacts && <ContactList/>}
        </div>
        <Modal/>
      </ModalContext.Provider>
    </main>
  );
}
