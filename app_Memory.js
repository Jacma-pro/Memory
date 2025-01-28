let stock = null;
let cpt = 0;
const body = document.querySelector('body');

// Titre
const h1 = document.createElement('h1');
h1.innerText = "Memory";
body.appendChild(h1);

// Bouton
const button = document.createElement('button');
button.innerText = "Start a game !";
body.appendChild(button);

const restartButton = document.createElement('button');
restartButton.innerText = "start a new game !";
restartButton.style.display = "none"; // Caché au début
body.appendChild(restartButton);

// Grille
const grid = document.createElement('div');
grid.classList.add('grid', 'hidden'); // La classe "hidden" va cacher la grille
body.appendChild(grid);

// Fonction initialiser jeu
function initializeGame() {
    grid.innerHTML = "";
    stock = null;
    cpt = 0;

    // Générer tableau mélangé
    const tab = [
        'red', 'blue', 'green', 'yellow', 'black', 'fuchsia', 
        'purple', 'orange', 'red', 'blue', 'green', 'yellow', 
        'black', 'fuchsia', 'purple', 'orange'
    ];
    tab.sort(() => Math.random() - 0.5);

    // Créer cartes
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundColor = tab[i];
        card.classList.add('card-not-used');

        card.style.transition = "transform 0.2s, filter 0.2s";

        // Effets survol
        card.addEventListener("mouseover", () => {
            if (card.classList.contains('card-not-used')) {
                card.style.transform = "scale(1.1)";
                card.style.filter = "brightness(0.8)";
            }
        });

        card.addEventListener("mouseout", () => {
            if (card.classList.contains('card-not-used')) {
                card.style.transform = "scale(1)";
                card.style.filter = "brightness(1)";
            }
        });

        // Gestion clic
        card.addEventListener("click", () => {
            cpt++;
            card.classList.remove('card-not-used');
            card.style.transform = "scale(1)";
            card.style.filter = "brightness(1)";

            if (stock === null) {
                stock = card;
            } else {
                if (tab[i] !== stock.style.backgroundColor) {
                    setTimeout(function () {
                        card.classList.add('card-not-used');
                        stock.classList.add('card-not-used');
                        stock = null;
                    }, 250);
                } else {
                    stock = null;
                }
            }

            if (document.querySelector('.card-not-used') === null) {
                setTimeout(function () {
                    alert('Bien joué, le jeu est terminé !');
                    alert('Vous avez fait : ' + cpt + ' clics.');

                    restartButton.style.display = "block";
                }, 250);
            }
        });
        grid.appendChild(card);
    }
}

// Bouton start game
button.addEventListener('click', () => {
    grid.classList.remove('hidden'); 
    button.style.display = 'none'; 
    initializeGame(); 
});

// Bouton start new game
restartButton.addEventListener('click', () => {
    initializeGame(); 
    restartButton.style.display = "none"; 
})