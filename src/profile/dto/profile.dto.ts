import { IsString, IsNotEmpty, IsEmail, isInt } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  role: string;

  @IsString()
  language_known: string;

  @IsString()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  @IsEmail()
  email: string; //optionally include email for editing but email is unique in the database so no email should matched with our providing email

  @IsString()
  phone_number: string;

}

//EditProfileDto.ts

export class EditProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  language_known: string;

  @IsString()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  phone_number: string;


}
