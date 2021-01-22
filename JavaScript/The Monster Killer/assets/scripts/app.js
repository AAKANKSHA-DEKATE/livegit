const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const HEAL_VALUE = 23; 
const MONSTER_ATTACK_VALUE = 14;
const enteredNumber = prompt('Maximum health value for you and the monster','100');

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1
const EVENT_LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const EVENT_LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const EVENT_LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const EVENT_LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const EVENT_LOG_GAME_OVER = 'GAME_OVER';

let chosenPlayerHealth = parseInt(enteredNumber);
if (isNaN(chosenPlayerHealth) || chosenPlayerHealth <= 0) {
  chosenPlayerHealth = 100;
}

let currentMonsterHealth = chosenPlayerHealth;
let currentPlayerHealth = chosenPlayerHealth;
let hasBonusLife = true;

adjustHealthBars(chosenPlayerHealth);

function reset() {
  currentMonsterHealth = chosenPlayerHealth;
  currentPlayerHealth = chosenPlayerHealth;
  resetGame(chosenPlayerHealth);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert ('You would have been dead but the bonus life saved you.')
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Win');
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert ('You Lost');
    reset();
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert ('You have a Draw');
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  endRound();
  }

function attackHandler() {
  attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenPlayerHealth - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.")
    healValue = chosenPlayerHealth - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healHandler)