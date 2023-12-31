export interface ModalContent{
    messaggio: string|undefined;
    avviso: string|undefined;
    tipo: number|undefined;
}
export enum Opzioni {
    Aggiungi=0,
    Modifica,
    Cancella
}
export interface ModalInterface {
    conferma: boolean|undefined;
    tipo: undefined|number;
}
