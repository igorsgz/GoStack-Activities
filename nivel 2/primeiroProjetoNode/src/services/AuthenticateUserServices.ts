import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface UserWithoutPassword {
  email: string;
  password?: string;
}

interface Response {
  user: UserWithoutPassword;
}

class AuthenticateUSerServices {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password => senha criptografada dentro do Banco
    // password => Senha não criptografada utilizada na tentativa de login

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // Usuário autenticado

    return {
      user,
    };
  }
}

export default AuthenticateUSerServices;
