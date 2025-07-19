import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { Mail } from '../mail/mail.interface';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserApprovalCronService {
    private readonly logger = new Logger(UserApprovalCronService.name);
    private userTimeouts = new Map<string, NodeJS.Timeout>();
    private readonly APP_URL: string;

    constructor(
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
    ) {
        this.APP_URL = this.configService.get<string>('APP_URL');
    }

    scheduleExecutionForUser(user: User, adminMails: string[], isCreationRequest: boolean): void {
        if (this.userTimeouts.has(user.email)) {
            clearTimeout(this.userTimeouts.get(user.email));
            this.logger.log(`Previous task for user ${user.email} cleared.`);
        }

        const delay = 30 * 1000;

        const timeout = setTimeout(async () => {
            this.logger.log(`Executing scheduled task for user ${user.email}...`);

            if (isCreationRequest) {
                await this.handleExecution(user, adminMails);
            } else {
                await this.handleExecutionApproveb(user.email);
            }


        }, delay);

        this.userTimeouts.set(user.email, timeout);
    }

    private async handleExecution(user: User, adminEmails: string[]): Promise<void> {
        const mailText = `${user.name} ${user.lastname}, dirección: ${user.email} ha solicitado unirse a Geneasur.
            \n\nRevisa la plataforma para más detalles accediendo a ${this.APP_URL}`;


        for (const email of adminEmails) {
            const mail: Mail = {
                subject: 'Solicitud de nuevo usuario',
                to: email,
                text: '',
                html:
                    `<div>
                    <p>${mailText}</p>
                </div>`,
            };

            this.logger.log(`[MailService] Sending mail: ${JSON.stringify(mail)}`);

            try {
                await this.mailService.sendEmail(mail);
                this.logger.log(`[MailService] Mail sent to ${email}`);
            } catch (error) {
                this.logger.error(`[MailService] Error sending mail to ${email}: ${error.message}`, error.stack);
            }
        }

        this.userTimeouts.delete(user.email);
    }

    private async handleExecutionApproveb(email: string): Promise<void> {
        const mailText = `Tu solicitud para unirte a Geneasur ha sido aprobada. Ya puede iniciar sesión en ${this.APP_URL}`;

        const mail: Mail = {
            subject: 'Solicitud aceptada',
            to: email,
            text: '',
            html:
                `<div>
                    <p>${mailText}</p>
                </div>`,
        };

        this.logger.log(`[MailService] Sending mail: ${JSON.stringify(mail)}`);

        try {
            await this.mailService.sendEmail(mail);
            this.logger.log(`[MailService] Mail sent to ${email}`);
        } catch (error) {
            this.logger.error(`[MailService] Error sending mail to ${email}: ${error.message}`, error.stack);
        }

        this.userTimeouts.delete(email);
    }

}
