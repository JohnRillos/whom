import Urbit from "@urbit/http-api";
import { Contact, InfoFields } from "../types/ContactTypes";
import { WhomAction } from "../types/GallTypes";

function poke(api: Urbit, action: WhomAction) {
  api.poke({
    app: 'whom',
    mark: 'whom-action',
    json: action
  });
}

export function createContact(api: Urbit, contact: Contact) {
  poke(api, { 'add-contact': { contact } });
}

export function editContact(
    api: Urbit,
    key: string,
    info: InfoFields,
    custom: Record<string, string>
  ) {
  const json = {
    'edit-contact': {
      key,
      info,
      custom
    }
  };
  poke(api, json);
}

export function deleteContact(api: Urbit, contactKey: string) {
  poke(api, { 'del-contact': { key: contactKey, } });
}
