import React from 'react';
import { InfoTint } from '../../types/ContactTypes';
import { sanitizeColor } from '../../util/ColorUtil';

function renderLabel(label: string, val: InfoTint) {
  const opacity = !val ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

function renderValue(value: InfoTint) {
  const sane = sanitizeColor(value.tint);
  return (
    <div className='max-w-xs flex'>
      <div className='w-5 h-5 mr-2 rounded items-center' style={{background: sane}}/>
      <span>{sane}</span>
    </div>
  );
}

export default function TintField(
  props: {label: string, value: InfoTint}
): JSX.Element {
  const value = props.value;
  return (
    <div className='flex flex-row text-left'>
      {renderLabel(props.label, value)}
      {renderValue(value)}
    </div>
  );
}
