/** @format */

import { using } from '../../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Terraria.ID');
using('TL');
using('Harges');
const { vector2, generic } = Harges;

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
			this.SpikeRainDelay++;
			this.canHeadProj++;
			this.inJump = npc.ai[0] == -15;
			this.inSuperJump = npc.ai[2] == 0;

			const ShootSpikeAllDir = (projID = ModProjectile.getTypeByName('FallingSlime')) => {
				let damage = 10;
				const everyDir = [
					vector2.instance(-15, 0),
					vector2.instance(15, 0),
					vector2.instance(15, 15),
					vector2.instance(-15, 15),
					vector2.instance(15, -15),
					vector2.instance(-15, 15)
				];

				everyDir.forEach(dir => {
					generic.NewProjectileSimple(npc.Center, dir, projID, damage);
				});
			};

			const MakeBlueCircleWarn = (Position = npc.Center) => generic.NewProjectileSimple(Position, vector2.instance(0, 0), ModProjectile.getTypeByName('BlueGlowRing'), 25);

			const ShootRainHeadSpikes = (quantity = 5, projID = ModProjectile.getTypeByName('FallingSlime')) => {
				let damage = 17;
				for (let i = 0; i < quantity; i++) {
					generic.NewProjectileSimple(
						vector2.instance(Main.player[Main.myPlayer].Center.X - 40 + Math.random() * 80, Main.player[Main.myPlayer].Center.Y - 500 + Math.random() * 30),
						vector2.instance(0, 7),
						projID,
						damage
					);
				}
			};

			const ShootFallRainSpikes = (quantity = 3, projID = ModProjectile.getTypeByName('FallingSlime')) => {
				let damage = 10;
				for (let i = 0; i < quantity; i++) {
					generic.NewProjectileSimple(
						vector2.instance(
							this.FallDir ? Main.player[Main.myPlayer].Center.X - 512 + i * 75 : Main.player[Main.myPlayer].Center.X + 512 - i * 75,
							Main.player[Main.myPlayer].Center.Y - 400 - i * 30
						),
						vector2.instance(0, 5),
						projID,
						damage
					);
				}
			};

			const SimpleAI = () => {
				// @TODO Games laggy will be cause a projectile overloaded
				if (this.canHeadProj % 300 === 0) ShootRainHeadSpikes(5, ModProjectile.getTypeByName('SlimySpike'));
				if (this.SpikeRainDelay % 200 === 0) ShootFallRainSpikes(14);
				if (this.inJump) ShootSpikeAllDir();
			};

			const SmashJump = () => {
				this.canRainProj--;
				this.smashJumpDelay++;

				let Distance = 300;
				let PrePos = vector2.instance(Main.player[0].position.X, Main.player[0].position.Y - Distance);

				if (this.canSaveSmashPos) {
					this.SmashPos = PrePos;
				}

				if (this.smashJumpDelay === 360) MakeBlueCircleWarn(this.SmashPos);

				if (this.smashJumpDelay > 360) {
				    
				    
					let moveDirection = vector2.Normalize(vector2.Subtract(this.SmashPos, npc.position));
					let speed = 25;

					npc.velocity = vector2.Multiply(moveDirection, speed);

					if (Math.abs(npc.position.X - this.SmashPos.X) < 10 && Math.abs(npc.position.Y - this.SmashPos.Y) < 10) {
						this.smashJumpDelay = 0;
						this.canStomp = true;
						this.FallDir = !this.FallDir;
					}
				}

				if (this.canStomp) {
					npc.velocity = vector2.instance(0, Math.abs(npc.velocity.Y));
					if (npc.velocity.Y === 0) {
						ShootFallRainSpikes(14);
						this.canStomp = false;
						this.smashJumpDelay = 0;
						this.canSaveSmashPos = true;
					}
				}
			};

			SimpleAI();
			if (npc.life < npc.lifeMax * 0.8) SmashJump();
		}
	}

	OnHitPlayer(npc, player) {
		if (npc.type === 50) player.AddBuff(BuffID.Slimed, 60 * 10, true, false);
	}
}
