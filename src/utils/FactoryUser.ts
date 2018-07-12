import { UserFb } from "../models/user-fb";

export class FactoryUser {

    static crearUsuario(usuario: UserFb) {
        switch (usuario.rol) {
            case 'cliente':
                return new Cliente(usuario)
            case 'chofer':
                return new Chofer(usuario)
            case 'supervisor':
                return new Supervisor(usuario)
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
        )
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
}

export class Chofer extends User {
    textos = {
        headerRange: '',
        headerRadio: '',
        headerSelect: '',
        headerCheck: '',
        headerComentario: ''
    }
    constructor(usuario: UserFb) {
        super(usuario);
        this.formulario = this.crearFormulario();

    }
}


export class Supervisor extends User {
    textos = {
        headerRange: '',
        headerRadio: '',
        headerSelect: '',
        headerCheck: '',
        headerComentario: ''
    }
    constructor(usuario: UserFb) {
        super(usuario);
        this.formulario = this.crearFormulario();

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