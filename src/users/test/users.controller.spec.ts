import { JwtService } from '@nestjs/jwt/dist';
import { Test } from '@nestjs/testing';
import { UsersService } from './../users.service';
import { UsersController } from './../users.controller';

jest.mock('../users.service');
describe('Users controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  it('should be defind user controller', () => {
    expect(usersController).toBeDefined();
  });
  it('should be defind user service', () => {
    expect(usersService).toBeDefined();
  });
});
