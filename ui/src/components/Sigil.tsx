import { sigil, reactRenderer } from '@tlon/sigil-js'

export default function Sigil(props: { ship: string }): JSX.Element | null {
  if (props.ship.split('-').length > 2) {
    return null;
  }
  return sigil({
    class: 'rounded',
    patp: props.ship,
    renderer: reactRenderer,
    size: 28,
  })
}
