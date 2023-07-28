import { userStub } from './../test/stubs/user.stub';
export const UsersService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(userStub()),
  findAllUsers: jest.fn().mockResolvedValue([userStub()]),
  createUser: jest.fn().mockResolvedValue(userStub()),
  remove: jest.fn().mockRejectedValue({ message: 'foydalanuvchi uchirildi' }),
});
