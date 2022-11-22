import { InfoFields, InfoValue } from './ContactTypes';
import { FieldDef } from './SettingTypes';

export declare type Self = {
  info: SelfFields
}

export declare type Profile = {
  info: InfoFields,
  fields: Record<string, FieldDef>
}

export declare type SelfFields = Record<string, SelfField>

export declare type SelfField = {
  value: InfoValue,
  access: AccessLevel
}

export declare type AccessLevel = 'public' | 'mutual';
