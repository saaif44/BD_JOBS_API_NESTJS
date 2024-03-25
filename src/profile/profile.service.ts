// profile.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto , EditProfileDto } from './dto/profile.dto';
import { RoleType } from '@prisma/client';



@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile( userId: number, data: CreateProfileDto) {

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        username: data.name,
        role: data.role as RoleType,
        language_known: data.language_known,
        nationality: data.nationality,
        address: data.address,
        phone_number: data.phone_number,
        //will add other fields 
      },
      include: {
        FreelancerProfile: true,
        ClientProfile: true,
      },
    });
  }

  async editProfile(userId: number,id:number, data: EditProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        username: data.name,
        language_known: data.language_known,
        nationality: data.nationality,
        address: data.address,
        phone_number: data.phone_number,
        //will add other fields
      },
      include: {
        FreelancerProfile: true,
        ClientProfile: true,
      },
    });
  }
}
