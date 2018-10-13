import { Injectable } from '@angular/core';


@Injectable()
export class StringsL {

    // stringsL.variable[stingsL.lenguaje]
    // stringsL.variable[stingsL.lenguaje]

    lenguaje = 'espanol'

    lenguajes = [
        'espanol',
        'Ingles',
        'Aleman',
        'Frances',
        'Portugues',
        'Ruso',
    ];

    Bienvenido = {
        espanol: 'Bienvenidos',
        Ingles: 'Welcome',
        Aleman: 'Willkommen',
        Frances: 'Bienvenue',
        Portugues: 'Bem vindo',
        Ruso: 'добро пожаловать'
    };

    Usuario = {
        espanol: 'Usuario',
        Ingles: 'User',
        Aleman: 'Benutzer',
        Frances: 'Utilisateur',
        Portugues: 'Utilizador',
        Ruso: 'пользователь'
    };

    Contrasenia = {
        espanol: 'Contrasenia',
        Ingles: 'Password',
        Aleman: 'Passwort',
        Frances: 'Mot de passe',
        Portugues: 'Password',
        Ruso: 'пароль'
    };

    Iniciar_Sesion = {
        espanol: 'Iniciar Sesion',
        Ingles: 'Log in',
        Aleman: 'Einloggen',
        Frances: 'Commencer la session',
        Portugues: 'Iniciar sessão',
        Ruso: 'Войти'
    };

    Soy_Nuevo = {
        espanol: 'Soy Nuevo',
        Ingles: 'Registrer',
        Aleman: 'Registrieren',
        Frances: "S'inscrire",
        Portugues: 'Registrar',
        Ruso: 'Регистрация'
    };

    Iniciando_sesion = {
        espanol: 'Iniciando sesion',
        Ingles: 'Loging in',
        Aleman: 'Beginn der Sitzung',
        Frances: 'Session de départ',
        Portugues: 'Começando sessão',
        Ruso: 'начальная сессия'
    };


    Mis_datos = {
        espanol: 'Mis datos',
        Ingles: 'My profile',
        Aleman: 'Meine daten',
        Frances: 'Mes données',
        Portugues: 'Meus dados',
        Ruso: 'мои данные'
    };

    Inicio = {
        espanol: 'Inicio',
        Ingles: 'Home',
        Aleman: 'Zuhause',
        Frances: 'La maison',
        Portugues: 'Lar',
        Ruso: 'инициирование'
    };

    Reservar_auto = {
        espanol: 'Reservar auto',
        Ingles: 'Reserve a car',
        Aleman: 'Auto reservieren',
        Frances: 'Voiture de réserve',
        Portugues: 'Carro reserva',
        Ruso: 'Резервный автомобиль'
    };

    Mis_reservas = {
        espanol: 'Mis reservas',
        Ingles: 'My reservations',
        Aleman: 'Meine bedenken',
        Frances: 'Mes réservations',
        Portugues: 'Minhas reservas',
        Ruso: 'мои оговорки'
    };

    Encuesta = {
        espanol: 'Encuesta',
        Ingles: 'Poll',
        Aleman: 'Umfrage',
        Frances: 'Enquête',
        Portugues: 'Enquete',
        Ruso: 'опрос общественного мнения'
    };

    Ver_datos_del_chofer = {
        espanol: 'Ver datos del chofer',
        Ingles: "See driver's data",
        Aleman: 'Siehe daten des treibers',
        Frances: 'Voir les données du conducteur',
        Portugues: 'Veja os dados do driver',
        Ruso: 'См. Данные драйвера'
    };

    Mapa = {
        espanol: 'Mapa',
        Ingles: 'Map',
        Aleman: 'Karte',
        Frances: 'Carte',
        Portugues: 'Mapear',
        Ruso: 'карта'
    };


    Mis_pedidos = {
        espanol: 'Mis pedidos',
        Ingles: 'My orders',
        Aleman: 'Meine Befehle',
        Frances: 'Mes commandes',
        Portugues: 'Minhas ordens',
        Ruso: 'мои заказы'
    };

    Origen = {
        espanol: 'Origen',
        Ingles: 'Origin',
        Aleman: 'Herkunft',
        Frances: 'Origine',
        Portugues: 'Origem',
        Ruso: 'источник'
    };

    Destino = {
        espanol: 'Destino',
        Ingles: 'Destination',
        Aleman: 'Schicksal',
        Frances: 'Destin',
        Portugues: 'Destino',
        Ruso: 'назначения'
    };

