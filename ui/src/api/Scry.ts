import Urbit from "@urbit/http-api";
import { GroupsProfile } from "../types/GroupsTypes";

export async function scryRolodex(urbit: Urbit): Promise<Record<string, GroupsProfile>> {
  return urbit.scry<Record<string, GroupsProfile>>({ app: 'contacts', path: '/all' });
}
