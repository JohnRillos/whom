import Urbit from "@urbit/http-api";
import { Contact, InfoValue } from "../types/ContactTypes";
import { WhomAction } from "../types/GallTypes";
import { FieldDef } from "../types/SettingTypes";

function poke(api: Urbit, action: WhomAction, onError: (err: any) => void) {
  api.poke({
    app: 'whom',
    mark: 'whom-action',
    json: action
  }).catch(onError);
}

export function createContact(api: Urbit, contact: Contact, onError: (err: any) => void) {
  poke(api, { 'add-contact': { contact } }, onError);
}

export function editContact(
    api: Urbit,
    key: string,
    info: Record<string, InfoValue | null>,
    onError: (err: any) => void
  ) {
  const json = {
    'edit-contact': {
      key,
      info
    }
  };
  poke(api, json, onError);
}

export function deleteContact(api: Urbit, contactKey: string, onError: (err: any) => void) {
  poke(api, { 'del-contact': { key: contactKey, } }, onError);
}

export function addCustomField(api: Urbit, fieldDef: FieldDef, onError: (err: any) => void) {
  poke(api, { 'add-custom-field': {
    key: fieldDef.key,
    def: {
      name: fieldDef.name,
      type: fieldDef.type,
      custom: true
    }
  }}, onError);
}
