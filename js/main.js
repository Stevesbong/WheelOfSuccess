// console.log('file working')

const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const phrases = document.getElementById('phrase').firstElementChild;
const startsGame = document.querySelector('.btn__reset');
const hearts = document.getElementsByClassName('tries');
const phraseList = [
    'codeisfun',
    'teamtreehouse',
    'javascriptproject',
    'practiceallthetime',
    'everydaycode'
]

let missed = 0;

// RETURN A RANDOM PHRASE FROM AN ARRAY
const randomPhraseArray = arr => {
    return arr[ Math.floor( Math.random() * arr.length ) ]
}

// DISPLAY THE PHRASE TO THE PAGE
const addPhraseToDisplay = phraseString => {
    for( let i = 0; i < phraseString.length; i++ ) {
        const li = document.createElement('li');
        li.textContent = phraseString[i];
        li.className = 'letter'
        phrases.appendChild(li);
    }
}

// CHECK EACH BUTTON'S LETTER
const checkLetter = button => {
    const letters = phrases.children;
    let matched = null;
    
    for( let i = 0; i < letters.length; i++) {
        if( letters[i].textContent === button ) {
            letters[i].classList.add('show');
            matched = letters[i].textContent;
        }
    }

    // RETURN A LETTER THAT MATCHES OR NOT TO DISPLAY HEARTS
    if(matched) {
        return matched;
    } else {
        return null;
    }

}

// CHECK THE STATUS OF GAME IF WIN, DISPLAY THE WON, ELSE DISPLAY THE LOST
const checkWin = () => {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');

    // IF THE EACH LENGTH IS SAME DISPLAY THE WON
    if (letter.length === show.length) {
        console.log('length matched')
        overlay.classList.add('win');
        overlay.firstElementChild.textContent = 'you won!! play again?';
        overlay.style.display = 'flex'
        resetGame();

    // IF LOST ALL THE HEARTS, DISPLAY THE LOST
    } else if (missed > 4) {
        overlay.classList.add('lose');
        overlay.firstElementChild.textContent = 'you lose, try again?';
        overlay.lastElementChild.textContent = 'Restart';
        overlay.style.display = 'flex'
        resetGame();
    }
}

// RESETTING THE GAME
function resetGame() {
    phrases.innerHTML = ''
    missed = 0;
    const buttons = document.querySelectorAll('button');

    // RESET THE BUTTON (DELETE CLASS AND ENABLE BUTTON)
    buttons.forEach( e => {
        if (e.className) {
            e.className = '';
            e.disabled = false;
        }
    })

    // RESET THE HEART BACK FROM GREY COLOR TO BLUE COLOR
    for(heart of hearts) {
        heart.firstElementChild.src = 'images/liveHeart.png'
    }
}

// STARTS THE WHEEL OF SUCCESS GAME
startsGame.addEventListener('click', () => {
    overlay.style.display = 'none'

    // DELETES CLASS NON-NESSECERY CLASS NAME 
    if(overlay.className.match('win')) {
        overlay.classList.remove('win')
    } else if (overlay.className.match('lose')) {
        overlay.classList.remove('lose')
    }

    addPhraseToDisplay(randomPhraseArray(phraseList))
})

// KEYBOARD DISPLAY CLICK HANDLER
keyboard.addEventListener('click', e => {
    
    const letter = e.target;
    // GET ALL THE BUTTONS
    if(e.target.tagName === 'BUTTON') {
        letter.className = 'chosen'
        letter.disabled = true;

        // IF NO MATCHES WITH CLICKED LETTER, LOSE THE HEART
        if( checkLetter(letter.textContent) === null ) {
            missed += 1;
            hearts[hearts.length - missed].firstElementChild.src = 'images/lostHeart.png'
            // hearts[hearts.length - missed].classList.add('shake')
        }
    }
    checkWin();
})