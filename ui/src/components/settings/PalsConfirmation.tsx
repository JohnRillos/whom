import React, { useContext, useEffect, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import { syncPals } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { scryPals } from '../../api/Scry';

export default function PalsConfirmation(props: { onConfirm: () => void }): JSX.Element {
  const { api, contacts, displayError } = useContext(AppContext);
  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ pals, setPals ] = useState<string[]>();

  useEffect(() => {
    scryPals(api).then(res => setPals(Object.keys(res.outgoing)))
  }, []);

  function onError(error: string | null) {
    setSubmitting(false);
    displayError('Error enabling %pals sync! ' + error || '');
  }

  const importedPalCount = pals?.filter(pal => ('~' + pal) in contacts).length || 0;
  const unimportedPalCount = pals == undefined ? undefined : pals.length - importedPalCount;

  return (
    <div className='flex flex-col space-y-2 w-fit max-w-sm'>
      <p>
        All of your pals will be imported as contacts, including any new pals you add later. You can disable this setting at any time.
      </p>
      <p className={(importedPalCount > 0) ? '' : 'hidden'}>
        {importedPalCount} of your pals are already in your contacts.
      </p>
      <p className={unimportedPalCount !== undefined ? '' : 'hidden'}>
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