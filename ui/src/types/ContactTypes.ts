export declare type Contacts = {
  urbitContacts: Record<string, Contact>,
  earthContacts: Record<string, Contact>
}

export declare type Contact = {
  ship: string | null,
  info: InfoFields,
  custom: Record<string, string>
}

export interface ContactWithKey extends Contact {
  key: string
}

export type InfoKey = keyof InfoFields;

export type InfoFields = {
  'first-name'?: string,
  'middle-name'?: string,
  'last-name'?: string,
  'nickname'?: string,
  'label'?: string,
  'dob'?: InfoDate,
  'note'?: string,
  'job'?: string,
  'phone'?: string,
  'email'?: string,
  'website'?: string,
  'github'?: string,
  'twitter'?: string,
};

export declare type InfoValue = string | InfoDate;

export declare type InfoValueTypeName = 'string' | 'InfoDate';

export declare type InfoDate = {
  date: {
    year: number,
    month: number,
    day: number
  }
}
