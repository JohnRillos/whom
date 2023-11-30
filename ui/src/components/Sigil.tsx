import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Ast, Config } from '@tlon/sigil-js/types';
import { getRolodexColor, sanitizeColor } from '../util/ColorUtil';

declare type SigilJS = {
  sigil: (props: Config) => JSX.Element,
  reactRenderer: (node: Ast, i: string) => JSX.Element
};

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
  const color = ourColor || theirColor || rolodexColor();
  if (color) {
    const saneColor = sanitizeColor(color);
    config = Object.assign(config, { colors: [ saneColor, '#ffffff' ] } );
  }
  return sigilJS.sigil(config);
}
