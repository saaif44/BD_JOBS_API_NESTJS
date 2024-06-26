// Import the DecodedToken interface
interface DecodedToken {
    userId: number;
    // other properties if present in the token payload
}

// profile.controller.ts
import { Controller, Post, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto, EditProfileDto } from './dto/profile.dto';
import { Request } from 'express';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Post()
    async createProfile(@Body() createProfileDto: CreateProfileDto, @Req() request: Request) {
        const decodedToken = request.user as DecodedToken; // Cast to DecodedToken interface
        const userId = decodedToken.userId;
        return this.profileService.createProfile(userId, createProfileDto);
    }

    @Put(':id')
    editProfile(@Body() editProfileDto: EditProfileDto, @Param('id') id: number, @Req() request: Request) {
    const decodedToken = request.user as DecodedToken; // Cast to DecodedToken interface
    const userId = decodedToken.userId;
    return this.profileService.editProfile(userId, id, editProfileDto); //pass id instead of userId
}

}
