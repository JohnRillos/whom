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
import { buildFieldSettings } from './util/FieldUtil';
import { FieldDef, FieldSettings } from './types/SettingTypes';
import SettingsButton from './components/buttons/SettingsButton';
import SettingsView from './components/settings/SettingsView';

async function scryContacts(urbit: Urbit): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts' });
}

async function scryFieldDefs(urbit: Urbit): Promise<FieldDef[]> {
  return urbit.scry<FieldDef[]>({ app: 'whom', path: '/settings/fields' });
}

export function App() {
  const [contacts, setContacts] = useState<Contacts>({});
  const [selectedContactKey, setSelectedContact] = useState<string>();
  const [isAddContactModalOpen, setAddContactModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>();
  const [editContactMode, setEditContactMode] = useState<boolean>(false);
  const [fieldSettings, setFieldSettings] = useState<FieldSettings>(initialContext.fieldSettings);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const api = initialContext.api
    scryFieldDefs(api)
      .then(res => {
        setFieldSettings(buildFieldSettings(res))
      })
      .then(() => scryContacts(api))
      .then(res => setContacts(res))
      .then(() => Subscribe(api, handleUpdate));
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
    setEditContactMode: setEditContactMode,
    fieldSettings: fieldSettings,
  };

  return (
    <main className="fixed w-full h-full bg-standard flex">
      <AppContext.Provider value={appContext} >
        <div className="h-full w-full mx-auto flex flex-col overflow-hidden">
          <div className='absolute m-4'>
            <SettingsButton
              onClick={() => setSettingsModalOpen(true)}
              disabled={false}
            />
          </div>
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
        <Modal isOpen={isSettingsModalOpen} closeModal={() => setSettingsModalOpen(false)}>
          <SettingsView closeModal={() => setSettingsModalOpen(false)}/>
        </Modal>
      </AppContext.Provider>
    </main>
  );
}
