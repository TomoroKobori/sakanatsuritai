export class Fish {
  private _id: number
  private _name: string

  get id(): number {
    return this._id
  }

  set id(id: number) {
    this._id = id
  }

  get name(): string {
    return this._name
  }

  set name(title: string) {
    this._name = title
  }

  constructor(name: string = null) {
    this._name = name
  }
}