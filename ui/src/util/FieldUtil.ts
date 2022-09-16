import { FieldDefWithKey, FieldSettings } from '../types/SettingTypes';

export function buildFieldSettings(defList: FieldDefWithKey[]): FieldSettings {
  return {
    defs: Object.fromEntries(defList.map(def => [def.key, def])),
    order: defList.map(def => def.key)
  };
}

export function combineFieldOrders(yours: string[], theirs: string[]): string[] {
  const newOrder = [...yours];
  theirs.forEach(key => {
    if (!yours.includes(key)) {
      newOrder.push(key);
    }
  })
  return newOrder;
}