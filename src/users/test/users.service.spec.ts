import { getModelToken } from '@nestjs/sequelize';
import { RolesService } from './../../roles/roles.service';
import { JwtService } from '@nestjs/jwt/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../models/user.model';
import { Role } from '../../roles/models/role.model';
import { CreateUserDto } from '../dto/create-user.dto';

describe('User service', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn().mockImplementation(() => {
      message: 'foydalanuvchi uchirildi';
    }),
  };
  const mockRolesRepository = {
    findOne: jest.fn().mockImplementation((value) => 'ADMIN'),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepository,
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defind', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersService.createUser(createUserDto);
        console.log(user);
      });
      it('then it should call user', () => {
        expect(user).toMatchObject({
          ...userStub(),
          roles: ['ADMIN'],
        });
      });
    });
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      it('then it should call userSevice', async () => {
        expect(await usersService.findOne(userStub().id)).toEqual(userStub());
      });
    });
  });
  describe('remove', () => {
    describe('when remove is called', () => {
      it('then it should call userSevice', async () => {
        expect(await usersService.remove(userStub().id)).toEqual({
          message: 'foydalanuvchi uchirildi',
        });
      });
    });
  });

  describe('findAllUsers', () => {
    describe('when findAllUsers is called', () => {
      it('then it should call userSevice', async () => {
        expect(await usersService.findAllUsers()).toEqual([userStub()]);
      });
    });
  });
});
