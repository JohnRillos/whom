export declare type FieldSettings = {
  defs: Record<string, FieldDef>,
  order: string[]
}

export declare type FieldDef = {
  key: string,
  name: string,
  type: FieldTypeTag,
}

export declare type FieldTypeTag = 'text' | 'date';
