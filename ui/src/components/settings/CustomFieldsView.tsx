import React, { useContext, useState } from 'react';
import { deleteField } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import { FieldDefWithKey } from '../../types/SettingTypes';
import DeleteButton from '../buttons/DeleteButton';
import AddFieldForm from './AddFieldForm';

export default function CustomFieldsView() {
  const { api, displayError, fieldSettings } = useContext(AppContext);
  const [ addFieldMode, setAddFieldMode ] = useState<boolean>(false);
  const [ isDeleting, setDeleting ] = useState<boolean>(false);

  function renderFieldDef(def: FieldDefWithKey) {
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
    displayError(error || 'Error deleting field!');
    setDeleting(false);
  }

  function renderAddFieldForm(): JSX.Element {
    return <AddFieldForm closeForm={() => setAddFieldMode(false)}/>;
  }

  return (
    <div className='flex-col'>
      <h1 className='mb-2 text-center font-bold'>
        Customize Fields
      </h1>
      <div className='divide-y divide-gray-400/50'>
        {fieldSettings.order.map(key => fieldSettings.defs[key]!).map(renderFieldDef)}
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
