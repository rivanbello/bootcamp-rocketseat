import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it(`should be able to reset the password`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rivan Bello',
      email: 'rivan.bello@gmail.com',
      password: '123123',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = await jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '321321',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('321321');
    expect(generateHash).toHaveBeenCalledWith('321321');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rivan Bello',
      email: 'rivan.bello@gmail.com',
      password: '123123',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
