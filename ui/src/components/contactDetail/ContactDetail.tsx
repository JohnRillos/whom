import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { InfoValue, InfoDate, ContactWithKey, InfoFields, InfoLook, InfoTint } from '../../types/ContactTypes';
import { getContactWithKey, getDisplayName } from '../../util/ContactUtil';
import { combineFieldOrders } from '../../util/FieldUtil';
import EditForm from './EditForm';
import DateField from '../fields/DateField';
import TextField from '../fields/TextField';
import Menu from './Menu';
import { FieldDef } from '../../types/SettingTypes';
import { AccessLevel, ProfileField, ProfileFields } from '../../types/ProfileTypes';
import LockIcon from '../icons/LockIcon';

export default function ContactDetail(): JSX.Element {
  const { contacts, selectedContactKey, editContactMode, fieldSettings } = useContext(AppContext);
  if (!selectedContactKey) {
    return <p>Error</p>;
  }
  const contact = getContactWithKey(contacts, selectedContactKey);
  if (!contact) {
    return <p>Error</p>;
  }

  const profileFieldDefs = contact.profile?.fields || {};
  const profileFieldOrder = Object.keys(profileFieldDefs).sort();
  const fieldOrder = combineFieldOrders(fieldSettings.order, profileFieldOrder);

  function renderShipName(contact: ContactWithKey) {
    if (!contact.ship) {
      return null;
    }
    return <TextField label='Urbit' value={contact.ship}/>
  }

  function renderInfoField(key: string, val: InfoValue | undefined, fieldDef: FieldDef) {
    const label = fieldDef.name || key;
    switch (fieldDef.type) {
      case 'text':
        return <TextField label={label} value={val as string | undefined}/>;
      case 'date':
        return <DateField label={label} value={val as InfoDate | undefined}/>;
      case 'look':
        return <TextField label={label} value={(val as InfoLook | undefined)?.look}/>;
      case 'tint': {
        const tint = (val as InfoTint | undefined)?.tint;
        return <TextField label={label} value={tint ? '#' + tint : undefined}/>;
      }
      default:
        return <span>{JSON.stringify(val)}</span>;
    }
  }

  function renderAccessLevel(accessLevel: AccessLevel | undefined) {
    return (
      <div className='-ml-1 mr-1'>
        {
          accessLevel == 'mutual'
          ? <LockIcon title='Private'/>
          : <div className='w-5'/>
        }
      </div>
    );
  }

  function renderInfoFields(info: InfoFields, defs: Record<string, FieldDef>) {
    return (
      <ul>
        {fieldOrder.filter(key => fieldSettings.defs[key]?.type !== 'coll')
        .map((key: string) => ({
          key: key,
          value: info[key],
        }))
        .filter((arg: { key: string, value: InfoValue | undefined}) => arg.value !== undefined)
        .map((arg: {key: string, value: InfoValue | undefined}) => (
          <li key={arg.key}>
            {renderInfoField(arg.key, arg.value, defs[arg.key]!)}
          </li>
        ))}
      </ul>
    );
  }

  function renderProfileFields(info: ProfileFields, defs: Record<string, FieldDef>) {
    const allPublic = !Object.values(info).find(field => field.access == 'mutual');
    return (
      <ul>
        {fieldOrder.filter(key => fieldSettings.defs[key]?.type !== 'coll')
        .map((key: string) => ({
          key: key,
          value: info[key],
        }))
        .filter((arg: { key: string, value: ProfileField | undefined}) => arg.value !== undefined)
        .map((arg: {key: string, value: ProfileField | undefined}) => (
          <li key={arg.key} className='flex'>
            {allPublic ? null : renderAccessLevel(arg.value?.access)}
            {renderInfoField(arg.key, arg.value?.value, defs[arg.key]!)}
          </li>
        ))}
      </ul>
    );
  }

  function renderProfile(contact: ContactWithKey) {
    if (!contact.profile || Object.keys(contact.profile.info).length == 0) {
      return null;
    }
    return (
      <div className='mt-2 pt-2 text-center'>
        <strong>Profile</strong>
        {renderProfileFields(contact.profile.info, profileFieldDefs)}
      </div>
    );
  }

  function renderContact(contact: ContactWithKey) {
    return (
      <div className='text-left h-fit'>
        <p className='mb-2 text-center'>
          <strong>{getDisplayName(contact)}</strong>
        </p>
        {renderShipName(contact)}
        <div className='divide-y divide-gray-400/50'>
          {renderInfoFields(contact.info, fieldSettings.defs )}
          {renderProfile(contact)}
        </div>
      </div>
    );
  }

  return (
    <div className='flex'>
      {editContactMode ? <EditForm contact={contact}/> : renderContact(contact)}
      <Menu/>
    </div>
  );
}
