/** @format */

import { using } from '../../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework');
using('TL');
using('Terraria.ID');

const NewProjectile = Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];

const vector2 = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x, y);
const Multiply = Vector2['Vector2 Multiply(Vector2 value1, float scaleFactor)'];
const Normalize = Vector2['Vector2 Normalize(Vector2 value)'];
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];
const Lerp = Vector2['Vector2 Lerp(Vector2 value1, Vector2 value2, float amount)'];

export default class SlimeBoss extends GlobalNPC {
	constructor() {
		super();
	}

	SetDefaults(npc) {
		if (npc.type === 50) {
			npc.life *= 1.15;
			npc.lifeMax *= 1.15;
			this.inJump = null;
			this.inSuperJump = null;

			this.preJump = false;
			this.preSuperaJump = false;
			this.smashJumpDelay = 0;
			this.SmashPos = null;
			this.canSaveSmashPos = true;
			this.canStomp = false;
			this.canRainProj = 0;
			this.canHeadProj = 0;
			this.canShootProjInAllDir = false;
			this.FallDir = true;
		}

		if (npc.type === 535) {
			npc.life *= 5;
			npc.lifeMax *= 5;
		}
	}

	AI(npc) {
		if (npc.type == 50) {
			// Main.NewText(`${this.FallDir}`, 255, 255, 255);

			this.SpikeRainDelay++;
			this.canHeadProj++;
			this.inJump = npc.ai[0] == -15; // -300 to -1
			this.inSuperJump = npc.ai[2] == 0; // in Big jump
		

			const ShootSpikeAllDir = (projID = ModProjectile.getTypeByName('FallingSlime')) => {
				let damage = 10;

				// prettier ignore format
				const everyDir = [
					vector2(-15, 0), //
					vector2(15, 0),
					vector2(15, 15),
					vector2(-15, 15),
					vector2(15, -15),
					vector2(-15, 15)
				];

				everyDir.forEach((dir, i) => {
					NewProjectile(Projectile.GetNoneSource(), npc.Center, dir, projID, damage, 0, Main.myPlayer, 0, 0, 0);
				});
			};

			const MakeBlueCircleWarn = (Position = npc.Center) =>
				NewProjectile(Projectile.GetNoneSource(), Position, vector2(0, 0), ModProjectile.getTypeByName('BlueGlowRing'), 25, 0, Main.myPlayer, 0, 0, 0);

			const ShootRainHeadSpikes = (quantity = 5, projID = ModProjectile.getTypeByName('FallingSlime')) => {
				let damage = 17;
				for (let i = 0; i < quantity; i++) {
					NewProjectile(
						Projectile.GetNoneSource(),
						vector2(
							Main.player[Main.myPlayer].Center.X - 40 + Math.random() * 80, //
							Main.player[Main.myPlayer].Center.Y - 500 + Math.random() * 30
						),
						vector2(0, 7),
						projID,
						damage,
						0,
						Main.myPlayer,
						0,
						0,
						0
					);
				}
			};

			const ShootFallRainSpikes = (quantity = 3, projID = ModProjectile.getTypeByName('FallingSlime')) => {
				let damage = 10;
				for (let i = 0; i < quantity; i++) {
					NewProjectile(
						Projectile.GetNoneSource(),
						vector2(
							this.FallDir === true ? Main.player[Main.myPlayer].Center.X - 512 + i * 75 : Main.player[Main.myPlayer].Center.X + 512 - i * 75,
							Main.player[Main.myPlayer].Center.Y - 400 - i * 30
						),
						vector2(0, 5),
						projID,
						damage,
						0,
						Main.myPlayer,
						0,
						0,
						0
					);
				}
			};
			const SimpleAI = () => {
				/**
                @summary make 14 spikes in sky
            */
				if (this.canHeadProj % 300 === 0) ShootRainHeadSpikes(5, ModProjectile.getTypeByName('SlimySpike'))

				if (this.SpikeRainDelay % 200 === 0) ShootFallRainSpikes(14);
				/**
			     @summary make spike in all direction in Jump
			 */
				if (this.inJump) {
					ShootSpikeAllDir();
				}

				/**
			    @summary Make a Blue circle glow to see Pre Jump
			*/

				/*REMOVED 		if (npc.ai[0] <= -60 || this.inSuperJump) {
				// perfect pre Jump.
				if (this.preJump === false) {
					MakeBlueCircleWarn();
					this.preJump = true;
				}
			} else this.preJump = false; // Reset if no it's in Jump.
			*/
			};
			const SmashJump = () => {
				this.canRainProj--;
				Math.abs(this.canRainProj);
				this.smashJumpDelay++;

				let Distance = 300;
				let PrePos = vector2(Main.player[0].position.X, Main.player[0].position.Y - Distance);

				if (this.canSaveSmashPos) {
					this.SmashPos = PrePos;
				}

				if (this.smashJumpDelay === 360) MakeBlueCircleWarn(this.SmashPos);

				if (this.smashJumpDelay > 360) {
					let moveDirection = Normalize(Subtract(this.SmashPos, npc.position));
					let speed = 25;
					npc.velocity = Multiply(moveDirection, speed);

					if (Math.abs(npc.position.X - this.SmashPos.X) < 10 && Math.abs(npc.position.Y - this.SmashPos.Y) < 10) {
						this.smashJumpDelay = 0;
						this.canStomp = true;
						this.FallDir = !this.FallDir;
					}
				}

				if (this.canStomp === true) {
					npc.velocity = vector2(0, npc.velocity.Y < 0 ? -npc.velocity.Y : npc.velocity.Y);
					if (npc.velocity.Y === 0) {
						ShootFallRainSpikes(14);
						this.canStomp = false;
						this.smashJumpDelay = 0;
						this.canSaveSmashPos = true;
					}
				}
			};
			
			
                SimpleAI();
			    if (npc.life < npc.lifeMax * 0.8 ) SmashJump();

			// if (this.inPhase2) {
			// 					Main.NewText(`Called`, 255, 255, 255);
			// 				}
			
		}
	}

	OnHitPlayer(npc, player) {
		if (npc.type === 50) player.AddBuff(BuffID.Slimed, 60 * 10, true, false);
	}
}
