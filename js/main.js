// console.log('file working')

const overlay = document.getElementById('overlay');
const header = document.querySelector('.header');
const startGameBtn = document.querySelector('.btn__reset');
const phrases = document.getElementById('phrase').firstElementChild;
const keyboard = document.getElementById('qwerty');
const hearts = document.getElementsByClassName('tries');
const phraseList = [
    'code is fun',
    'team tree house',
    'javascript project',
    'practice all the time',
    'everyday code'
]

// CHECK SPACE AND SPECIAL CHARACTERS
const specialChar = `!@#$%^&*)(_+-=}{][\],./}) `;

let missed = 0;

// RETURN A RANDOM PHRASE FROM AN ARRAY
const randomPhraseArray = arr => {
    return arr[ Math.floor( Math.random() * arr.length ) ];
}

// DISPLAY THE PHRASE TO THE PAGE
const addPhraseToDisplay = phraseString => {
    for( let i = 0; i < phraseString.length; i++ ) {
        const li = document.createElement('li');
        if(specialChar.indexOf(phraseString[i]) === -1){
            li.textContent = phraseString[i];
            li.className = 'letter';
            phrases.appendChild(li);
        } else {
            li.className = 'space';
            phrases.appendChild(li);
        }
    }
}

// STARTS THE WHEEL OF SUCCESS GAME
startGameBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    header.style.animation = 'rightToLeft 1s'
    

    // PHRASES ANIMATION WILL ADD HERE
    
    // DELETES CLASS NON-NESSECERY CLASS NAME 
    if(overlay.className.match('win')) {
        overlay.classList.remove('win');
    } else if (overlay.className.match('lose')) {
        overlay.classList.remove('lose');
    }
    
    addPhraseToDisplay(randomPhraseArray(phraseList))
    letterAnimation()
})

// KEYBOARD DISPLAY CLICK HANDLER
keyboard.addEventListener('click', e => {
    
    const letter = e.target;
    // GET ALL THE BUTTONS
    if(e.target.tagName === 'BUTTON') {
        
        // IF NO MATCHES WITH CLICKED LETTER, LOSE THE HEART
        if( checkLetter(letter) === null ) {
            letter.className = 'wrong';
            letter.disabled = true;
            missed += 1;
            hearts[hearts.length - missed].firstElementChild.src = 'images/lostHeart.png'
            hearts[hearts.length - missed].firstElementChild.className = 'loseHeart'
            // hearts[hearts.length - missed].classList.add('shake')
        } else {
            letter.className = 'chosen';
            letter.disabled = true;
            
        }
    }
    checkWin();
});

// CHECK EACH BUTTON'S LETTER
const checkLetter = button => {
    const letters = phrases.children;
    let matched = null;
    
    for( let i = 0; i < letters.length; i++) {
        if( letters[i].textContent === button.textContent ) {
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
        console.log('length matched');
        overlay.classList.add('win');
        overlay.firstElementChild.textContent = 'you won!! play again?';
        overlay.style.display = 'flex';
        resetGame();

    // IF LOST ALL THE HEARTS, DISPLAY THE LOST
    } else if (missed > 4) {
        overlay.classList.add('lose');
        overlay.firstElementChild.textContent = 'you lose, try again?';
        overlay.lastElementChild.textContent = 'Restart';
        overlay.style.display = 'flex';
        resetGame();
    }
}

// RESETTING THE GAME
function resetGame() {
    phrases.innerHTML = '';
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
        heart.firstElementChild.src = 'images/liveHeart.png';
        heart.firstElementChild.classList.remove('loseHeart');
    }
}


// PHRASE ANIMATION

function letterAnimation() {
    // GET LETTER ARRAY
    const letters = document.querySelectorAll('li.letter');

    // COLOR CHANGE START 0 INDEX LETTER ARRAY
    setTimeout( ()=> {
        for(let i = 0; i < letters.length; i++) {

            // FUNCTION EXECUTE RIGHT AWAY AS FOR LOOP START
            ( (i) => {
                setTimeout(() => {
                    letters[i].style.backgroundColor = "var(--color-start)";
                }, i*100);
            })(i)

        }
    }, 800)

    // AFTER .1s DELAY COLOR CHANGE TO GRAY START 0 INDEX LETTER ARRAY
    setTimeout(() => {
        for(let i = 0; i < letters.length; i++) {

            // FUNCTION EXECUTE RIGHT AWAY AS FOR LOOP START
            ( (i) => {
                setTimeout(() => {
                    letters[i].style.backgroundColor = "var(--color-neutral-light)"
                }, i * 100 + 20);
            })(i)

        }
    }, 900);
}

















    //working
    // setTimeout( ()=> {
    //     for(let i = 0; i < letters.length; i++) {
    //         ( (i) => {
    //             setTimeout(() => {
    //                 letters[i].style.backgroundColor = "var(--color-start)";
    //             }, i*190);
    //         })(i)
    //     }
    //     for(let i = 0; i < letters.length; i++) {
    //         ( (i) => {
    //             setTimeout(() => {
    //                 letters[i].style.backgroundColor = "var(--color-neutral-light)"
    //             }, i * 190 + 100);
    //         })(i)
    //     }
    // }, 1000)
