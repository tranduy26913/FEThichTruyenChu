export interface User {
    id:string;
    username:string;
    image:string;
    balance:number | 0;
    birthdate:string;
    roles:string[];
    nickname?:string | '';
    [x:string]:any;
}