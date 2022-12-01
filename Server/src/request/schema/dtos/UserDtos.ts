import { IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @MinLength(4, {
    message: "Please provide a valid name."
  })
  firstname: string;

  @IsString()
  @MinLength(2)
  lastname: string;

  constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
