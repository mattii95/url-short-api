import { IsDate, IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateShortenDto {

    @IsString()
    @MinLength(1)
    url: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    shortCode: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    accessCount?: number;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;
}
