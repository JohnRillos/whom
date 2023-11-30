import { GroupsProfile } from "../types/GroupsTypes";

export function sanitizeColor(raw: string): string {
  return '#' + raw.padStart(6, '0');
}

export function getRolodexColor(
  rolodex: Record<string, GroupsProfile>,
  ship: string
): string | null {
  const color = rolodex[ship]?.color;
  if (!color) {
    return null;
  }
  return color.split('x')[1]?.replaceAll('.', '') || null;
}
