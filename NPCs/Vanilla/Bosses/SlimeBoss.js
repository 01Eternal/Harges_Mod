/** @format */

import { using } from '../../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework');
using('TL');

const NewProjectile = Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];

const vector2 = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x, y);
const Multiply = Vector2['Vector2 Multiply(Vector2 value1, float scaleFactor)'];
const Normalize = Vector2['Vector2 Normalize(Vector2 value)'];
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];

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
			this.canShootProjInAllDir = false;
		}

		if (npc.type === 535) {
			npc.life *= 5;
			npc.lifeMax *= 5;
		}
	}

	AI(npc) {
		if (npc.type == 50) {
			this.SpikeRainDelay++;
			this.inJump = npc.ai[0] == -15; // -300 to -1
			this.inSuperJump = npc.ai[2] == 0; // in Big jump
			this.inPhase2 = npc.life < npc.lifeMax * 0.8;

			const ShootSpikeAllDir = (projID = ModProjectile.getTypeByName('SlimySpike')) => {
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

			const ShootFallSpike = (quantity = 3, projID = ModProjectile.getTypeByName('SlimySpike')) => {
				let damage = 10;
				for (let i = 0; i < quantity; i++) {
					NewProjectile(
						Projectile.GetNoneSource(),
						vector2(Main.player[Main.myPlayer].Center.X - 512 + i * 75, Main.player[Main.myPlayer].Center.Y - 400),
						vector2(0, 1),
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
				if (this.SpikeRainDelay % 200 === 0) ShootFallSpike(14);
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

				let Distance = 280; //px

				let PrePos = vector2(Main.player[0].position.X, Main.player[0].position.Y - Distance);

				if (this.canSaveSmashPos) {
					this.SmashPos = PrePos;
				}

				// Main.NewText(`${this.smashJumpDelay}`, 255, 255, 255);

				if (this.smashJumpDelay === 360) MakeBlueCircleWarn(this.SmashPos);

				if (this.smashJumpDelay > 360) {
					npc.ai[0] = -150;
					this.canSaveSmashPos = false;
				} else this.canSaveSmashPos = true;

				if (this.smashJumpDelay === 400) {
					npc.position = this.SmashPos;
					this.smashJumpDelay = 0;
					npc.velocity = vector2(npc.velocity.X, npc.velocity.Y + 8000);
					this.canStomp = true;
				}

				if (this.canStomp === true && npc.velocity.Y === 0) {
					ShootFallSpike(14);
					this.canStomp = false;
				}
			};

			if (this.inPhase2) SmashJump();
			// if (this.inPhase2) {
			// 					Main.NewText(`Called`, 255, 255, 255);
			// 				}
			SimpleAI();
		}
	}

	OnHitPlayer(npc, player) {
		player.AddBuff(BuffID.Slimed, 60 * 10, true, false);
	}
}
