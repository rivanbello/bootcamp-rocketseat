import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Rivan Bello');
    expect(profile.email).toBe('rivan.bello@gmail.com');
  });

  it('should not be able to show the profile rom non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
