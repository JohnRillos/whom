import React, { useContext, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import { syncPals } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import { PalStatus } from '../../types/PalsTypes';

export default function PalsConfirmation(props: { onConfirm: () => void }): JSX.Element {
  const { api, contacts, displayError, palsInfo } = useContext(AppContext);
  const [ submitting, setSubmitting ] = useState<boolean>(false);

  function onError(error: string | null) {
    setSubmitting(false);
    displayError('Error enabling %pals sync! ' + error || '');
  }

  const pals: string[] = Object.entries(palsInfo.pals)
    .filter(([, pal]) => pal.status == PalStatus.TARGET)
    .map(([ship, ]) => ship);
  const importedPalCount = pals.filter(pal => pal in contacts).length;
  const unimportedPalCount = pals.length - importedPalCount;

  const palsInstallLink = (
    <a className='font-mono text-blue-500' href='web+urbitgraph://~paldev/pals'>
      ~paldev/pals 
    </a>
  );

  return (
    <div className='flex flex-col space-y-2 w-fit max-w-sm'>
      <p className={palsInfo.running ? 'hidden' : ''}>
        You don&apos;t have the %pals app installed!
        Install {palsInstallLink} to manage your friends list.
      </p>
      <p className={palsInfo.running ? 'hidden' : ''}>
        If you enable pals import now,
        it will take effect when you install %pals later.
      </p>
      <p>
        All of your pals will be imported as contacts, 
        including any new pals you add later. 
        You can disable this setting at any time.
      </p>
      <p className={(importedPalCount > 0) ? '' : 'hidden'}>
        {importedPalCount} of your pals are already in your contacts.
      </p>
      <p>
        This process will create {unimportedPalCount} new contacts immediately.
      </p>
      <div className='space-x-2'>
        <SubmitButton
          onClick={() => {
            setSubmitting(true);
            syncPals(api, true, onError, props.onConfirm);
          }}
          disabled={submitting}>
          Enable pals import
        </SubmitButton>
      </div>
    </div>
  );
}