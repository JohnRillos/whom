import React from 'react';
import { InfoLook } from '../../types/ContactTypes';
import LinkIcon from '../icons/LinkIcon';

function renderLabel(label: string, val: string) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

function renderValue(link: string) {
  return (
    <a className='flex items-center' href={link} target='_blank' rel='noreferrer'>
      <img src={link} className='w-6 h-6 mr-1 rounded border-dark object-cover hover:w-auto hover:h-auto hover:max-w-[50vw] hover:max-h-[50vh] hover:absolute hover:object-contain'/>
      <LinkIcon/>
    </a>
  );
}

export default function LookField(
  props: { label: string, value: InfoLook }
): JSX.Element {
  const value = props.value;
  return (
    <div className='flex flex-row text-left'>
      {renderLabel(props.label, value.look)}
      {renderValue(value.look)}
    </div>
  );
}
