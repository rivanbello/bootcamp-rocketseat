import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticationUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    authenticationUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await createUser.execute({
      name: 'Rivan Bello',
      email: 'rivan.bello2@gmail.com',
      password: '123123',
    });

    const response = await authenticationUser.execute({
      email: 'rivan.bello2@gmail.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with none exist user', async () => {
    await expect(
      authenticationUser.execute({
        email: 'rivan.bello2@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Rivan Bello',
      email: 'rivan.bello2@gmail.com',
      password: '123123',
    });

    await expect(
      authenticationUser.execute({
        email: 'rivan.bello2@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
