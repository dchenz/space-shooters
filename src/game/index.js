import { Application, Container, Text, TextStyle } from "pixi.js";
import {
  detectPlayerEnemy,
  detectProjectileEnemy,
} from "./controllers/detectCollisions";
import { moveEnemies } from "./controllers/moveEnemies";
import { moveProjectiles } from "./controllers/moveProjectiles";
import { startPlayerAttack } from "./controllers/playerAttack";
import { spawnEnemies } from "./controllers/spawnEnemies";
import loadGraphics from "./loader";
import Player from "./objects/player";

function runGame() {
  // Create the application that contains the game
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Load sprite graphics from files
  loadGraphics(setup);

  // Called when graphics are loaded
  function setup() {
    // Initialise game state
    const state = {
      app: app,
      playerScore: initPlayerScore(app),
      player: new Player(app.stage),
      projectiles: [],
      enemies: [],
    };

    // Start the game loop and maintain state
    app.ticker.add(() => gameLoop(state));
  }

  return app.view;
}

function gameLoop({ app, playerScore, player, projectiles, enemies }) {
  // Move all projectiles on the screen
  moveProjectiles(
    projectiles,
    app.renderer.view.width,
    app.renderer.view.height
  );

  // Move enemies on the screen, game over if reach bottom
  moveEnemies(enemies, app.renderer.view.height, () =>
    playerDie(app, playerScore, player)
  );

  // Detect collisions of projectiles and enemies
  const hits = detectProjectileEnemy(projectiles, enemies);

  // If new enemies were killed, increment the player score
  if (hits > 0) {
    playerScore.text = (parseInt(playerScore.text) + hits).toString();
  }

  // If the player is still alive...
  if (player.getAliveStatus()) {
    // Test for player attacks (mouse up or down?)
    startPlayerAttack(player, projectiles);

    // Spawn enemies randomly on the screen
    spawnEnemies(app.stage, enemies, 0, app.renderer.view.width);

    // Detect collisions of player and enemies
    detectPlayerEnemy(player, enemies, () =>
      playerDie(app, playerScore, player)
    );
  }
}

// Player animation effect, then end game
function playerDie(app, playerScore, player) {
  if (player.getAliveStatus()) {
    player.remove();
    endGame(app, playerScore);
  }
}

// Set player score to zero and add to stage
function initPlayerScore(app) {
  const score = new Text(
    "0",
    new TextStyle({
      fontFamily: "Bahnschrift, sans-serif",
      fontSize: 16,
      fill: "#fff",
    })
  );
  score.position.set(20, app.renderer.view.height - score.height - 20);
  app.stage.addChild(score);
  return score;
}

// Stop the ticker
// Display "Game Over" message
function endGame(app, playerScore) {
  const stats = getEndingStats(playerScore);
  stats.x = app.renderer.view.width / 2 - stats.width / 2;
  stats.y = app.renderer.view.height / 2 - stats.height / 2;
  app.stage.addChild(stats);
}

// Display the score/stats when the game ends
function getEndingStats(playerScore) {
  // Get the latest score and highest score (local storage)
  const scoreLatest = parseInt(playerScore.text);
  let scoreHighest = localStorage.getItem("highest-score");

  // Set highest score to latest score if there's no saved data
  // If new high score, save it to local storage
  if (scoreHighest === null || scoreLatest > scoreHighest) {
    scoreHighest = scoreLatest;
    localStorage.setItem("highest-score", scoreLatest.toString());
  }

  // Main title "GAME OVER"
  const title = new Text(
    "GAME OVER",
    new TextStyle({
      fontFamily: "Bahnschrift, sans-serif",
      fontSize: 48,
      fill: "#fff",
    })
  );

  // Show your latest score
  const scoreLatestTitle = new Text(
    `Your Score: ${scoreLatest}`,
    new TextStyle({
      fontFamily: "Bahnschrift, sans-serif",
      fontSize: 24,
      fill: "#aaa",
    })
  );
  scoreLatestTitle.position.set(0, title.height + 20);

  // Show your highest score
  const scoreHighestTitle = new Text(
    `High Score: ${scoreHighest}`,
    new TextStyle({
      fontFamily: "Bahnschrift, sans-serif",
      fontSize: 24,
      fill: "#aaa",
    })
  );
  scoreHighestTitle.position.set(
    0,
    title.height + scoreLatestTitle.height + 40
  );

  // Add the titles to a container and return it
  const container = new Container();
  container.addChild(title);
  container.addChild(scoreLatestTitle);
  container.addChild(scoreHighestTitle);

  return container;
}

export default runGame;
