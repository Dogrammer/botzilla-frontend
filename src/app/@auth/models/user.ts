import { IEducationLevel } from './education-level';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    educationLevel: IEducationLevel;

}
