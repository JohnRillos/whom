import React, { useContext, useState } from 'react';
import { syncPals } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import BackButton from '../buttons/BackButton';
import ChevronButton from '../buttons/ChevronButton';
import CloseButton from '../buttons/CloseButton';
import Toggle from '../input/Toggle';
import CustomFieldsView from './CustomFieldsView';
import PalsConfirmation from './PalsConfirmation';

enum Mode {
  OVERVIEW, FIELDS, PALS_CONFIRM
}

export default function SettingsView(props: { closeModal: () => void }): JSX.Element {
  const { api, displayError, palsSyncEnabled } = useContext(AppContext);
  let [ mode, setMode ] = useState<Mode>(Mode.OVERVIEW);
  let [ submitting, setSubmitting ] = useState<boolean>(false);

  function renderContent(): JSX.Element {
    switch(mode) {
      case Mode.OVERVIEW: return renderOverview();
      case Mode.FIELDS: return <CustomFieldsView/>;
      case Mode.PALS_CONFIRM: return <PalsConfirmation onConfirm={() => setMode(Mode.OVERVIEW)}/>;
    }
  }

  function renderOverview(): JSX.Element {
    return (
      <div>
        <h1 className='mb-2 text-center font-bold'>
          Settings
        </h1>
        <div className='flex flex-col divide-y divide-gray-400/50 text-left'>
          <Toggle label='Import my %pals'
            checked={palsSyncEnabled}
            onChange={handleSyncToggle}
            disabled={submitting}
          />
          <ChevronButton label='Customize fields'
            onClick={() => setMode(Mode.FIELDS)}
          />
        </div>
      </div>
    );
  }

  function handleSyncToggle() {
    if (palsSyncEnabled) {
      setSubmitting(true);
      syncPals(
        api,
        false,
        error => {
          setSubmitting(false);
          displayError('Error enabling %pals sync! ' + error || '');
        },
        () => setSubmitting(false)
      );
    } else {
      setMode(Mode.PALS_CONFIRM);
    }
  }

  return (
    <div className='flex h-fit'>
      <div className={`clear-both -mt-1 -ml-1 ${mode == Mode.OVERVIEW ? 'hidden' : ''}`}>
        <BackButton onClick={() => setMode(Mode.OVERVIEW)}/>
      </div>
      {renderContent()}
      <div className='flex-col items-center max-w-fit ml-2'>
        <CloseButton onClick={props.closeModal}/>
      </div>
    </div>
  );
}
