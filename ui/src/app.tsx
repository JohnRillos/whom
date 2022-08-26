import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Subscribe } from './api/Subscribe';
import { ContactList } from './components/ContactList';
import { Contacts } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';

const urbit = new Urbit('', '', '');
urbit.ship = window.ship;

async function scryContacts(): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

export function App() {
  const [contacts, setContacts] = useState<Contacts>();

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

  return (
    <main className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-black text-black dark:text-gray-200">
      <div className="max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Contacts</h1>
        {contacts && <ContactList contacts={contacts}/>}
      </div>
    </main>
  );
}
