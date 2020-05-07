import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('Createuser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create with same email another one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    expect(
      createUser.execute({
        email: 'rivan.bello@gmail.com',
        name: 'Rivan Bello',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
