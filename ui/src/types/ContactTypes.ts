export declare type Contacts = {
  urbitContacts: {
    [key: string]: Contact
  },
  earthContacts: {
    [key: string]: Contact
  }
};

export declare type Contact = {
  ship: string | null,
  info: {
    [key: string]: InfoValue
  },
  custom: {
    [key: string]: string
  }
};

export declare type InfoValue = string | InfoDate;

export declare type InfoDate = {
  date: {
    year: number,
    month: number,
    day: number
  }
};
