import {SkillsInterface} from '../interface/skillsInteface'
import { CurriculumInterface } from './curriculumInterface'
import { RefNationality } from './refNationalitaInterface';

export interface EmployeeInterface {
    //null per associare i form e undefined per inizialiazzare employee
    idDipendente: number,
    nome: string|null|undefined,
    cognome: string|null|undefined,
    dataDiNascita: string|null|undefined,
    matricola: string|null|undefined,
    rowExist: string|null|undefined,
    citta:string|null|undefined,
    indirizzo:string|null|undefined,
    skills:SkillsInterface[]|null|undefined,
    refNazionalita:RefNationality|null|undefined,
    curriculum:CurriculumInterface[]|null|undefined,

}