import React, { useContext, useState } from 'react';
import { deleteField } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { FieldDef } from '../../types/SettingTypes';
import CloseButton from '../buttons/CloseButton';
import DeleteButton from '../buttons/DeleteButton';
import AddFieldForm from './AddFieldForm';

export default function SettingsView(props: { closeModal: () => void }) {
  const { api, displayError, fieldSettings } = useContext(AppContext);
  let [ addFieldMode, setAddFieldMode ] = useState<boolean>(false);
  let [ isDeleting, setDeleting ] = useState<boolean>(false);

  function renderFieldDef(def: FieldDef) {
    return (
      <div className='flex space-x-4 py-0.5' key={def.key}>
        <span className='flex-grow'>{def.name}</span>
        <span className='font-mono opacity-50'>%{def.key}</span>
        <DeleteButton
          title='Delete Field'
          onClick={() => onDeleteClick(def.key)}
          disabled={isDeleting}
        />
      </div>
    );
  }

  function onDeleteClick(key: string) {
    setDeleting(true);
    deleteField(api, key, onDeleteError, () => setDeleting(false))
  }

  function onDeleteError(error: string | null) {
    displayError(error || 'Error creating field!');
    setDeleting(false);
  }

  function renderAddFieldForm(): JSX.Element {
    return <AddFieldForm closeForm={() => setAddFieldMode(false)}/>;
  }

  function renderFieldDefs(): JSX.Element {
    return (
      <div className='flex-col'>
        <p className='mb-2 text-center'>
          <strong>Contact Fields</strong>
        </p>
        <div className='divide-y divide-gray-400/50'>
          {fieldSettings.order.map(key => fieldSettings.defs[key]).map(renderFieldDef)}
        </div>
        { addFieldMode ? renderAddFieldForm() :
          <button
            className={'px-1 py-0.5 mt-2 rounded-md button-secondary hover:button-primary'}
            onClick={() => setAddFieldMode(true)}
          >
            New Field
          </button>
        }
      </div>
    );
  }

  return (
    <div className='flex text-left h-fit'>
      {renderFieldDefs()}
      <div className='flex-col items-center max-w-fit ml-2'>
        <CloseButton onClick={props.closeModal}/>
      </div>
    </div>
  );
}
