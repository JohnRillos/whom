import { FieldDef, FieldSettings } from '../types/SettingTypes';

export function buildFieldSettings(defList: FieldDef[]): FieldSettings {
  return {
    defs: Object.fromEntries(defList.map(def => [def.key, def])),
    order: defList.map(def => def.key)
  };
}
