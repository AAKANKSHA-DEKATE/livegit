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
let battleLog = [];

adjustHealthBars(chosenPlayerHealth);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  }
  if (ev === EVENT_LOG_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if(ev === EVENT_LOG_PLAYER_STRONG_ATTACK) {
    logEntry.target = 'MONSTER'; 
  } else if(ev === EVENT_LOG_MONSTER_ATTACK) {
    logEntry.target = 'PLAYER';
  } else if (ev === EVENT_LOG_PLAYER_HEAL) {
    logEntry.target = 'PLAYER';
  } else if (ev === EVENT_LOG_GAME_OVER) {
    logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
    }
  }
 battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenPlayerHealth;
  currentPlayerHealth = chosenPlayerHealth;
  resetGame(chosenPlayerHealth);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog (EVENT_LOG_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth)

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert ('You would have been dead but the bonus life saved you.')
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Win');
    writeToLog (EVENT_LOG_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth)
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert ('You Lost');
    writeToLog (EVENT_LOG_GAME_OVER, 'PLAYER LOST', currentMonsterHealth, currentPlayerHealth)
    reset();play
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert ('You have a Draw');
    writeToLog (EVENT_LOG_GAME_OVER, 'A DRAW', currentMonsterHealth, currentPlayerHealth)
    reset();
  }
}

function attackMonster(mode) {
 
  // Also can be done using ternary operator as shown below
  // const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  // const logEvent = mode === MODE_ATTACK ? EVENT_LOG_PLAYER_ATTACK : EVENT_LOG_PLAYER_STRONG_ATTACK;

  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = EVENT_LOG_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = EVENT_LOG_PLAYER_STRONG_ATTACK;
  }
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  writeToLog (logEvent, monsterDamage, currentMonsterHealth, currentPlayerHealth)
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
  writeToLog (EVENT_LOG_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth)
  endRound();
}

function printLogHandler() {
  for (i = 0; i < 3; i++) {
    console.log('-------');
  }
  console.log(battleLog)
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healHandler)
logBtn.addEventListener('click', printLogHandler)