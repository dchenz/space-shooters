export function moveProjectiles(projectiles, maxX, maxY) {
  // Move all active projectiles forward
  for (let k = 0; k < projectiles.length; k++) {
    // Get projectile object
    const proj = projectiles[k];

    // Move it forward
    const [x, y] = proj.tick();

    // Delete the projectile if it goes out-of-bounds
    if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
      proj.remove();
      projectiles.splice(k, 1);
    }
  }
}
