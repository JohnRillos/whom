export declare type FieldSettings = {
  defs: Record<string, FieldDefWithKey>,
  order: string[]
}

export interface FieldDefWithKey extends FieldDef {
  key: string,
}

export declare type FieldDef = {
  name: string,
  type: FieldTypeTag,
}

export declare type FieldTypeTag = 'text' | 'date' | 'tint' | 'look' | 'coll';
