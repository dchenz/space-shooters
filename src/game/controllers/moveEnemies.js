export function moveEnemies(enemies, maxY, reachBottomHandler) {
  // For every enemy on the screen...
  for (let k = 0; k < enemies.length; k++) {
    // Get the enemy object
    const enemy = enemies[k];

    // Advance it forwards using its respective function...
    const y = enemy.advance();

    // Remove if the enemy has reached bottom of screen
    if (y + enemy.getHeight() > maxY) {
      enemy.remove();
      enemies.splice(k, 1);
      reachBottomHandler();
    }
  }
}