    Hora = {
        espanol: 'Hora',
        Ingles: 'Time',
        Aleman: 'Stunde',
        Frances: 'Heure',
        Portugues: 'Hora',
        Ruso: 'время'
    };

    Chofer = {
        espanol: 'Chofer',
        Ingles: 'Driver',
        Aleman: 'Fahrer',
        Frances: 'Conducteur',
        Portugues: 'Motorista',
        Ruso: 'водитель'
    };

    Estado = {
        espanol: 'Estado',
        Ingles: 'Status',
        Aleman: 'Status',
        Frances: 'Statut',
        Portugues: 'Status',
        Ruso: 'cостояние'
    };

    Pedir_Auto = {
        espanol: 'Pedir Auto',
        Ingles: 'Ask for a car',
        Aleman: 'Fragen sie nach einem auto',
        Frances: 'Demander une voiture',
        Portugues: 'Pedir um carro',
        Ruso: 'спросить машину'
    };

    Cancelar = {
        espanol: 'Cancelar',
        Ingles: 'Cancel',
        Aleman: 'Abbrechen',
        Frances: 'Annuler',
        Portugues: 'Cancelar',
        Ruso: 'отменить'
    };


    Mi_cuenta = {
        espanol: 'Mi cuenta',
        Ingles: 'My account',
        Aleman: 'Mein konto',
        Frances: 'Mon compte',
        Portugues: 'Minha conta',
        Ruso: 'мой аккаунт'
    };

    Email = {
        espanol: 'Email',
        Ingles: 'E-mail',
        Aleman: 'E-mail',
        Frances: 'Email',
        Portugues: 'E-mail',
        Ruso: 'по электронной почте'
    };

    Direccion = {
        espanol: 'Direccion',
        Ingles: 'Address',
        Aleman: 'Richtung',
        Frances: 'Adresse',
        Portugues: 'Direção',
        Ruso: 'адрес'
    };


    Cambiar_contrasenia = {
        espanol: 'Cambiar contraseña',
        Ingles: 'Change password',
        Aleman: 'Passwort ändern',
        Frances: 'Changer le mot de passe',
        Portugues: 'Mudar senha',
        Ruso: 'сменить пароль'
    };

    Cerrar_Sesion = {
        espanol: 'Cerrar Sesion',
        Ingles: 'Log out',
        Aleman: 'Sitzung schließen',
        Frances: 'Fermer la session',
        Portugues: 'Fechar Sessão',
        Ruso: 'закрытие сессии'
    };


    Agendar_viaje = {
        espanol: 'Agendar viaje',
        Ingles: 'Schedule trip',
        Aleman: 'Reise planen',
        Frances: 'Planifier le voyage',
        Portugues: 'Viagem programada',
        Ruso: 'расписание поездки'
    };

    Terminar = {
        espanol: 'Terminar',
        Ingles: 'End',
        Aleman: 'Fertig',
        Frances: 'Finir',
        Portugues: 'Terminar',
        Ruso: 'конец'
    };

    Desde = {
        espanol: 'Desde',
        Ingles: 'From',
        Aleman: 'Aus',
        Frances: 'De ',
        Portugues: 'De',
        Ruso: 'от'
    };

    Hasta = {
        espanol: 'Hasta',
        Ingles: 'To',
        Aleman: 'Up',
        Frances: 'En haut',
        Portugues: 'Para cima',
        Ruso: 'вверх'
    };

    Hora_llegada = {
        espanol: 'Hora llegada',
        Ingles: 'Arrival time',
        Aleman: 'Ankunftszeit',
        Frances: "Heure d'arrivée",
        Portugues: 'Horário de chegada',
        Ruso: 'время прибытия'
    };


    q_estado_auto = {
        espanol: '¿Que le parecio el estado del auto?',
        Ingles: 'What do you think of the state of the car?',
        Aleman: 'Was denkst du über den Zustand des Autos?',
        Frances: "Qu'as-tu pensé de l'état de la voiture?",
        Portugues: 'O que você achou do estado do carro?',
        Ruso: 'Что вы думаете о состоянии автомобиля?'
    };
    qviajar_con_nosotros = {
        espanol: '¿Volvería a viajar con nosotros?',
        Ingles: 'Would you will travel with us again?',
        Aleman: 'Würdest du wieder mit uns reisen?',
        Frances: 'Voulez-vous voyager avec nous à nouveau?',
        Portugues: 'Você viajaria conosco novamente?',
        Ruso: 'Не могли бы вы снова поехать с нами?'
    };

