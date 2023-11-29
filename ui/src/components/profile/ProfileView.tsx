import React, { useState } from 'react';
import { useContext } from 'react';
import { editSelf } from '../../api/WhomPokes';
import { AppContext } from '../../context/AppContext';
import { InfoValue, InfoDate, InfoLook, InfoTint } from '../../types/ContactTypes';
import { AccessLevel, ProfileField } from '../../types/ProfileTypes';
import BackButton from '../buttons/BackButton';
import SubmitButton from '../buttons/SubmitButton';
import DateInput from '../input/DateInput';
import TextInput from '../input/TextInput';
import isEqual from 'lodash.isequal';
import SelectInput from '../input/SelectInput';
import Modal from '../Modal';
import InfoButton from '../buttons/InfoButton';
import GroupsIcon from '../icons/GroupsIcon';
import TintInput from '../input/TintInput';

const GROUPS_PROFILE_FIELDS = new Set(['bio', 'nickname', 'avatar', 'status', 'color', 'cover', 'groups']);

export default function ProfileView(props: { closeContainer: () => void }): JSX.Element {
  const { api, displayError, fieldSettings, palsInfo, self } = useContext(AppContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [infoFields, setInfoFields] = useState<Record<string, ProfileField | null>>(self.info);
  const [showPrivacyHelp, setShowPrivacyHelp] = useState<boolean>(false);

  function submitChanges() {
    setSubmitting(true);
    editSelf(
      api,
      sanitizeInfo(infoFields),
      onError,
      () => {
        setSubmitting(false);
      }
    );
  }

  function onError(error: string | null) {
    setSubmitting(false);
    displayError(error || 'Error editing profile!');
  }

  function sanitizeInfo(info: Record<string, ProfileField | null>): Record<string, ProfileField | null> {
    return Object.fromEntries(
      Object.entries(info)
      .filter(([key, val]) => {
        if (!val && !(key in self.info)) {
          return false;
        }
        return !isEqual(self.info[key], val);
      })
    );
  }

  function onInfoTextChange(key: string): (arg: string) => void {
    return (value: string) => {
      if (!value) {
        setInfoFields({
          ...infoFields,
          [key]: null
        });
        return;
      }
      const before = infoFields[key];
      const after = {
        value: value,
        access: before ? before.access : 'public'
      };
      setInfoFields({
        ...infoFields,
        [key]: after
      });
    }
  }

  function onInfoDateChange(key: string): (arg: InfoDate | undefined) => void {
    return (value: InfoDate | undefined) => {
      if (!value) {
        setInfoFields({
          ...infoFields,
          [key]: null
        });
        return;
      }
      const before = infoFields[key];
      const after = {
        value: value,
        access: before ? before.access : 'public'
      };
      setInfoFields({
        ...infoFields,
        [key]: after
      });
    }
  }

  function onInfoLookChange(key: string): (arg: string) => void {
    return (value: string) => {
      if (!value || value.length == 0) {
        setInfoFields({
          ...infoFields,
          [key]: null
        });
        return;
      }
      const before = infoFields[key];
      const after = {
        value: { look: value },
        access: before ? before.access : 'public'
      };
      setInfoFields({
        ...infoFields,
        [key]: after
      });
    }
  }

  function onInfoTintChange(key: string): (arg: string | undefined) => void {
    return (value: string | undefined) => {
      if (!value || value.length == 0) {
        setInfoFields({
          ...infoFields,
          [key]: null
        });
        return;
      }
      const before = infoFields[key];
      const after = {
        value: { tint: value },
        access: before ? before.access : 'public'
      };
      setInfoFields({
        ...infoFields,
        [key]: after
      });
    }
  }

  function onAccessChange(key: string): (arg: string) => void {
    return (access: string) => {
      const before = infoFields[key];
      if (!before) {
        return;
      }
      setInfoFields({
        ...infoFields,
        [key]: {
          value: before.value,
          access: access as AccessLevel
        }
      });
    }
  }

  function renderHeaders() {
    return (
      <div className='flex flex-row justify-between opacity-50 border-b border-b-2 border-black dark:border-white'>
        <div>Profile Info</div>
        <div className='flex items-center space-x-1'>
          <span>Privacy</span>
          <InfoButton onClick={() => setShowPrivacyHelp(true)} title='Privacy Help'/>
        </div>
      </div>
    );
  }

  function renderInfoValue(key: string, val: InfoValue | undefined) {
    const label = fieldSettings.defs[key]?.name || key;
    switch (fieldSettings.defs[key]?.type) {
      case 'text':
        return <TextInput label={label} value={val as string | undefined} onChange={onInfoTextChange(key)}/>;
      case 'date':
        return <DateInput label={label} value={val as InfoDate | undefined} onChange={onInfoDateChange(key)}/>;
      case 'look':
        return <TextInput label={label} value={(val as InfoLook | undefined)?.look} onChange={onInfoLookChange(key)}/>;
      case 'tint':
        return <TintInput label={label} value={val as InfoTint | undefined} onChange={onInfoTintChange(key)}/>;
      default:
        return <span>error</span>;
    }
  }

  function renderProfileField(key: string, field: ProfileField | null | undefined) {
    return (
      <div className='flex flex-row space-x-2'>
        <div className='mr-auto'>
          {renderInfoValue(key, field?.value)}
        </div>
        {renderGroupsIcon(key)}
        {renderAccessLevel(key, field?.access)}
      </div>
    );
  }

  function renderGroupsIcon(key: string) {
    if (GROUPS_PROFILE_FIELDS.has(key)) {
      return <div className='py-1'>
        <GroupsIcon title='synced with %groups'/>
      </div>
    }
    return null;
  }

  function renderAccessLevel(key: string, access: AccessLevel | undefined) {
    return (
      <SelectInput className={access ? '' : 'invisible'}
        label={''}
        value={access}
        options={[
          {value: 'public', display: 'Public'},
          {value: 'mutual', display: 'Pals' }]}
        onChange={onAccessChange(key)}
        disabled={!infoFields[key]}
      />
    );
  }

  function renderProfileFields() {
    return (
      <ul>
        {fieldSettings.order
          .filter(key => fieldSettings.defs[key]?.type !== 'coll') // todo
          .map(key => (
            <li key={key}>
              {renderProfileField(key, hasEdits ? infoFields[key] : self.info[key])}
            </li>
        ))}
      </ul>
    );
  }

  const hasEdits: boolean = Object.keys(sanitizeInfo(infoFields)).length > 0;
  const canSubmit: boolean = !submitting && hasEdits;

  function resetChanges() {
    setInfoFields(self.info);
  }

  function renderProfile() {
    return (
      <div className='text-left h-fit'>
        <h2 className='text-center mb-2 font-bold text-2xl'>~{window.ship}</h2>
        {renderHeaders()}
        {renderProfileFields()}
        <div className='mt-2 space-x-2'>
          <SubmitButton
            className='font-bold'
            onClick={submitChanges}
            disabled={!canSubmit}
          >
            Publish
          </SubmitButton>
          {canSubmit ?
            <button
              type='button'
              className='px-1 py-0.5 rounded-md button-secondary font-bold hover:bg-neutral-500/20'
              onClick={resetChanges}
            >
              Cancel
            </button> : null
          }
        </div>
      </div>
    );
  }

  function renderPrivacyHelp() {
    let palsBlurb;
    if (palsInfo.running) {
      palsBlurb = null;
    } else {
      const palsInstallLink = (
        <a className='font-mono text-blue-500' href='web+urbitgraph://~paldev/pals'>
          ~paldev/pals 
        </a>
      );
      // todo: better link to install
      palsBlurb = (
        <div className='mt-2'>
          You don&apos;t have the %pals app installed!
          <br/>
          Install {palsInstallLink} to let your pals see more info about you.
        </div>
      );
    }
    return (
      <div className='text-sm space-y-2'>
        <div>
          <b>Public:</b> can be seen by anybody
          <br/>
          <b>Pals:</b> can be seen by your pals (mutuals)
          {palsBlurb}
        </div>
        <div>
          Some fields like <b>Nickname</b> and <b>Bio</b> are
          synced with your <b>%groups</b> profile.
        </div>
      </div>
    );
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <nav className='flex-shrink w-full flex flex-row p-4'>
        <div className='fixed'>
          <BackButton label='Contacts' onClick={props.closeContainer}/>
        </div>
        <h1 className='m-auto text-center text-3xl font-bold'>Profile</h1>
      </nav>
      <div className='mx-auto justify-self-center max-w-md px-4 pb-4 overflow-y-auto'>
        {renderProfile()}
        <Modal isOpen={showPrivacyHelp} closeModal={() => setShowPrivacyHelp(false)}>
          {renderPrivacyHelp()}
        </Modal>
      </div>
    </div>
  );
}
