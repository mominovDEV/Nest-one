import { RolesService } from './../../roles/roles.service';
import { JwtService } from '@nestjs/jwt/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './../users.service';
import { UsersController } from './../users.controller';
import { User } from '../models/user.model';
import { userStub } from './stubs/user.stub';




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

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.findOne(userStub().id);
      });

      it('then it should call userSevice', () => {
        expect(usersService.findOne).toBeCalledWith(userStub().id);
      });
      it('then it should return User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findAllUsers', () => {
    describe('when findAllUsers is called', () => {
      let users: User[];
      beforeEach(async () => {
        users = await usersController.findAllUsers();
      });

      it('then it should call userSevice', () => {
        expect(usersService.findAllUsers).toBeCalled();
      });
      it('then it should return User', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  // describe('remove', () => {
  //   describe('when remove is called', () => {
  //     let user: Object;
  //     beforeAll(async () => {
  //       console.log(1);

  //       user = await usersController.remove(userStub().id);
  //       console.log(user);
  //     });

  //     it('then it should call userSevice', () => {
  //       expect(usersService.remove).toBeCalledWith(userStub().id);
  //     });
  //     it('then it should return User', () => {
  //       expect(user).toEqual({ message: 'foydalanuvchi uchirildi' });
  //     });
  //   });
  // });
});