    qparecio_el_viaje = {
        espanol: '¿Qué le pareció el viaje?',
        Ingles: 'What do you think of the trip?',
        Aleman: 'Was hast du von der Reise gehalten?',
        Frances: "Qu'as-tu pensé du voyage?",
        Portugues: 'O que você achou da viagem?',
        Ruso: 'Что вы думаете о поездке?'
    };

    Valorizacion = {
        espanol: 'Valorizacion',
        Ingles: 'Valorization',
        Aleman: 'Valorisierung',
        Frances: 'Valorisation',
        Portugues: 'Valorização',
        Ruso: 'госценообразование'
    };

    Ingrese_un_comentario = {
        espanol: 'Ingrese un comentario',
        Ingles: 'Enter a comment',
        Aleman: 'Geben Sie einen Kommentar ein',
        Frances: 'Entrez un commentaire',
        Portugues: 'Digite um comentário',
        Ruso: 'Введите комментарий'
    };

    Comentario = {
        espanol: 'Comentario',
        Ingles: 'Comment',
        Aleman: 'Kommentar',
        Frances: 'Commentaire',
        Portugues: 'Comentário',
        Ruso: 'комментарий'
    };


    Viajes_pendientes = {
        espanol: 'Viajes pendientes',
        Ingles: 'Pending trips',
        Aleman: 'Ausstehende reisen',
        Frances: 'Voyages en attente',
        Portugues: 'Viagens pendentes',
        Ruso: 'ожидающие поездки'
    };

    Cliente = {
        espanol: 'Cliente',
        Ingles: 'Customer',
        Aleman: 'Kunde',
        Frances: 'Client',
        Portugues: 'Cliente',
        Ruso: 'клиент'
    };

    Empezar_a_trabajar = {
        espanol: 'Empezar a trabajar',
        Ingles: 'Start working',
        Aleman: 'Fange an zu arbeiten',
        Frances: 'Commencer à travailler',
        Portugues: 'Começar a trabalhar',
        Ruso: 'Начните работать'
    };

    Ver_o_completar_encuesta = {
        espanol: 'Ver o completar encuesta',
        Ingles: 'See or complete poll',
        Aleman: 'Umfrage ansehen oder vervollständigen',
        Frances: 'Voir ou compléter le sondage',
        Portugues: 'Visualizar ou concluir a pesquisa',
        Ruso: 'Просмотр или полное обследование'
    };

    Agregar_chofer = {
        espanol: 'Agregar chofer',
        Ingles: 'Add driver',
        Aleman: 'Treiber hinzufügen',
        Frances: 'Ajouter un pilote',
        Portugues: 'Adicionar motorista',
        Ruso: 'Добавить драйвер'
    };

    Agregar_auto = {
        espanol: 'Agregar auto',
        Ingles: 'Add car',
        Aleman: 'Auto hinzufügen',
        Frances: 'Ajouter une voiture',
        Portugues: 'Adicionar carro',
        Ruso: 'Добавить автомобиль'
    };

    Nombre = {
        espanol: 'Nombre',
        Ingles: 'Name',
        Aleman: 'Name',
        Frances: 'Nom',
        Portugues: 'Nome',
        Ruso: 'имя'

    };
    Apellido = {
        espanol: 'Apellido',
        Ingles: 'Surname',
        Aleman: 'Nachname',
        Frances: 'Le nom',
        Portugues: 'Sobrenome',
        Ruso: 'фамилия'
    };

    Crear_Chofer = {
        espanol: 'Crear chofer',
        Ingles: 'Create Driver',
        Aleman: 'Treiber erstellen',
        Frances: 'Créer un pilote',
        Portugues: 'Criar motorista',
        Ruso: 'создать драйвер'
    };

    Sacar_foto = {
        espanol: 'Sacar foto',
        Ingles: 'Take a picture',
        Aleman: 'Foto machen',
        Frances: 'Prendre photo',
        Portugues: 'Tirar foto',
        Ruso: 'Снять фотографию'
    };


    Marca = {
        espanol: 'Marca',
        Ingles: 'Brand',
        Aleman: 'Markieren',
        Frances: 'Marquer',
        Portugues: 'Marca',
        Ruso: 'знак'
    };

