export interface UserFb {
    id_firebase?: string;
    direccion?: string;
    email?: string;
    user?: string;
    rol?: string;
    recorrido?: Recorrido;
}

export interface Recorrido {
    origen?: string;
    hora?: string;
    destino?: string;
    cliente?: string;
    chofer?: string;
    email?: string;
}
