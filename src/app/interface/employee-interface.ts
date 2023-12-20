import { TipskillInterface } from './tipskill-interface';
import { RefNationalitaInterface } from './ref-nazionalita-interface';
import { CurriculumInterface } from '../interface/curriculum-interface'

export interface EmployeeInterface {
    id: number;
    citta:string;
    cognome: string;
    dataDiNascita: string;
    indirizzo:string;
    matricola: string;
    nome: string;
    rowExist: number;
    skills:TipskillInterface[];
    refNazionalita:RefNationalitaInterface;
    cvs:CurriculumInterface[];
}