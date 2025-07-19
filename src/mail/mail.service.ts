import { Injectable } from '@nestjs/common';
import { Mail } from './mail.interface';
import { ConfigService } from '@nestjs/config';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class MailService {
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;

  constructor(private configService: ConfigService) {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];

    apiKey.apiKey = this.configService.get<string>('BREVO_API_KEY');
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  async sendEmail(mail: Mail) {
    const senderEmail = this.configService.get<string>('MAIL');

    const sendSmtpEmail = {
      sender: { name: 'Geneasur', email: senderEmail },
      to: [{ email: mail.to }],
      subject: mail.subject,
      htmlContent: mail.html,
    };

    try {
      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error: any) {
      console.error('Error al enviar el correo:', error.response?.body || error.message);
    }
  }
}