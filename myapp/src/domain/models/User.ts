const bcrypt = require('bcrypt-nodejs');

export class User {
  private _id: number
  private _last_name: string
  private _first_name: string
  private _email: string
  private _password: string

  get id(): number {
    return this._id
  }

  set id(id: number) {
    this._id = id
  }

  get last_name(): string {
    return this._last_name
  }

  set last_name(last_name: string) {
    this._last_name = last_name
  }

  get first_name(): string {
    return this._first_name
  }

  set first_name(first_name: string) {
    this._first_name = first_name
  }

  get email(): string {
    return this._email
  }

  set email(email: string) {
    this._email = email
  }

  get password(): string {
    return this._password
  }

  set password(password: string) {
    this._password = bcrypt.hashSync(password)
  }

  constructor(last_name: string, first_name: string, email: string, password: string, ) {
    this._last_name = last_name
    this._first_name = first_name
    this._email = email
    this._password = bcrypt.hashSync(password)
  }
}