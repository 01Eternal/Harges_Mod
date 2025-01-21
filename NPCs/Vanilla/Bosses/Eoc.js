/** @format */

import { using } from '../../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework');
using('TL');

const NewProjectile =
	Projectile[
		'int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'
	];

const vector2 = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x, y);
const Multiply = Vector2['Vector2 Multiply(Vector2 value1, float scaleFactor)'];
const Normalize = Vector2['Vector2 Normalize(Vector2 value)'];
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];

export default class Eoc extends GlobalNPC {
	constructor() {
		super();
	}

	SetDefaults(npc) {
		if (npc.type === 4) {
			npc.life *= 1.15;
			npc.lifeMax *= 1.15;
			this.weakDash = null;
			this.strongDash = null;
			this.inPhaseTranslation = null;
			this.inPhase4 = null;
			this.RotateDelay = 0;
			this.RotatePi = 0;
			this.NotHaveAlpha = false;
			this.rotateCount = 1;
			this.rotateDir = true;
			this.minionSpawnDelay = 0;
		}
	}

	AI(npc) {
		if (npc.type == 4) {
			if (Main.player[Main.myPlayer].statLife === 0) return;
			
			let damage = 15; // 50
			const ShootSpikeInAllDirections = (value = 10) => {
				const Direction = [vector2(value, 0), vector2(-value, 0), vector2(0, value), vector2(0, -value), vector2(-value, -value), vector2(value, value)];

				Direction.forEach((dir, i) => {
					NewProjectile(Projectile.GetNoneSource(), npc.Center, dir, ModProjectile.getTypeByName('BloodSpike'), damage, 0, Main.myPlayer, 0, 0, 0);
				});
			};

			const MakeRedCircleWarn = () => {
				return NewProjectile(Projectile.GetNoneSource(), npc.Center, vector2(0, 0), ModProjectile.getTypeByName('RedGlowRing'), 25, 0, Main.myPlayer, 0, 0, 0);
			};

			const ShootFallSpike = (quantity = 3) => {
				for (let i = 0; i < quantity; i++) {
					NewProjectile(
						Projectile.GetNoneSource(),
						npc.Center,
						vector2(npc.velocity.X + i * 2 * npc.direction, npc.velocity.Y - 7),
						ModProjectile.getTypeByName('BloodSpike'),
						damage,
						0,
						Main.myPlayer,
						0,
						0,
						0
					);
				}
			};

			const player = Main.player[npc.target];

			const RotateInPlayer = (distance = 600, speed = 0.1) => {
				if (!player || player.dead) return;

				const playerPosition = player.Center;

				if (this.rotateDir == true) {
					this.RotatePi += speed;
					if (this.RotatePi > Math.PI * 2) this.RotatePi -= Math.PI * 2;
				}
				if (this.rotateDir == false) {
					this.RotatePi -= speed;
					if (this.RotatePi < -Math.PI * 2) this.RotatePi += Math.PI * 2;
				}

				const newX = playerPosition.X + Math.cos(this.RotatePi) * distance;
				const newY = playerPosition.Y + Math.sin(this.RotatePi) * distance;
				npc.position = vector2(newX - npc.width / 2, newY - npc.height / 2);
				npc.ai[1] = 0;
			};

			if (!this.lastAtack) {
				this.weakDash = npc.ai[1] == 2 && npc.ai[2] == 1;
				this.strongDash = npc.ai[1] == 4 && npc.ai[2] == 1;
				this.inPhaseTranslation = npc.ai[0] == 2 ? true : false;
				this.inPhase4 = npc.life < npc.lifeMax * 0.4;

				// Main.NewText(`RotateTime : ${this.RotateTime}\n RotateDelay : ${this.RotateDelay} \n rotateCount : ${this.rotateCount}`, 255, 255, 255);

				// npc.ai[1]= 2 // Lock he

				// Main.NewText(`${this.rotateCount}`, 255, 255, 255);
				// const phase_3 = npc.ai[0] == 3;

				if (this.NotHaveAlpha) {
					if (npc.alpha < 255) npc.alpha += 2;
				} else {
					if (npc.alpha > 0) npc.alpha -= 3;
				}

				// No Black eye : )
				if (npc.alpha > 255) npc.alpha = 255;
				if (npc.alpha < 0) npc.alpha = 0;

				if (this.weakDash) {
					MakeRedCircleWarn();

					if (!this.inPhase4) {
						ShootFallSpike(4);
					} else {
					}
				}
				if (this.strongDash) {
					MakeRedCircleWarn();
					if (!this.inPhase4) {
						ShootSpikeInAllDirections(15);
					} else {
						if (this.rotateCount == 3) {
							ShootSpikeInAllDirections(15);
						}
					}
				}

				if (this.inPhase4) {
					const AI_EspecialDashs = () => {
						if (this.RotateTime > 0) {
							this.minionSpawnDelay++;
							if (this.minionSpawnDelay == 30) {
								this.minionSpawnDelay = 0;
								NPC.NewNPC(npc.GetSpawnSourceForNPCFromNPCAI(), npc.Center.X, npc.Center.Y, 5, 0, 0, 0, 0, 0, Main.myPlayer);
							}
							/**
							 * @summary Enable The RotateDelay With Velocity And Radius
							 */
							const Radius = 400;
							const Velocity = 0.07; // old 0.05
							RotateInPlayer(Radius, Velocity);

							/**
							 * @summary logic for Especial dash And RotateDelay
							 */

							/**
							 * @summary Stop Dashs and Time
							 */
							npc.ai[2] = 0; // Stop Dash Timer
							npc.ai[3] = 0; // Stop Dashs (Lock in phase 0)

							/**
							 * @summary Dash It's In Enabled - 5 Ticks of delay.
							 */
							if (this.RotateTime === 5) {
								this.rotateDir = !this.rotateDir;
								// MakeRedCircleWarn();
								// Increment The Special Dashs Counter
								// this.rotateCount++;
							}

							this.NotHaveAlpha = true;
						} else {
							// if rotate no it's Enabled
							this.NotHaveAlpha = false;
							this.RotateDelay++;
						}

						if (this.rotateCount === 1) {
							if (npc.ai[2] > 0 && npc.ai[3] === 1) {
								this.RotateTime = 200;
								this.rotateCount = 2;
							}
						} else if (this.rotateCount === 2) {
							if (npc.ai[2] > 0 && npc.ai[3] === 2) {
								ShootFallSpike(6);
								this.RotateTime = 200;
								this.rotateCount = 3;
							}
						} else if (this.rotateCount === 3) {
							if (npc.ai[2] > 0 && npc.ai[3] === 3) {
								this.RotateTime = 200;
								this.rotateCount = 1;
							}
						}
					};

					AI_EspecialDashs();

					if (this.RotateTime > -1) this.RotateTime--;
					if (this.RotateTime === 0) npc.ai[2] = 400;

					// Verify if npc dash Timer i bigger of 5 and the boss dash is equal 0
					if (npc.ai[2] > 5 && npc.ai[3] === 0) {
						// Main.NewText(`called NPC active rotate`, 255, 255, 255);

						/**
						 * @summary Every 7 Seconds Start de AI_EspecialDashs()
						 */
						if (this.RotateDelay >= 60 * 2) {
							this.RotateDelay = 0;
							this.RotateTime = 200;
						}
					}
				} else {
					/**
					 * @summary Reset Values else inPhase4
					 */
					this.NotHaveAlpha = false;
					this.RotateDelay = 0;
					this.RotateTime = 0;
				}

				if (!this.inPhaseTranslation && !this.weakDash) {
					npc.rotation = Utils.ToRotation(Subtract(player.position, npc.Center)) + -Math.PI / 2;
				}
			}
		}
	}

	OnHitPlayer(npc, player) {
		if (npc.type === 4) {
			player.AddBuff(BuffID.BrokenArmor, 60 * 15, true, false);
			player.AddBuff(BuffID.CursedInferno, 60 * 3, true, false);
			player.AddBuff(BuffID.Obstructed, 60 * 2, true, false);
		}
	}
}