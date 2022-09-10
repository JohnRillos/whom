import React, { useContext, useState } from 'react';
import { addField } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { FieldTypeTag } from '../../types/SettingTypes';
import SubmitButton from '../buttons/SubmitButton';
import SelectInput from '../input/SelectInput';
import TextInput from '../input/TextInput';

export default function AddFieldForm(props: { closeForm: () => void }) {
  const { api, displayError } = useContext(AppContext);
  let [ key, setKey ] = useState<string>('');
  let [ name, setName ] = useState<string>('');
  let [ type, setType ] = useState<FieldTypeTag>('text');

  function onSubmit() {
    addField(api, {
      key: key!,
      name: name!,
      type: type!,
    }, onError)
    props.closeForm();
  }

  function onError(error: string | null) {
    displayError(error || 'Error creating field!');
  }

  function canSubmit(): boolean {
    return !!key && !!name;
  }

  return (
    <div className='mt-2 max-w-xs'>
      <p className='mb-2 text-center'>
        <strong>New Field</strong>
      </p>
      <TextInput
        label={'Display Name'}
        value={name}
        onChange={setName}
        placeholder={'Field Name'}
      />
      <div className='flex flex-row space-x-2'>
        <div className='flex-1'>
          <TextInput
            label={'Key'}
            value={key}
            onChange={setKey}
            pattern={/^[a-z]([a-z0-9-]*)?$/}
            placeholder={'field-name'}
          />
        </div>
        <div className='flex-1'>
          <SelectInput
            label={'Type'}
            value={type}
            options={[
              { value: 'text', display: 'text' },
              { value: 'date', display: 'date' },
            ]}
            onChange={(val) => setType(val as FieldTypeTag)}
          />
        </div>
      </div>
      <SubmitButton
        className='mt-2 mr-2'
        onClick={onSubmit}
        disabled={!canSubmit()}
      >
        Submit
      </SubmitButton>
      <button
        type='button'
        className='px-1 py-0.5 rounded-md button-secondary hover:bg-neutral-500/20'
        onClick={props.closeForm}>
        Cancel
      </button>
    </div>
  );
}
