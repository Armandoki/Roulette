import loseSound1 from '../static/sounds/lose1.mp3'
import loseSound2 from '../static/sounds/lose2.mp3'
import loseSound3 from '../static/sounds/lose3.mp3'
import loseSound4 from '../static/sounds/lose4.mp3'
import loseSound5 from '../static/sounds/lose5.mp3'
import loseSound6 from '../static/sounds/lose6.mp3'
import winSound1 from '../static/sounds/win1.mp3'
import winSound2 from '../static/sounds/win2.mp3'
import winSound3 from '../static/sounds/win3.mp3'
import winSound4 from '../static/sounds/win4.mp3'

//Escoge una letra al azar.
function generarLetra() {
    let letras = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let numero = (Math.random() * 15).toFixed(0);
    return letras[numero];
}

//Genera un color hexadecimal.
export function colorHEX() {
    let color = "";
    for (let i = 0; i < 6; i++) {
        color = color + generarLetra();
    }
    return "#" + color;
}

export function randomBackground() {
    return `background-${Math.round(Math.random() * (6 - 1) + 1)}`
}

export function randomLoseSound() {
    const loseSounds = [loseSound1, loseSound2, loseSound3, loseSound4, loseSound5, loseSound6]
    return loseSounds[Math.round(Math.random() * (5 - 0) + 0)]
}

export function randomWinSound() {
    const winSounds = [winSound1, winSound2, winSound3, winSound4]
    return winSounds[Math.round(Math.random() * (3 - 0) + 0)]
}