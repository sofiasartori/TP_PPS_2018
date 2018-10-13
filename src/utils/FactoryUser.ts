import { UserFb } from "../models/user-fb";
import firebase from 'firebase';
import { ConfigProvider } from "../providers/config";
import { StringsL } from "../providers/Strings";
export class FactoryUser {

    static crearUsuario(usuario: UserFb, stringsL: StringsL) {
        switch (usuario.rol) {
            case 'cliente':
                return new Cliente(usuario, stringsL);
            case 'chofer':
                return new Chofer(usuario, stringsL);
            case 'supervisor':
                return new Supervisor(usuario, stringsL);
            case 'su':
                return new SuperUser(usuario, stringsL);
        }
    }
}

export class User {

    rol: string;
    user: string
    formulario: FormularioEncuesta;
    email;
    stringsL;
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

    constructor(usuario: UserFb, stringsL: StringsL) {
        this.stringsL = stringsL;
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
    direccion = '';
    constructor(usuario: UserFb, stringsL: StringsL) {
        super(usuario, stringsL);
        this.textos = {
            headerRange: this.stringsL.q_estado_auto[this.stringsL.lenguaje],
            headerRadio: this.stringsL.qviajar_con_nosotros[this.stringsL.lenguaje],
            headerSelect: this.stringsL.qparecio_el_viaje[this.stringsL.lenguaje],
            headerCheck: '¿Llego en tiempo?',
            headerComentario: this.stringsL.Ingrese_un_comentario[this.stringsL.lenguaje],
            encuestaButton1: 'Hacer encuesta del viaje',
            encuestaButton2: 'Ver datos del chofer'
        }
        this.direccion = '';
        this.sideMenu = [
            // { title: 'Login', component: "SigninPage" },
            { title: this.stringsL.Inicio[this.stringsL.lenguaje], component: "HomeClientePage" },
            { title: this.stringsL.Mis_datos[this.stringsL.lenguaje], component: "AccountPage" },
            { title: this.stringsL.Reservar_auto[this.stringsL.lenguaje], component: "ReservaClientePage" },
            { title: this.stringsL.Mis_reservas[this.stringsL.lenguaje], component: "MisReservasClientePage" },
            { title: this.stringsL.Encuesta[this.stringsL.lenguaje], component: "EncuestaClienteQrPage" },
            { title: this.stringsL.Mapa[this.stringsL.lenguaje], component: "MapaRutaPage" },
            { title: "Ver datos del chofer", component: "AllLeerQrPage" }
        ];
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

    hasType = false;
    constructor(usuario: UserFb, stringsL: StringsL) {
        super(usuario, stringsL);
        this.textos = {
            headerRange: 'Estado de las cubiertas',
            headerRadio: 'Vidrios limpios',
            headerSelect: 'Estado de limpieza interna',
            headerCheck: '¿Tanque lleno?',
            headerComentario: this.stringsL.Ingrese_un_comentario[this.stringsL.lenguaje],
            encuestaButton1: this.stringsL.Empezar_a_trabajar[this.stringsL.lenguaje],
            encuestaButton2: ''
        }
        this.sideMenu = [
            // { title: 'Login', component: "SigninPage" },
            // { title: 'SignUp', component: "SignupPage" },
            { title: this.stringsL.Mis_datos[this.stringsL.lenguaje], component: "AccountPage" },
            { title: this.stringsL.Inicio[this.stringsL.lenguaje], component: "HomeClientePage" },
            // { title: this.stringsL.Reservar_auto[this.stringsL.lenguaje], component: "ReservaClientePage" },
            { title: 'Reservas', component: "ChoferListaViajesPendientesPage" },
            { title: this.stringsL.Encuesta[this.stringsL.lenguaje], component: "EncuestaClienteQrPage" },
            { title: this.stringsL.Empezar_a_trabajar[this.stringsL.lenguaje], component: "AllLeerQrPage" }
        ];
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

    hasType = false;
    constructor(usuario: UserFb, stringsL: StringsL) {
        super(usuario, stringsL);
        this.textos = {
            headerRange: 'Nivel de satisfaccion',
            headerRadio: 'A tiempo',
            headerSelect: 'Comportamiento',
            headerCheck: 'Cumplio las expectativas',
            headerComentario: this.stringsL.Ingrese_un_comentario[this.stringsL.lenguaje],
            encuestaButton1: '',
            encuestaButton2: ''

        }
        this.sideMenu = [
            // { title: 'Login', component: "SigninPage" },
            // { title: 'SignUp', component: "SignupPage" },
            { title: 'Bienvenido', component: "HomeSupervisorPage" },
            { title: this.stringsL.Mis_datos[this.stringsL.lenguaje], component: "AccountPage" },
            { title: 'Alta Chofer', component: "AltaChoferesPage" },
            { title: 'Alta Auto', component: "AltaAutoPage" },
            { title: 'SupListaChoferPage', component: "SupListaChoferPage" },
            { title: 'SupListaAutosPage', component: "SupListaAutosPage" },
            { title: 'SupEncuestaPage', component: "SupEncuestaPage" },
            // { title: 'Alta Auto', component: "AltaAutoPage" },
            { title: "Reservas", component: "SupListaViajesPage" },
            { title: this.stringsL.Viajes_pendientes[this.stringsL.lenguaje], component: "SuListaViajesPendientesPage" },
            { title: "Leer QR", component: "AllLeerQrPage" }

        ];
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


    hasType = false;
    constructor(usuario: UserFb, stringsL: StringsL) {
        super(usuario, stringsL);
        this.sideMenu = [
            // { title: 'Login', component: "SigninPage" },
            // { title: 'SignUp', component: "SignupPage" },
            { title: this.stringsL.Mis_datos[this.stringsL.lenguaje], component: "AccountPage" },
            { title: 'SuListUsersPage', component: "SuListUsersPage" }
            // { title: 'Alta Chofer', component: "AltaChoferesPage" },
            // { title: 'Alta Auto', component: "AltaAutoPage" }
        ];
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