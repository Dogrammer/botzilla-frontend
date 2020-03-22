import { IEmailSubject } from './email-subject';

export interface IEmailContact {
    id: number;
    name: string;
    body: string;
    emailAddress: string;
    emailSubject: IEmailSubject;
    nameOfSender: string;
    
}
