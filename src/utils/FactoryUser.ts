import { UserFb } from "../models/user-fb";
import firebase from 'firebase';
import { ConfigProvider } from "../providers/config";
export class FactoryUser {

    static crearUsuario(usuario: UserFb) {
        switch (usuario.rol) {
            case 'cliente':
                return new Cliente(usuario);
            case 'chofer':
                return new Chofer(usuario);
            case 'supervisor':
                return new Supervisor(usuario);
            case 'su':
                return new SuperUser(usuario);
        }
    }
}

export class User {

    rol: string;
    user: string
    formulario: FormularioEncuesta;
    email;
    sideMenu: Array<{ title: string, component: string }>;
    textos: {
        headerRange: string,
        headerRadio: string,
        headerSelect: string,
        headerCheck: string,
        headerComentario: string,
        encuestaButton1: string,
        encuestaButton2: string
    };

    constructor(usuario: UserFb) {
        this.rol = usuario.rol;
        this.user = usuario.user;
        this.email = usuario.email;
        // this.sideMenu = sideMenu;
    }
    crearFormulario() {
        return new FormularioEncuesta(
            this.textos.headerRange,
            this.textos.headerRadio,
            this.textos.headerSelect,
            this.textos.headerCheck,
            this.textos.headerComentario,
            this.textos.encuestaButton1,
            this.textos.encuestaButton2
        );
    }
    guardarEncuesta(range, radio, select, check, comentario, options: OptionsUsuario): firebase.database.ThenableReference {
        return null;
    }

    traerEncuestas(objetoAMedir: string): firebase.database.Reference {
        return null;
    }
}

export class Cliente extends User {
    textos = {
        headerRange: '¿Que le parecio el estado del auto?',
        headerRadio: '¿Volveria a viajar con nosotros?',
        headerSelect: '¿Que le parecio el viaje?',
        headerCheck: '¿Llego en tiempo?',
        headerComentario: 'Ingrese un comentario',
        encuestaButton1: 'Hacer encuesta del viaje',
        encuestaButton2: 'Ver datos del chofer'
    }
    direccion = '';
    sideMenu = [
        // { title: 'Login', component: "SigninPage" },
        { title: 'Mis datos', component: "AccountPage" },
        { title: 'Inicio', component: "HomeClientePage" },
        { title: 'Reservar auto', component: "ReservaClientePage" },
        { title: 'Mis reservas', component: "MisReservasClientePage" },
        { title: 'Encuesta', component: "EncuestaClienteQrPage" },
        { title: "Mapa", component: "MapaRutaPage" },
        { title: "Leer QR", component: "AllLeerQrPage" }
    ];
    constructor(usuario: UserFb) {
        super(usuario);
        this.formulario = this.crearFormulario();
        this.sideMenu = this.sideMenu;
        this.direccion = usuario.direccion;
    }
    guardarEncuesta(range, radio, select, check, comentario, options: OptionsUsuario) {
        const data = {
            range: range,
            radio: radio,
            select: select,
            check: check,
            comentario: comentario,
            objMedido: options.objetoAMedir,
            usuario: this.user
        };
        const refEncuestaUsuario = firebase.database().ref('encuestas/clientes/' + options.objetoAMedir);
        return refEncuestaUsuario.push(data);
    }
    traerEncuestas(objetoAMedir: string): firebase.database.Reference {
        return firebase.database().ref('encuestas/clientes/' + objetoAMedir);
    }

}

