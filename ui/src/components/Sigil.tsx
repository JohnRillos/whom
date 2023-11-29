import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Ast, Config } from '@tlon/sigil-js/types';

declare type SigilJS = {
  sigil: (props: Config) => JSX.Element,
  reactRenderer: (node: Ast, i: string) => JSX.Element
};

export default function Sigil(props: { ship: string }): JSX.Element | null {
  useEffect(() => { import('@tlon/sigil-js').then(setSigilJS) });

  const [ sigilJS, setSigilJS ] = useState<SigilJS | null>(null);
  const { rolodex, } = useContext(AppContext);

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
  const color = rolodex[props.ship]?.color; // todo: prefer color from %whom
  if (color) {
    const bgColor = '#' + color.split('x')[1]?.replaceAll('.', '')?.padStart(6, '0');
    config = Object.assign(config, { colors: [ bgColor, '#ffffff' ] } );
  }
  return sigilJS.sigil(config);
}
