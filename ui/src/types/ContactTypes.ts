export declare type Contacts = Record<string, Contact>

export declare type Contact = {
  ship: string | null,
  info: InfoFields,
}

export interface ContactWithKey extends Contact {
  key: string
}

export type InfoFields = {
  'first-name'?: string,
  'last-name'?: string,
  'label'?: string,
  [key: string]: InfoValue | undefined
};

export declare type InfoValue = string | InfoDate;

export declare type InfoDate = {
  date: {
    year: number,
    month: number,
    day: number
  }
}
