const pet = document.getElementById("pet");
const gameArea = document.getElementById("game-area");

let lastLeft = parseFloat(getComputedStyle(pet).left);
let asleep = false;
let direction = ""; // Default direction
let sleepIndex = 1;
const petSprite = document.getElementById("pet-sprite");
let sleepInterval = null;
function sleepAnim(direction, isAsleep) {
    if (direction == "right") {
       
        petSprite.style.transform = "scaleX(1)";  // Ensure pet sprite stays correct
      } else  {
        petSprite.style.transform = "scaleX(-1)";  // Ensure pet sprite stays correct
      }
  
    // Stop previous interval if running
    if (sleepInterval) {
      clearInterval(sleepInterval);
      sleepInterval = null;
    }
  
    if (isAsleep) {
      sleepInterval = setInterval(() => {
        petSprite.src = `sleep-z-${direction}-${sleepIndex}.png`;
        sleepIndex++;
        if (sleepIndex == 4) {
          sleepIndex = 1;
        }
      }, 1000);
    } else {
      petSprite.src = `pet-right-awake.png`;
    }
  }
  
function changeSleepSprite(condition) {
    if (condition == "asleep") {
        sleepAnim(direction, true); // Start sleep animation
    }
    else if (condition == "awake") {
        sleepAnim(direction, false); // Stop sleep animation
        petSprite.src = 'pet-right-awake.png'; // Change to awake sprite
    movePetRandomly(); // Resume random movement
    }
    petSprite.style.left = `${lastLeft}px`; // Keep the last left position
}
function movePetRandomly() {
if (!asleep) {
  const areaWidth = gameArea.clientWidth;
  const petWidth = pet.clientWidth;

  const randomLeft = Math.random() * (areaWidth - petWidth);

  // Determine direction
  if (randomLeft > lastLeft) {
    direction= "right";
    pet.style.transform = "scaleX(1)"; // Facing right
    console.log(direction);
  } else {
    direction= "left";
    pet.style.transform = "scaleX(-1)"; // Facing left (flipped)
    console.log(direction);

  }

  // Move pet
  pet.style.left = `${randomLeft}px`;
  lastLeft = randomLeft;

  pet.addEventListener('transitionend', function onTransitionEnd() {
    // Trigger sleep animation after the movement is finished
    if (asleep) {
      changeSleepSprite("asleep"); // Start sleep animation after the move
    }

    // Remove the event listener after the transition ends
    pet.removeEventListener('transitionend', onTransitionEnd);
  });


  const delay = Math.random() * 3000 + 3000;
  setTimeout(movePetRandomly, delay);
}
}
document.getElementById("sleep").addEventListener("click", function() {
asleep = true;
pet.addEventListener('transitionend', function onTransitionEnd() {
    // Trigger sleep animation after the movement is finished
    changeSleepSprite("asleep");
    pet.removeEventListener('transitionend', onTransitionEnd);
  });


}) 
document.getElementById("wake").addEventListener("click", function() {
asleep = false;
changeSleepSprite("awake");

})
movePetRandomly();
