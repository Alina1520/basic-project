import { Injectable } from "@nestjs/common";
import { IMailerService, ISendPayload } from "../typing";
import { MailerService as MailerLibService } from '@nestjs-modules/mailer'

@Injectable()
export class MailerService implements IMailerService{
    constructor(private readonly mailer: MailerLibService){}
    public async send(options:ISendPayload){
        try{
            await this.mailer.sendMail(options)
        }catch(e){
            console.log('Error mailing',e)
        }
    }
}