import { IsString,Length,IsEmail } from "class-validator"

export class RegisterDto{
  @IsString({
    message: '用户名必须为字符串',
  })
  @Length(5, 20,{
    message:"用户名必须为5-20位"
  })
  username: string;
  @IsString({
    message: '密码必须为字符串',
  })
  @Length(5, 32, {
    message: '密码必须为32位',
  })
  password: string;
  @IsEmail(undefined, {
    message: '邮箱格式不正确',
  })
  email: string;
}
