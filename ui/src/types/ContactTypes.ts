export declare type Contacts = {
  urbitContacts: Record<string, Contact>,
  earthContacts: Record<string, Contact>
};

export declare type Contact = {
  ship: string | null,
  info: Record<InfoKey, InfoValue>,
  custom: Record<string, string>
};

export interface ContactWithKey extends Contact {
  key: string
};

export type InfoKey = keyof typeof InfoKeyEnum;

enum InfoKeyEnum {
  'first-name',
  'middle-name',
  'last-name',
  'nickname',
  'label',
  'dob',
  'note',
  'job',
  'phone',
  'email',
  'website',
  'github',
  'twitter'
}

export declare type InfoValue = string | InfoDate;

export declare type InfoDate = {
  date: {
    year: number,
    month: number,
    day: number
  }
};
