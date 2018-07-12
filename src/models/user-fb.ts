export interface UserFb {
    id_firebase?: string;
    direccion?: string;
    email?: string;
    user?: string;
    rol?: string;
    recorrido?: Recorrido;
}

export interface Recorrido {
    direccion?: string;
    hora?: string;
    destino?: string;
    email?: string;
    chofer?: string;
}
