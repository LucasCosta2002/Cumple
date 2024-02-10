document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const message = document.getElementById('messageTrampa');

    noBtn.addEventListener('mouseenter', () => {
        // Calcula máximos para x e y teniendo en cuenta el tamaño del botón
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;

        // Genera una posición aleatoria dentro de los límites de la ventana
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noBtn.style.position = 'fixed'; // Usa posicionamiento fijo para facilitar el movimiento
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });

    yesBtn.addEventListener('click', () => {
        message.textContent = 'jajaja lo sabia, te amo ❤️';
        noBtn.style.display = 'none';
    });
});

document.getElementById('yesBtn').addEventListener('click', function() {
    createConfetti();
});

function createConfetti() {
    const confettiCount = 630; // Más confeti para un efecto más lleno
    const confettiContainer = document.getElementById('confetti-container');
    const shapes = ['circle', 'rectangle', 'strip']; // Diferentes formas

    for (let i = 0; i < confettiCount; i++) {
        const confettiPiece = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confettiPiece.classList.add('confetti-piece', shape);
        confettiContainer.appendChild(confettiPiece);

        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`; // Colores más brillantes
        const animation = confettiPiece.animate([
            { transform: 'translateY(-30px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 3000,
            easing: 'ease-out',
            iterations: 1
        });
        animation.onfinish = () => confettiPiece.remove();
    }
}


var swiper = new Swiper(".swiper", {
    effect: "cards",
    grabCursor: true,
    initialSlide: 1,
    autoplay: true,
    speed: 500,
    loop: true,
    rotate: true,
    mousewheel: {
    invert: false,
  },
});

(function () {
	window.onload = () => {
		const obj = document.querySelector("#gallery");
		const img = document.querySelector("figure");

		const time = 10000;
		function animStart() {
			if (obj.classList.contains("active") == false) {
				obj.classList.add("active");
				setTimeout(() => {
					animEnd();
				}, time);
			}
		}
		function animEnd() {
			obj.classList.remove("active");
			obj.offsetWidth;
		}
		document.addEventListener("scroll", function () {
			// scroll or scrollend
			animStart();
		});

		window.addEventListener("resize", animStart);
		animStart();
	};
})();


const icons = ["❤️", "🌹", "🍫", "🍦", "🎈", "🎁", "❤️", "🌹", "🍫", "🍦", "🎈", "🎁"];
let revealedCards = [];
let matchedPairs = 0;
let gameStarted = false;
let timerId;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(icon) {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = icon;
    card.onclick = () => revealCard(card, icon);
    return card;
}

function revealCard(card, icon) {
    if (card.classList.contains("revealed") || revealedCards.length === 2) {
        return;
    }

    card.classList.add("revealed");
    revealedCards.push({ card, icon });

    if (revealedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = revealedCards;

    if (firstCard.icon === secondCard.icon) {
        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === icons.length / 2) {
            document.getElementById("invitation").style.display = "block";
            startConfetti();
        }
    } else {
        firstCard.card.classList.remove("revealed");
        secondCard.card.classList.remove("revealed");
    }

    revealedCards = [];
}

function startConfetti() {
    const totalConfetti = 500;
    const delay = 6; // Duración más corta de la animación para cada confeti
    
    document.getElementById("timer").style.display = "none";
    for (let i = 0; i < totalConfetti; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.animation = `confetti-animation ${delay}s linear infinite`;
            document.body.appendChild(confetti);
        }, delay / totalConfetti * i * 1000); // Emite confeti en intervalos regulares
    }
}

const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
    if (!gameStarted) {
        gameStarted = true;
        initializeGame();
    }
})

function initializeGame() {
    shuffleArray(icons);
    const gameContainer = document.getElementById("gameContainer");
    icons.forEach(icon => {
        gameContainer.appendChild(createCard(icon));
    });
    startTimer();
}

function startTimer() {
    let timeRemaining = 40;
    timerId = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerId);
            endGame();
        } else {
            const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
            const seconds = String(timeRemaining % 60).padStart(2, '0');
            document.getElementById("timer").textContent = `${minutes}:${seconds}`;
            timeRemaining--;
        }
    }, 1000);
}

function endGame() {
    if (matchedPairs !== icons.length / 2) {
        document.getElementById("gameContainer").style.display = "none";
        document.getElementById("timer").style.display = "none";
        document.getElementById("invitation").innerHTML = "Se terminó el tiempo. <br> Como premio de consolación te ganase una cena conmigo 🎁";
        document.getElementById("invitation").style.display = "block";
        startConfetti();
    }
}

const fechaObjetivo = new Date('July 3, 2024 00:00:00').getTime();

  function actualizarContador() {
    const fechaActual = new Date().getTime();

    const diferencia = fechaObjetivo - fechaActual;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('contador').innerHTML = `${dias} días ${horas}hs ${minutos}m ${segundos}s para vernos 😢`;

    // Verificamos si la fecha objetivo ha pasado
    if (diferencia < 0) {
      clearInterval(intervalo);  // Detenemos el intervalo cuando la fecha objetivo ha pasado
      document.getElementById('contador').innerHTML = "ES HOOOOOOOOOOOOOOOOOOOOOY";
    }
}
let intervalo = setInterval(actualizarContador, 1000);

var swiperCube = new Swiper(".mySwiperCube", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
});