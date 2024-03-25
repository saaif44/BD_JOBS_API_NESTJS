//importing the DecodedToken interface
interface DecodedToken {
    userId: number;
}

//messagecontroller
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async createMessage(@Body() createMessageDto: CreateMessageDto, @Req() request: Request) {
        const decodedToken = request.user as DecodedToken; //cast to DecodedToken interface from our Authorization Bearer
        const senderId = decodedToken.userId;
        return this.messageService.createMessage(senderId, createMessageDto);
    }
}
