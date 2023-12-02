import { Profile } from "./ProfileTypes";

export declare type Contacts = Record<string, Contact>

export declare type Contact = {
  info: InfoFields,
  profile: Profile | null
}

export interface ContactWithKey extends Contact {
  key: string,
  ship: string | null
}

export type InfoFields = {
  'first-name'?: string,
  'last-name'?: string,
  'nickname'?: string,
  'avatar'?: InfoLook,
  'color'?: InfoTint,
  [key: string]: InfoValue | undefined
};

export declare type InfoValue =
  string | InfoDate | InfoLook | InfoTint | InfoColl;

export declare type InfoDate = {
  date: {
    year: number,
    month: number,
    day: number
  }
}

export declare type InfoLook = {
  look: string
}

export declare type InfoTint = {
  tint: string
}

export declare type InfoColl = {
  coll: CollItem[]
}

export declare type CollItem = {
  ship: string,
  slug: string,
  editing?: boolean,
  slash?: boolean
}
