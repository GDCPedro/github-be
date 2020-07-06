export default class CreateUserDto {
  readonly id?: number;
  readonly username: string;
  readonly password: string;
  readonly isActive?: boolean;
}
