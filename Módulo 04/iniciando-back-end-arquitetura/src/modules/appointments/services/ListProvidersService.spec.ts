import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'jonh.doe@gmail.com',
      name: 'John Doe',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'john.tre@gmail.com',
      name: 'John Tre',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'john.qua@gmail.com',
      name: 'John Qua',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
