import { InfoTint, InfoValue } from './ContactTypes';
import { FieldDef } from './SettingTypes';

export declare type Self = {
  info: ProfileFields
}

export declare type Profile = {
  info: ProfileFields,
  fields: Record<string, FieldDef>
}

export declare type ProfileFields = {
  'first-name'?: { value: string, access: AccessLevel},
  'last-name'?: { value: string, access: AccessLevel},
  'nickname'?: { value: string, access: AccessLevel},
  'color'?: { value: InfoTint, access: AccessLevel},
  [key: string]: ProfileField | undefined
}

export declare type ProfileField = {
  value: InfoValue,
  access: AccessLevel
}

export declare type AccessLevel = 'public' | 'mutual';
