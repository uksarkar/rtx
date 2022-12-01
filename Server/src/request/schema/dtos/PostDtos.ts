import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePostDTO {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  constructor(title: string, description: string, user_id: number) {
    this.title = title;
    this.description = description;
    this.user_id = user_id;
  }
}
