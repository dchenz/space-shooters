import Enemy from "../objects/enemy";

let spawnDelay = 0;
let nextSpawnTime = Math.ceil(30 + Math.random() * 120);

export function spawnEnemies(stage, enemies, minX, maxX) {

  if (spawnDelay > nextSpawnTime) {

    // Get random X position to spawn new enemy
    const spawnPositionX = minX + Math.random() * maxX;
    const spawnPositionY = 0;
    const newEnemy = new Enemy(stage, spawnPositionX, spawnPositionY);
    enemies.push(newEnemy);

    // Reset spawn delay counter
    spawnDelay = 0;
    nextSpawnTime = Math.ceil(30 + Math.random() * 120);

  }

  // Increment the counter
  spawnDelay++;

}