export class Chofer extends User {
    textos = {
        headerRange: 'Estado de las cubiertas',
        headerRadio: 'Vidrios limpios',
        headerSelect: 'Estado de limpieza interna',
        headerCheck: '¿Tanque lleno?',
        headerComentario: 'Ingrese un comentario',
        encuestaButton1: 'Empezar a trabajar',
        encuestaButton2: ''
    }
    sideMenu = [
        // { title: 'Login', component: "SigninPage" },
        // { title: 'SignUp', component: "SignupPage" },
        { title: 'Mis datos', component: "AccountPage" },
        { title: 'Inicio', component: "HomeClientePage" },
        // { title: 'Reservar auto', component: "ReservaClientePage" },
        // { title: 'Mis reservas', component: "MisReservasClientePage" },
        { title: 'Encuesta', component: "EncuestaClienteQrPage" },
        { title: "Leer QR", component: "AllLeerQrPage" }
    ];
    hasType = false;
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
            objMedido: options.objetoAMedir,
            usuario: this.user
        };
        const refEncuestaUsuario = firebase.database().ref('encuestas/choferes/' + options.objetoAMedir);
        return refEncuestaUsuario.push(data);
    }
    traerEncuestas(objetoAMedir: string): firebase.database.Reference {
        return firebase.database().ref('encuestas/clientes/' + objetoAMedir)
    }
}


export class Supervisor extends User {
    textos = {
        headerRange: 'Nivel de satisfaccion',
        headerRadio: 'A tiempo',
        headerSelect: 'Comportamiento',
        headerCheck: 'Cumplio las expectativas',
        headerComentario: 'Ingrese un comentario',
        encuestaButton1: '',
        encuestaButton2: ''

    }
    sideMenu = [
        // { title: 'Login', component: "SigninPage" },
        // { title: 'SignUp', component: "SignupPage" },
        { title: 'Bienvenido', component: "HomeSupervisorPage" },
        { title: 'Alta Chofer', component: "AltaChoferesPage" },
        { title: 'Alta Auto', component: "AltaAutoPage" },
        { title: 'SupListaChoferPage', component: "SupListaChoferPage" },
        { title: 'SupListaAutosPage', component: "SupListaAutosPage" },
        { title: 'SupEncuestaPage', component: "SupEncuestaPage" },
        // { title: 'Alta Auto', component: "AltaAutoPage" },
        { title: "Reservas", component: "SupListaViajesPage" },
        { title: "Viajes Pendientes", component: "SuListaViajesPendientesPage" },
        { title: "Leer QR", component: "AllLeerQrPage" }

    ];
    hasType = false;
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
            objMedido: options.objetoAMedir,
            tipo: options.tipo,
            usuario: this.user
        };
        const refEncuestaUsuario = firebase.database().ref('encuestas/supervisores/' + options.objetoAMedir);
        return refEncuestaUsuario.push(data);
    }
    traerEncuestas(objetoAMedir: string): firebase.database.Reference {
        return firebase.database().ref('encuestas/supervisores/' + objetoAMedir)
    }
}

export class SuperUser extends User {

    sideMenu = [
        // { title: 'Login', component: "SigninPage" },
        // { title: 'SignUp', component: "SignupPage" },
        { title: 'SuListUsersPage', component: "SuListUsersPage" }
        // { title: 'Alta Chofer', component: "AltaChoferesPage" },
        // { title: 'Alta Auto', component: "AltaAutoPage" }
    ];
    hasType = false;
    constructor(usuario: UserFb) {
        super(usuario);
    }
}

export class FormularioEncuesta {

    headerRange: string;
    headerRadio: string;
    headerSelect: string;
    headerCheck: string;
    headerComentario: string;
    hasType = true;
    encuestaButton1?: string;
    encuestaButton2?: string;

    constructor(headerRange: string,
        headerRadio: string,
        headerSelect: string,
        headerCheck: string,
        headerComentario: string,
        encuestaButton1: string,
        encuestaButton2: string) {
        this.headerRange = headerRange;
        this.headerRadio = headerRadio;
        this.headerSelect = headerSelect;
        this.headerCheck = headerCheck;
        this.headerComentario = headerComentario;
        this.encuestaButton1 = encuestaButton1;
        this.encuestaButton2 = encuestaButton2;
    }
}

export interface OptionsUsuario {
    tipo?: string;
    usuario?: string;
    objetoAMedir?: string;
}