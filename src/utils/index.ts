export interface IInput {
    label: string;
    type: string;
    name: string;
    required?: boolean;
    options?: Array<IOption>;
    multipleOptions?: Array<multipleOption>;
    disabled?: boolean;
}

export interface IEvent {
    target: ITarget;
}

interface ITarget {
    name: string;
    value?: any;
    files?: any;
    checked?: boolean;
}

export interface IOption {
    id?: number;
    label: string;
    value: any;
}
interface multipleOption {
    label: string;
    type: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
}


export function validateEmail(email: string) {
    if (!email) return true;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export const dateConversion = (date: any) => {
    const dateOfBirth = date;
    const dob = new Date(dateOfBirth);
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, "0");
    const day = String(dob.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

export function dateOfBirthValidation(date: Date) {
    const inputDate = new Date(date);
    const currentDate = new Date();
    if (inputDate < currentDate || !date) {
        return true;
    } else {
        return false;
    }
}

export function validatePhoneNum(num: string) {
    if (!num || num.length === 0) {
        return true;
    }
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}