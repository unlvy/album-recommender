export class User {
  login?: string;
  id?: string;

  constructor(login: string, id: string) {
    this.login = login;
    this.id = id;
  }

  public getID(): string {
    if (this.id) {
      return this.id;
    } else {
      return '';
    }
  }

}