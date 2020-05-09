import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'thayane@gmail.com',
      name: 'Thayane Bello',
      password: '123123',
    });

    const updated_user = await updateProfile.execute({
      user_id: user.id,
      name: 'Rivan Henrique Bello',
      email: 'rivan.bello2@gmail.com',
    });

    const updated_user2 = await updateProfile.execute({
      user_id: user2.id,
      name: 'Thayane Assis Bello',
      email: 'thayane@gmail.com',
    });

    expect(updated_user?.name).toBe('Rivan Henrique Bello');
    expect(updated_user?.email).toBe('rivan.bello2@gmail.com');

    expect(updated_user2?.name).toBe('Thayane Assis Bello');
    expect(updated_user2?.email).toBe('thayane@gmail.com');
  });

  it('should not be able to update the profile rom non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'teste',
        name: 'test',
        email: 'test@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the email to a existing email', async () => {
    await fakeUsersRepository.create({
      email: 'rivan@gmail.com',
      name: 'Rivan Henrique',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      email: 'bello@gmail.com',
      name: 'Henrique Bello',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Rivan Henrique Bello',
        email: 'rivan@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    const updated_user = await updateProfile.execute({
      user_id: user.id,
      name: 'Rivan Henrique Bello',
      email: 'rivan.bello2@gmail.com',
      old_password: '123123',
      password: '321321',
    });

    expect(updated_user?.password).toBe('321321');
  });

  it('should not be able to update the password withou old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Rivan Henrique Bello',
        email: 'rivan.bello2@gmail.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Rivan Bello',
        email: 'rivan.bello@gmail.com',
        old_password: '123122',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
