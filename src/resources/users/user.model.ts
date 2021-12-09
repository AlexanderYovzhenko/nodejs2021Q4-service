import { v4 as uuid } from 'uuid';

class User {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor(
    user: { name: string; login: string; password: string },
    id: string = uuid()
  ) {
    this.id = id;
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }
}

module.exports = User;
