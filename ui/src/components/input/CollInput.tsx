import React, { ChangeEvent } from 'react';
import { InfoColl } from '../../types/ContactTypes';

function renderLabel(label: string, val: InfoColl | undefined) {
  const opacity = !(val?.coll.length) ? 'opacity-50' : '';
  return <span className={`flex-none font-semibold mr-2 ${opacity}`}>{label}: </span>
}

const OK_TO_TYPE = /^(~[a-z|-|/|A-z0-9|-]*,*)*$/;
const OK_TO_SEND = /^(~[a-z|-]+\/[A-z0-9|-]+,{0,1})*$/;

export default function CollInput(
  props: {
    label: string,
    value: InfoColl | undefined,
    onChange: (arg: InfoColl | undefined) => void
  }
): JSX.Element {

  function renderValue() {
    const formText = asText();
    const isValid = !formText || OK_TO_SEND.test(formText);
    const bg = isValid ? 'bg-transparent' : 'bg-red-500/10';
    const border = isValid ? 'border-neutral-500' : 'border-red-500';
    return (
      <input className={`px-1 flex-shrink w-full ${bg} border-b-2 border-dotted ${border}`}
        type='text'
        onChange={handleEvent}
        value={formText || ''}
        pattern={OK_TO_TYPE.source}
        title='~sampel-palnet/cool-group,~zod/nice-app'
        id={props.label}
      />
    );
  }

  function asText(): string | null {
    return props.value?.coll
      .map(item => item.ship + ((item.slash || !item.editing) ? '/' : '') + item.slug)
      .join(',') || null;
  }

  function handleEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (!value || value.length == 0) {
      props.onChange(undefined);
    } else if (OK_TO_TYPE.test(value)) {
      const coll = build(value);
      props.onChange(coll);
    }
  }

  function build(text: string | undefined): InfoColl | undefined {
    if (!text) {
      return undefined;
    }
    const items = text.split(/,\s*/)
      .map(seg => {
        const slash = seg.includes('/');
        const bit: string[] = seg.split('/', 2);
        return ({ ship: bit[0] ?? '', slug: bit[1] ?? '', slash, editing: true })
    });
    return { coll: items }
  }

  return (
    <div className='flex'>
      {renderLabel(props.label, props.value)}
      {renderValue()}
    </div>
  );
}
