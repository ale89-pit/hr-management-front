export interface ModalContent{
    messaggio: string|undefined;
    avviso: string|undefined;
    tipo: number|undefined;
    showAnnulla:boolean|undefined;
}
export enum Opzioni {
    Aggiungi=0,
    Modifica,
    Cancella,
    ErroreIdDipendenteNonTrovato,
    ErroreCVsDuplicati,
    ErroreFileVuoti
}
export interface ModalInterface {
    conferma: boolean|undefined;
    tipo: undefined|number;
}
