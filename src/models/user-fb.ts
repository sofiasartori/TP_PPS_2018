export interface UserFb {
    id_firebase?: string;
    direccion?: string;
    email?: string;
    user?: string;
    rol?: string;
    recorridoActual?: Recorrido;
}

export interface Recorrido {
    domicilio?: string;
    hora?: string;
    destino?: string;
    email?: string;
    chofer?: string;
}
