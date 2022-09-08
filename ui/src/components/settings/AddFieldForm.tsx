import React, { useContext, useState } from 'react';
import { addCustomField } from '../../api/ContactPokes';
import { AppContext } from '../../context/AppContext';
import { FieldTypeTag } from '../../types/SettingTypes';
import SelectInput from '../input/SelectInput';
import TextInput from '../input/TextInput';

export default function AddFieldForm(props: { closeForm: () => void }) {
  const { api } = useContext(AppContext);
  let [ key, setKey ] = useState<string>('');
  let [ name, setName ] = useState<string>('');
  let [ type, setType ] = useState<FieldTypeTag>('text');

  function onSubmit() {
    addCustomField(api, {
      key: key!,
      name: name!,
      type: type!,
      custom: true
    }, onError)
  }

  function onError(error: any) {
    console.error(error);
  }

  function canSubmit(): boolean {
    return !!key && !!name;
  }

  function buttonColorClassName(): string {
    if (!canSubmit()) {
      return 'opacity-50';
    }
    return 'hover:bg-blue-500 hover:border-blue-500';
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
      <button
        className={`px-1 py-0.5 mt-2 rounded-md button-primary ${buttonColorClassName()}`}
        onClick={onSubmit}
        disabled={!canSubmit()}
      >
        Submit
      </button>
    </div>
  );
}
