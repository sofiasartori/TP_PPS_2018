import { UserFb } from "../models/user-fb";
import firebase from 'firebase';
export class FactoryUser {

    static crearUsuario(usuario: UserFb) {
        switch (usuario.rol) {
            case 'cliente':
                return new Cliente(usuario);
            case 'chofer':
                return new Chofer(usuario);
            case 'supervisor':
                return new Supervisor(usuario);
        }
    }
}

export class User {

    rol: string;
    formulario: FormularioEncuesta;
    textos: {
        headerRange: string,
        headerRadio: string,
        headerSelect: string,
        headerCheck: string,
        headerComentario: string
    };
    constructor(usuario: UserFb) {
        this.rol = usuario.rol;
    }
    crearFormulario() {
        return new FormularioEncuesta(
            this.textos.headerRange,
            this.textos.headerRadio,
            this.textos.headerSelect,
            this.textos.headerCheck,
            this.textos.headerComentario
        );
    }

}

export class Cliente extends User {
    textos = {
        headerRange: '',
        headerRadio: '¿Volveria a viajar con nosotros?',
        headerSelect: '¿Que le parecio el viaje?',
        headerCheck: '¿Llego en tiempo?',
        headerComentario: 'Ingrese un comentario'
    }
    constructor(usuario: UserFb) {
        super(usuario);
        this.formulario = this.crearFormulario();
    }
    guardarEncuesta(range, radio, select, check, comentario, options: OptionsUsuario) {
        const data = {
            range: range,
            radio: radio,
            select: select,
            check: check,
            comentario: comentario,
            objMedido: options.chofer,
            usuario: options.usuario
        };
        const refEncuestaUsuario = firebase.database().ref('encuestas/usuarios/' + options.usuario);
        refEncuestaUsuario.push(data);
    }

}

export class Chofer extends User {
    textos = {
        headerRange: 'Estado de las cubiertas',
        headerRadio: 'Vidrios limpios',
        headerSelect: 'Estado de limpieza interna',
        headerCheck: '¿Tanque lleno?',
        headerComentario: 'Ingrese un comentario'
    }
    constructor(usuario: UserFb) {
        super(usuario);
        this.formulario = this.crearFormulario();

    }
    guardarEncuesta(range, radio, select, check, comentario, options: OptionsUsuario) {
        const data = {
            range: range,
            radio: radio,
            select: select,
            check: check,
            comentario: comentario,
            objMedido: options.auto,
        };
        const refEncuestaUsuario = firebase.database().ref('encuestas/usuarios/' + options.usuario);
        refEncuestaUsuario.push(data);
    }
}


export class Supervisor extends User {
    textos = {
        headerRange: 'Nivel de satisfaccion',
        headerRadio: 'A tiempo',
        headerSelect: 'Comportamiento',
        headerCheck: 'Cumplio las expectativas',
        headerComentario: 'Ingrese un comentario'
    }
    constructor(usuario: UserFb) {
        super(usuario);
        this.formulario = this.crearFormulario();
    }
    guardarEncuesta(range, radio, select, check, comentario, options: OptionsUsuario) {
        const data = {
            range: range,
            radio: radio,
            select: select,
            check: check,
            comentario: comentario,
            objMedido: options.chofer || options.cliente,
            tipo: options.tipo
        };
        const refEncuestaUsuario = firebase.database().ref('encuestas/usuarios/' + options.usuario);
        refEncuestaUsuario.push(data);
    }
}

export class FormularioEncuesta {

    headerRange: string;
    headerRadio: string;
    headerSelect: string;
    headerCheck: string;
    headerComentario: string;

    constructor(headerRange: string,
        headerRadio: string,
        headerSelect: string,
        headerCheck: string,
        headerComentario: string) {
        this.headerRange = headerRange;
        this.headerRadio = headerRadio;
        this.headerSelect = headerSelect;
        this.headerCheck = headerCheck;
        this.headerComentario = headerComentario;
    }
}

export interface OptionsUsuario {
    tipo?: string;
    usuario?: string;
    chofer?: string;
    cliente?: string;
    auto?: string;
}