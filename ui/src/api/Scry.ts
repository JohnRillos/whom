import Urbit from "@urbit/http-api";
import { Contacts } from "../types/ContactTypes";
import { ScryPath } from "../types/GallTypes";
import { Self } from "../types/ProfileTypes";
import { FieldDefWithKey } from "../types/SettingTypes";

export async function scryContacts(urbit: Urbit): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: ScryPath.Contacts });
}

export async function scryFieldDefs(urbit: Urbit): Promise<FieldDefWithKey[]> {
  return urbit.scry<FieldDefWithKey[]>({ app: 'whom', path: ScryPath.Fields });
}

export async function scrySelf(urbit: Urbit): Promise<Self> {
  return urbit.scry<Self>({ app: 'whom', path: ScryPath.Self });
}

export async function scryImportPals(urbit: Urbit): Promise<boolean> {
  return urbit.scry<boolean>({ app: 'whom', path: ScryPath.ImportPals });
}
