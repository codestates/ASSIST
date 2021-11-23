export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  phone: string;
  gender: string;
  provider?: string;
  role?: string;
}

export class CreateSMSAuth {
  phone: string;
  number: string;
}
