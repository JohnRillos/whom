import Urbit from "@urbit/http-api";
import { Contact, InfoValue } from "../types/ContactTypes";
import { WhomAction } from "../types/GallTypes";
import { FieldDef } from "../types/SettingTypes";

function poke(
  api: Urbit,
  action: WhomAction,
  onError: (err: string | null) => void,
  onSuccess?: () => void,
) {
  api.poke({
    app: 'whom',
    mark: 'whom-action',
    json: action,
    onSuccess: onSuccess || (() => {}),
    onError: (err: string | undefined) => onError(parseErrorMessage(err))
  });
}

function parseErrorMessage(err: string | undefined): string | null {
  return err?.match(/".*"/)?.[0] || err?.match(/'.*'/)?.[0] || null;
}

export function createContact(
  api: Urbit,
  ship: string | null,
  contact: Contact,
  onError: (err: string | null) => void,
  onSuccess: () => void
) {
  poke(api, { 'add-contact': { ship, contact } }, onError, onSuccess);
}

export function editContact(
    api: Urbit,
    key: string,
    info: Record<string, InfoValue | null>,
    onError: (err: string | null) => void,
    onSuccess: () => void
) {
  const json = {
    'mod-contact-info': {
      key,
      info
    }
  };
  poke(api, json, onError, onSuccess);
}

export function editContactShip(
  api: Urbit,
  key: string,
  ship: string | null,
  onError: (err: string | null) => void,
  onSuccess: () => void
) {
  const json = {
    'mod-contact-ship': {
      key,
      ship
    }
  };
  poke(api, json, onError, onSuccess);
}

export function deleteContact(api: Urbit, contactKey: string, onError: (err: string | null) => void) {
  poke(api, { 'del-contact': { key: contactKey, } }, onError);
}

export function addField(
  api: Urbit,
  fieldDef: FieldDef,
  onError: (err: string | null) => void,
  onSuccess: () => void
) {
  poke(api, { 'add-field': {
    key: fieldDef.key,
    def: {
      name: fieldDef.name,
      type: fieldDef.type,
    }
  }}, onError, onSuccess);
}

export function deleteField(
  api: Urbit,
  fieldKey: string,
  onError: (err: string | null) => void,
  onSuccess: () => void
) {
  poke(api, { 'del-field': { key: fieldKey } }, onError, onSuccess);
}

export function editSelf(
  api: Urbit,
  info: Record<string, InfoValue | null>,
  onError: (err: string | null) => void,
  onSuccess: () => void
) {
  const json = {
    'mod-self': {
      info
    }
  };
  poke(api, json, onError, onSuccess);
}
