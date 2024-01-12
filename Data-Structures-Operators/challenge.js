/////////////////////// Coding Challenge #1 //////////////////////////////////////////

// We're building a football betting app (soccer for my American friends 😅)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// GOOD LUCK 😀

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1)
const [players1, players2] = game.players; // array destructuring
console.log(players1, players2);

// 2)
// Whenever you hear 'remaining',  you can think of the rest syntax, ?
const [gk, ...fieldPlayers] = players1; // rest [pattern in destructuring]
console.log(gk, fieldPlayers);

// 3)
// const [allPlayers] = [players1, players2];
// console.log(allPlayers); // this is destructuring it

const allPlayers = [...players1, ...players2]; // this is spreading it
console.log(allPlayers);

// 4)
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5)
const {
  odds: { team1, x: draw, team2 },
} = game;

console.log(team1, draw, team2);

// 6)
const printGoals = function (...players) {
  //rest
  console.log(...players);
  for (let i = 0; i < players.length; i++) {
    console.log(`${players[i]}`);
  }
  console.log(`${players.length} goals were scored`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
printGoals(...game.scored); //spread

// 7)
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

// So, basically, we want this here to be evaluated when the result of this operation is true. And which is the logical operator that continues operation when the first value is true? Well, it's the and operator, right? The 'or' operator short circuits when the first value is true. This is not what we want, because then right now it would short circuit and this would not be evaluated. But in this case, when this is true, we actually want the evaluation to continue.

///////////////////////////////////////// Coding Challenge #2 ////////////////////////////////////

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1.Using entries gives you full access to the entire array {index, value}

for (const goal of game.scored.entries()) {
  // console.log(goal);
  console.log(`Goal ${goal[0] + 1} was scored by ${goal[1]} `);
}

// A better option would be destructuring, so it can be used directly without unnecessary complications
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2.
gameOdds = Object.entries(game.odds);
// console.log(gameOdds);
// avg=(team1 + team2) / 2;

let avg = 0;
for (const odd of gameOdds) {
  console.log(odd);
  avg += odd[1];
}
avg /= gameOdds.length;
console.log(gameOdds.length);
console.log(avg);

//  A shorter way would be to get the values directly
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

// 3;
for (const [team, odd] of gameOdds) {
  console.log(team, odd);
  const teamStr = team === 'x' ? 'draw' : `victory, ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

// BONUS:
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  // console.log(player);
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
  // console.log(scorers[player]);
}

console.log(scorers);
