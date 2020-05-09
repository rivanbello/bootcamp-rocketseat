import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it(`should be able to recover a password using email's user`, async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'rivan.bello@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it(`should not be able to recover a non-existing user password`, async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'rivan.bello@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should generate a forgot password token`, async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'rivan.bello@gmail.com',
      name: 'Rivan Bello',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'rivan.bello@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
