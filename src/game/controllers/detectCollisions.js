export function detectProjectileEnemy(projectiles, enemies) {

  // Keep track of new enemies killed
  let enemiesKilled = 0;

  // For every projectile...
  for (let k1 = 0; k1 < projectiles.length; k1++) {

    // For every enemy...
    for (let k2 = 0; k2 < enemies.length; k2++) {

      // Get projectile and enemy objects
      const proj = projectiles[k1];
      const enemy = enemies[k2];

      // If their boundary boxes overlap...
      if (isRectOverlap(proj.getBoundaryBox(), enemy.getBoundaryBox())) {

        // Remove the projectile and enemy because it died
        proj.remove();
        enemy.remove();
        projectiles.splice(k1, 1);
        enemies.splice(k2, 1);

        // Increment new enemies killed
        enemiesKilled++;

        // Projectile is depleted, don't check other enemies
        break;

      }

    }

  }

  return enemiesKilled;
}

export function detectPlayerEnemy(player, enemies, collisionHandler) {

  // For every enemy...
  for (let k = 0; k < enemies.length; k++) {

    // Get enemy object
    const enemy = enemies[k];

    // If player and enemy boundary boxes overlap...
    if (isRectOverlap(player.getBoundaryBox(), enemy.getBoundaryBox())) {

      // Player dies
      collisionHandler();

      // Player is defeated, don't check other enemies
      break;

    }

  }

}

// Detect overlapping rectangles
function isRectOverlap(rectA, rectB) {
  const overlapX = rectA.left < rectB.right && rectA.right > rectB.left;
  const overlapY = rectA.top < rectB.bottom && rectA.bottom > rectB.top;
  return overlapX && overlapY;
}