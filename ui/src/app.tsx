import React, { useEffect, useState } from 'react';
import { Subscribe } from './api/Subscribe';
import { ContactList } from './components/ContactList';
import Modal from './components/Modal';
import ContactDetail from './components/contactDetail/ContactDetail';
import { AppContext, AppContextType, initialContext } from './context/AppContext';
import AddContactForm from './components/AddContactForm';
import { buildFieldSettings } from './util/FieldUtil';
import SettingsButton from './components/buttons/SettingsButton';
import SettingsView from './components/settings/SettingsView';
import ErrorNotification from './components/ErrorNotification';
import ProfileButton from './components/buttons/ProfileButton';
import ProfileContainer from './components/profile/ProfileContainer';
import { Contacts } from './types/ContactTypes';
import { GallUpdate, SubscribePath } from './types/GallTypes';
import { Self } from './types/ProfileTypes';
import { FieldSettings } from './types/SettingTypes';
import { PalsInfo } from './types/PalsTypes';
import PalView from './components/pals/PalView';
import { ContactStoreProfile } from './types/ContactStoreTypes';

export function App() {
  const [contacts, setContacts] = useState<Contacts>({});
  const [selectedContactKey, setSelectedContact] = useState<string>();
  const [isAddContactModalOpen, setAddContactModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>();
  const [editContactMode, setEditContactMode] = useState<boolean>(false);
  const [fieldSettings, setFieldSettings] = useState<FieldSettings>(initialContext.fieldSettings);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [self, setSelf] = useState<Self>(initialContext.self);
  const [palsSyncEnabled, setPalsSyncEnabled] = useState<boolean>(false);
  const [palsInfo, setPalsInfo] = useState<PalsInfo>(initialContext.palsInfo);
  const [isPalModalOpen, setPalModalOpen] = useState<boolean>(false);
  const [rolodex, setRolodex] = useState<Record<string, ContactStoreProfile>>({});

  useEffect(() => {
   Subscribe(initialContext.api, handleUpdate);
  }, []);

  function handleUpdate(update: GallUpdate) {
    if (update.app == 'contact-store') {
      setRolodex(update.data['contact-update'].initial.rolodex);
    }
    if (update.app != 'whom') {
      return;
    }
    switch(update.path) {
      case SubscribePath.Contacts: {
        setContacts(update.data);
        break;
      }
      case SubscribePath.Fields: {
        setFieldSettings(buildFieldSettings(update.data));
        break;
      }
      case SubscribePath.Self: {
        setSelf(update.data);
        break;
      }
      case SubscribePath.ImportPals: {
        setPalsSyncEnabled(update.data);
        break;
      }
      case SubscribePath.Pals: {
        setPalsInfo(update.data);
        break
      }
    }
  };

  const appContext: AppContextType = {
    api: initialContext.api,
    errorMessage: errorMessage,
    displayError: setErrorMessage,
    dismissError: () => setErrorMessage(null),
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
    self: self,
    palsSyncEnabled: palsSyncEnabled,
    palsInfo: palsInfo,
    setPalsInfo: setPalsInfo,
    setPalModalOpen: setPalModalOpen,
    rolodex: rolodex
  };

  return (
    <main className="fixed w-full h-full bg-standard flex">
      <AppContext.Provider value={appContext} >
        <div className="h-full w-full mx-auto flex flex-col overflow-hidden">
          <nav className="flex-shrink w-full flex flex-row p-4">
            <SettingsButton
              onClick={() => setSettingsModalOpen(true)}
            />
            <h1 className="m-auto text-center text-3xl font-bold">Contacts</h1>
            <ProfileButton onClick={() => setProfileOpen(true)}/>
          </nav>
          <ContactList/>
        </div>
        <button
          className='absolute bottom-8 right-4 px-1 py-1 rounded-3xl border-2 text-lg button-secondary hover:button-primary shadow-md'
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
        <Modal isOpen={isPalModalOpen} closeModal={() => setPalModalOpen(false)}>
          <PalView closeModal={() => setPalModalOpen(false)}/>
        </Modal>
        <ProfileContainer isOpen={isProfileOpen} close={() => setProfileOpen(false)}/>
        <ErrorNotification/>
      </AppContext.Provider>
    </main>
  );
}
