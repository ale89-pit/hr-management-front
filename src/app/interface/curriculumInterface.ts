import { SafeUrl } from "@angular/platform-browser";

export interface CurriculumInterface {
    idCurriculum: number;
    curriculum: string;//è una strina codificata in base 64, decodificata diventa blob, e una volta letto il blob con filerader diventa una string leggibile
    pdfText: string | undefined;
    modificaCurriculum:boolean;
    pdfUrl: SafeUrl; // l'URL sicuro del PDF
}