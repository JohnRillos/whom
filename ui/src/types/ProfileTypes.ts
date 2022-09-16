import { InfoFields } from './ContactTypes';
import { FieldDef } from './SettingTypes';

export declare type Self = {
  info: InfoFields
}

export declare type Profile = {
  info: InfoFields,
  fields: Record<string, FieldDef>
}
