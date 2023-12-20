import {SkillsInterface} from '../interface/skillsInteface'
import { CurriculumInterface } from './curriculumInterface'
import { RefNationality } from './refNationalitiInterface';

export interface EmployeeInterface {
    idDipendente: number,
    nome: string,
    cognome: string,
    dataDiNascita: string,
    matricola: string,
    rowExist: number,
    citta:string,
    indirizzo:string,
    skills:SkillsInterface[];
    refNazionalita:RefNationality;
    curriculum:CurriculumInterface[]
}