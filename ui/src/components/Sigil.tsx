import { sigil, reactRenderer } from '@tlon/sigil-js'

export default function Sigil(props: { ship: string }) {
  return sigil({
    class: 'rounded',
    patp: props.ship,
    renderer: reactRenderer,
    size: 28,
  })
}
