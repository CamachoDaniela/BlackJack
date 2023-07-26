const miModulo = (() => {
    'use strict'
    /*
    * 2C = Two of clubs (Treboles)
    * 2D = Two of diamonds (Diamantes)
    * 2H = Two of hearts (Corazones)
    * 2S = Two of spades (Espadas)
    */

    let deck = []
    const tipos = ['C', 'D', 'H', 'S'], especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    //Referencias del html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');
    //console.log(btnPedir);
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');

    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        // console.log({puntosJugadores});s
        puntosHtml.forEach(elem => elem.innerText = 0);
        // puntosHtml[0].innerText = 0;
        // puntosHtml[1].innerText = 0;
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
    //Esta funcion crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let especial of especiales) {
            for (let tipo of tipos) {
                deck.push(especial + tipo);
            }
        }

        //console.log(deck);
        //Esta funcion hace una barajada
        return _.shuffle(deck);
    }


    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        //console.log(deck);
        // console.log(carta); carta debe ser de la barajada
        return deck.pop(); //remueve el ultimo elemento del arreglo y lo regresa
    }


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);//substrae del string segun lo indicado
        return (isNaN(valor)) ? //necesito retornar un 11 o 10 en caso de que no sea un numero y el valor en caso de que si lo sea
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    //turno = primer jugador y el ultimo es el de la cumputadora
    const acomularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        //<img class="carta" src="assets/cartas/2C.png" alt="carta 2C"></img>
        //Creo un elemento tipo imagen
        const imgCarta = document.createElement('img');
        //le asigno la direccion de la imagen
        imgCarta.src = `assets/cartas/${carta}.png`;
        //le añado el estilo de la clase carta
        imgCarta.classList.add('carta');
        //le paso al div la imagen
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosMinimos === puntosComputadora) {
                alert("Nadie gana :c");
            } else if (puntosComputadora > 21) {
                alert("Jugador Gano");
            } else if (puntosMinimos > 21) {
                alert("Computadora Gano");
            } else {
                alert("Computadora Gano");
            }
        }, 1000);

    }



    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acomularPuntos(carta, puntosJugadores.length - 1);
            console.log(carta);
            crearCarta(carta, puntosJugadores.length - 1);

            // if (puntosMinimos > 21) {
            //     break;
            // }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }



    //Eventos

    //El evento listener recibe dos argumentos, el segundo es un callback
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        console.log(carta);
        const puntosJugador = acomularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    //turnoComputadora(21);

    // btnNuevo.addEventListener('click', () => {
    //console.clear();
    //     inicializarJuego();

    // });

    //lo unico que sera publico de mi patrón modulo
    return {
        nuevoJuego: inicializarJuego
    };
})();
