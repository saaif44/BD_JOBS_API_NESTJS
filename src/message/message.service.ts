import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(senderId: number, createMessageDto: CreateMessageDto) {
    const { content, recipientId } = createMessageDto;

    //fetch sender and recipient usernames
    const [sender, recipient] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: senderId }, select: { username: true } }),
      this.prisma.user.findUnique({ where: { id: recipientId }, select: { username: true } }),
    ]);

    //check validator of sender and recipient
    if (!sender || !recipient) {
      throw new Error('Sender or recipient not found');
    }

    // Create the message with sender and recipient usernames
    return this.prisma.message.create({
      data: {
        content,
        senderId,
        recipientId,
        senderName: sender.username as string,
        recipientName: recipient.username as string,
      },
    });
  }
}
