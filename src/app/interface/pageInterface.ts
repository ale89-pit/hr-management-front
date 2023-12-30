export interface Page<T> {
    content: T[];       // l'array dei dati
    totalPages: number;  // il numero totale di pagine
    totalElements: number; // il numero totale di elementi su tutte le pagine
    size: number;       // la dimensione della pagina corrente
    number: number;     // il numero di pagina corrente
  }