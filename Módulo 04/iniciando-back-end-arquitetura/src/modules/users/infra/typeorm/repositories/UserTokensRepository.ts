import { Repository, getRepository } from 'typeorm';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '../../../repositories/IUserTokenRepository';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }
}

export default UserTokenRepository;
