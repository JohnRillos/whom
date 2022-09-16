import Urbit from "@urbit/http-api";
import { Contacts } from "../types/ContactTypes";
import { ScryPath } from "../types/GallTypes";
import { Self } from "../types/ProfileTypes";
import { FieldDef } from "../types/SettingTypes";

export async function scryContacts(urbit: Urbit): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: ScryPath.Contacts });
}

export async function scryFieldDefs(urbit: Urbit): Promise<FieldDef[]> {
  return urbit.scry<FieldDef[]>({ app: 'whom', path: ScryPath.Fields });
}

export async function scrySelf(urbit: Urbit): Promise<Self> {
  return urbit.scry<Self>({ app: 'whom', path: ScryPath.Self });
}
