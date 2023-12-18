import {SkillsInterface} from '../interface/skillsInteface'
import { CurriculumInterface } from './curriculumInterface'

export interface EmployeeInterface {
    id: number,
    nome: string,
    cognome: string,
    dataDiNascita: string,
    matricola: string,
    rowExist: number,
    citta:string,
    indirizzo:string,
    skills:SkillsInterface[]
    curriculum:CurriculumInterface[]
}