import { IEducationLevel } from './education-level';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    educationLevel: IEducationLevel;

}
