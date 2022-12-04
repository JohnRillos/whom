import { InfoValue } from './ContactTypes';
import { FieldDef } from './SettingTypes';

export declare type Self = {
  info: ProfileFields
}

export declare type Profile = {
  info: ProfileFields,
  fields: Record<string, FieldDef>
}

export declare type ProfileFields = Record<string, ProfileField>

export declare type ProfileField = {
  value: InfoValue,
  access: AccessLevel
}

export declare type AccessLevel = 'public' | 'mutual';
