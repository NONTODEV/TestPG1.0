export interface UserInterface {
  id?: number
  firstName: string
  lastName: string
  gender: GenderEnum
  score: number
}

export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
}

export interface GenderInterface {
  value: string
  viewValue: string
}
