import Urbit from "@urbit/http-api";
import { Contact, InfoValue } from "../types/ContactTypes";
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
    info: Record<string, InfoValue | null>
  ) {
  const json = {
    'edit-contact': {
      key,
      info
    }
  };
  poke(api, json);
}

export function deleteContact(api: Urbit, contactKey: string) {
  poke(api, { 'del-contact': { key: contactKey, } });
}