    Modelo = {
        espanol: 'Modelo',
        Ingles: 'Model',
        Aleman: 'Modell',
        Frances: 'Modèle',
        Portugues: 'Modelo',
        Ruso: 'модель'
    };

    Anio = {
        espanol: 'Anio',
        Ingles: 'Year',
        Aleman: 'Jahr',
        Frances: 'Année',
        Portugues: 'Ano',
        Ruso: 'год'
    };

    Patente = {
        espanol: 'Patente',
        Ingles: 'Patent',
        Aleman: 'Patent',
        Frances: 'Brevet',
        Portugues: 'Patente',
        Ruso: 'патент'
    };
    Idioma = {
        espanol: 'Idioma',
        Ingles: 'Language',
        Aleman: 'Sprache',
        Frances: 'langage',
        Portugues: 'Idioma',
        Ruso: 'язык'
    };

    Guardar_auto = {
        espanol: 'Guardar auto',
        Ingles: 'Save car',
        Aleman: 'Auto sparen',
        Frances: 'Sauver la voiture',
        Portugues: 'Salvar carro',
        Ruso: 'сохранить автомобиль'
    };

    Guardar = {
        espanol: 'Guardar',
        Ingles: 'Save',
        Aleman: 'Sparen',
        Frances: 'Sauver',
        Portugues: 'Salvar',
        Ruso: 'экономить'
    };

    LISTA_CHOFERES = {
        espanol: 'LISTA CHOFERES',
        Ingles: 'Drivers list',
        Aleman: 'Fahrerliste',
        Frances: 'Liste des pilotes',
        Portugues: 'Lista de condutores',
        Ruso: 'список драйверов'
    };

    ELIMINAR = {
        espanol: 'ELIMINAR',
        Ingles: 'Delete',
        Aleman: 'Beseitigen',
        Frances: 'Éliminer',
        Portugues: 'Eliminar',
        Ruso: 'удаление'
    };


    Habilitar = {
        espanol: 'Habilitar',
        Ingles: 'Enable',
        Aleman: 'Aktivieren',
        Frances: 'Permettre',
        Portugues: 'Habilitar',
        Ruso: 'включить'
    };

    Deshabilitar = {
        espanol: 'Deshabilitar',
        Ingles: 'Disable',
        Aleman: 'Deaktivieren',
        Frances: 'Désactiver',
        Portugues: 'Desativar',
        Ruso: 'запрещать'
    };

    Leer_QR = {
        espanol: 'Leer QR',
        Ingles: 'Scan QR',
        Aleman: 'Lesen sie QR',
        Frances: 'Lire QR',
        Portugues: 'Leia QR',
        Ruso: 'читать qr'
    };

    Lista_autos = {
        espanol: 'Lista autos',
        Ingles: 'Car list',
        Aleman: 'Auto-Liste',
        Frances: 'Liste de voiture',
        Portugues: 'Lista de carros',
        Ruso: 'список автомобилей'
    };

    Reservas = {
        espanol: 'Reservas',
        Ingles: 'Reservations',
        Aleman: 'Reserven',
        Frances: 'Les réserves',
        Portugues: 'Reservas',
        Ruso: 'Бронирование'
    };

    Elegir_en_el_mapa = {
        espanol: 'Elegir en el mapa',
        Ingles: 'Choose in map',
        Aleman: 'Wählen sie auf der karte',
        Frances: 'Choisissez sur la carte',
        Portugues: 'Escolha no mapa',
        Ruso: 'Выберите на карте'
    };

    Ubicacion_actual = {
        espanol: 'Ubicación actual',
        Ingles: 'Actual location',
        Aleman: 'Aktueller Standort',
        Frances: 'Situation actuelle',
        Portugues: 'Localização atual',
        Ruso: 'текущее местоположение'
    };

    Ruta = {
        espanol: 'Ruta',
        Ingles: 'Route',
        Aleman: 'Pfad',
        Frances: 'Chemin',
        Portugues: 'Caminho',
        Ruso: 'маршрут'
    };

    Editar = {
        espanol: 'Editar',
        Ingles: 'Edit',
        Aleman: 'Bearbeiten',
        Frances: 'Éditer',
        Portugues: 'Editar',
        Ruso: 'редактировать'
    };

    Modificar_foto = {
        espanol: 'Modificar foto',
        Ingles: 'Modify photo',
        Aleman: 'Foto ändern',
        Frances: 'Modifier la photo',
        Portugues: 'Modificar foto',
        Ruso: 'Изменить фотографию'
    };
    constructor() {

    }
}
