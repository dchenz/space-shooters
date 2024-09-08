let playerDelay = 0;

export function startPlayerAttack(player, projectiles) {
  // If the mouse is down...
  if (player.getAttackingStatus()) {
    // And the cooldown is over...
    if (playerDelay % player.getAttackRate() == 0) {
      // ATTACK!!!
      const p = player.attack();
      projectiles.push(p);
    }

    // Increment cooldown
    playerDelay++;
  } else {
    // Reset cooldown if the mouse is up
    playerDelay = 0;
  }
}
