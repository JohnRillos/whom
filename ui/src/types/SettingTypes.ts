export declare type FieldSettings = {
  defs: Record<string, FieldDef>,
  order: string[]
}

export declare type FieldDef = {
  key: string,
  name: string,
  type: FieldTypeTag,
  custom: boolean
}

export declare type FieldTypeTag = 'text' | 'date';
