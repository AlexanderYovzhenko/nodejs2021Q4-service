import { v4 as uuid } from 'uuid';

/**
 * Add in object user new field id equal uuid.
 * If not hand over id argument then field id equal uuid.
 * Otherwise field id qual argument id.
 * @param user -first argument object user
 * @param id -second argument id user
 * @returns void
 */
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
