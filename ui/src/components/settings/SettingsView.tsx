import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FieldDef } from '../../types/SettingTypes';
import CloseButton from '../buttons/CloseButton';
import AddFieldForm from './AddFieldForm';

export default function SettingsView(props: { closeModal: () => void }) {
  const { fieldSettings } = useContext(AppContext);
  let [ addFieldMode, setAddFieldMode ] = useState<boolean>(false);

  function renderCustomField(def: FieldDef) {
    return (
      <div className='flex space-x-4 py-0.5' key={def.key}>
        <span className='flex-grow'>{def.name}</span>
        <span className='font-mono opacity-50'>%{def.key}</span>
      </div>
    );
  }

  function renderAddFieldForm(): JSX.Element {
    return <AddFieldForm closeForm={() => setAddFieldMode(false)}/>;
  }

  function renderCustomFields(): JSX.Element {
    return (
      <div className='flex-col'>
        <p className='mb-2 text-center'>
          <strong>Custom Contact Fields</strong>
        </p>
        <div className='divide-y divide-gray-400/50'>
          {fieldSettings.order.map(key => fieldSettings.defs[key])
            .filter(def => def.custom)
            .map(renderCustomField)}
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
      {renderCustomFields()}
      <div className='flex-col items-center max-w-fit ml-2'>
        <CloseButton onClick={props.closeModal}/>
      </div>
    </div>
  );
}
