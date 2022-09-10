import Urbit from "@urbit/http-api";
import { Contact, InfoValue } from "../types/ContactTypes";
import { WhomAction } from "../types/GallTypes";
import { FieldDef } from "../types/SettingTypes";

function poke(api: Urbit, action: WhomAction, onError: (err: string | null) => void) {
  api.poke({
    app: 'whom',
    mark: 'whom-action',
    json: action,
    onSuccess: () => { console.log('Success!') },
    onError: (err: string | undefined) => onError(parseErrorMessage(err))
  });
}

function parseErrorMessage(err: string | undefined): string | null {
  return err?.match(/".*"/)?.[0] || err?.match(/'.*'/)?.[0] || null;
}

export function createContact(api: Urbit, ship: string | null, contact: Contact, onError: (err: string | null) => void) {
  poke(api, { 'add-contact': { ship, contact } }, onError);
}

export function editContact(
    api: Urbit,
    key: string,
    info: Record<string, InfoValue | null>,
    onError: (err: string | null) => void
  ) {
  const json = {
    'edit-contact': {
      key,
      info
    }
  };
  poke(api, json, onError);
}

export function deleteContact(api: Urbit, contactKey: string, onError: (err: string | null) => void) {
  poke(api, { 'del-contact': { key: contactKey, } }, onError);
}

export function addField(api: Urbit, fieldDef: FieldDef, onError: (err: string | null) => void) {
  poke(api, { 'add-field': {
    key: fieldDef.key,
    def: {
      name: fieldDef.name,
      type: fieldDef.type,
    }
  }}, onError);
}
