import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Ast, Config } from '@tlon/sigil-js/types';
import { GroupsProfile } from '../types/GroupsTypes';

declare type SigilJS = {
  sigil: (props: Config) => JSX.Element,
  reactRenderer: (node: Ast, i: string) => JSX.Element
};

function getRolodexColor(
  rolodex: Record<string, GroupsProfile>,
  ship: string
): string | null {
  const color = rolodex[ship]?.color;
  if (!color) {
    return null;
  }
  return color.split('x')[1]?.replaceAll('.', '') || null;
}

function sanitizeColor(raw: string | null): string | null {
  if (!raw) {
    return null;
  }
  return '#' + raw.padStart(6, '0');
}

export default function Sigil(props: { ship: string }): JSX.Element | null {
  useEffect(() => { import('@tlon/sigil-js').then(setSigilJS) });

  const [ sigilJS, setSigilJS ] = useState<SigilJS | null>(null);
  const { contacts, rolodex, } = useContext(AppContext);

  if (sigilJS == null) {
    return null;
  }
  if (props.ship.split('-').length > 2) {
    return null;
  }
  let config = {
    class: 'rounded',
    patp: props.ship,
    renderer: sigilJS.reactRenderer,
    size: 28
  };

  const contact = contacts[props.ship];
  const ourColor = contact?.info.color?.tint;
  const theirColor = contact?.profile?.info.color?.value.tint;
  const rolodexColor = () => getRolodexColor(rolodex, props.ship);
  const color = sanitizeColor(ourColor || theirColor || rolodexColor());
  if (color) {
    config = Object.assign(config, { colors: [ color, '#ffffff' ] } );
  }
  return sigilJS.sigil(config);
}
