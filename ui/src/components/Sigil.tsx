import { sigil, reactRenderer } from '@tlon/sigil-js'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Sigil(props: { ship: string }): JSX.Element | null {
  const { rolodex, } = useContext(AppContext);
  const color = rolodex[props.ship]?.color;

  if (props.ship.split('-').length > 2) {
    return null;
  }
  var config = {
    class: 'rounded',
    patp: props.ship,
    renderer: reactRenderer,
    size: 28
  };
  if (color) {
    const bgColor = '#' + color.split('x')[1]?.replaceAll('.', '')?.padStart(6, '0');
    config = Object.assign(config, { colors: [ bgColor, '#ffffff' ] } );
  }
  return sigil(config);
}
