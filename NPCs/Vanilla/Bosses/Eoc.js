/** @format */

import { using } from '../../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('TL');
using('Terraria.ID');
using('Harges');

// onst { vector2, generic } = Harges;

let arenaTex = null;
export default class Eoc extends GlobalNPC {
	constructor() {
		super();
	}

	SetStaticDefaults() {
		arenaTex = tl.texture.load('Assets/AdditiveTextures/HardEdgeRing.png');
	}

	SetDefaults(npc) {
		if (npc.type === 4) {
			npc.life *= 0.8;
			npc.lifeMax *= 0.8;

			this.Phase1Dashing = null;
			this.Phase2Dashing = null;
			this.inPhaseTranslation = null;

			this.inPhase1 = null; // > 80%
			this.inPhase2 = null; // 80% to 50%

			this.DisableTranslation = true;
			this.canAnableTranslation = false;

			this.canSuperDash = false;
			this.superDashDelay = 0; // 0 to 30

			this.inPhase4 = null; // 40%

			this.RotateDelay = 0;
			this.RotateInPlayerPi = 0;
			this.NotHaveAlpha = false;
			this.rotateCount = 1;
			this.rotateDirection = true;
			this.minionSpawnDelay = 0;
			this.lerpSpeed = 0.1;

			this.finalPhase = false;
			this.finalPhaseRealTimer = 0;
			this.finalPhaseIsReal = false;
			this.finalArenaPosition = null;

			this.finalShoot = 0;
			this.finalArenaScale = 10;
			this.canFinalBulletHell = false;

			this.finalArenaRotation = 0;
		}
	}

	DrawExtra(npc) {
		let player = Main.player[Main.myPlayer];

		// ArenaLogic disable the arena if player died.
		if (Main.player[Main.myPlayer].statLife === 0) return (this.finalPhaseIsReal = false);
		if (this.finalArenaPosition == null) return;
		// if (this.finalPhaseIsReal) {
		this.finalShoot++;
		let arenaScreenPosition = vector2.Subtract(this.finalArenaPosition, Main.screenPosition);
		let arenaColor = color.instance(255, 0, 0, 255);

		this.finalArenaRotation += Math.random() * 0.35;
		if (this.finalArenaRotation > Math.PI * 2) this.finalArenaRotation = 0;

		generic.drawTexture(arenaTex, arenaScreenPosition, color.instance(255, 0, 0, 0), this.finalArenaRotation, vector2.getOrigin(arenaTex.Width, arenaTex.Height), this.finalArenaScale);

		const arenaColossion = () => {
			let arenaRadius = (arenaTex.Width / 2) * this.finalArenaScale * 0.92;
			let playerDistance = vector2.Distance(player.Center, this.finalArenaPosition);

			if (playerDistance > arenaRadius) {
				player.AddBuff(BuffID.Obstructed, 2, true, false);
				player.AddBuff(BuffID.Venom, 2, true, false);
			} else {
				player.AddBuff(BuffID.Darkness, 2, true, false);
			}
		};
		arenaColossion();
	}

	AI(npc) {
		if (npc.type == 4) {
			this.phase1 = npc.ai[0] == 0;

			this.inPhase1 = npc.life > npc.lifeMax * 0.8;
			this.inPhase2 = npc.life < npc.lifeMax * 0.8 && npc.life > npc.lifeMax * 0.5;

			this.inPhase4 = npc.life < npc.lifeMax * 0.4;

			this.Phase1Dashing = npc.ai[1] == 2 && npc.ai[2] == 1;
			this.Phase2Dashing = npc.ai[1] == 4 && npc.ai[2] == 1;
			this.inPhaseTranslation = npc.ai[0] == 2 ? true : false;

			let dustPos = vector2.instance(npc.Center.X - npc.width / 2, npc.Center.Y - npc.height / 2);
			if (this.superDashDelay > 0) this.superDashDelay--;

			if (Main.player[Main.myPlayer].statLife === 0) return;
			this.finalArenaPosition = npc.Center;
			if (this.finalArenaScale > 3.3) this.finalArenaScale -= 0.000625;

			let damage = 15;

			const MakeRedCircleWarn = (pos = npc.position) => {
				return generic.NewProjectileSimple(pos, vector2.instance(0, 0), ModProjectile.getTypeByName('RedGlowRing'), 25);
			};

			const ShootCone = () => {
				let multiplier = 0.3;
				generic.NewProjectileSimple(npc.Center, vector2.instance(npc.velocity.X * multiplier, npc.velocity.Y), ModProjectile.getTypeByName('BloodSpike'), damage);
				generic.NewProjectileSimple(npc.Center, vector2.instance(npc.velocity.X * multiplier, npc.velocity.Y * 4), ModProjectile.getTypeByName('BloodSpike'), damage);
				generic.NewProjectileSimple(npc.Center, vector2.instance(npc.velocity.X * multiplier, npc.velocity.Y / 4), ModProjectile.getTypeByName('BloodSpike'), damage);
			};

			const ShootCrossBloodBloodScythe = () => {
				let vel = 0.3;
				let digVel = vel / 2; // diagonal velocity.
				const allDir = [
					vector2.instance(vel, 0), //
					vector2.instance(-vel, 0), //
					vector2.instance(0, vel), //
					vector2.instance(0, -vel), //
					vector2.instance(digVel, digVel), //
					vector2.instance(-digVel, digVel), //
					vector2.instance(digVel, -digVel), //
					vector2.instance(-digVel, -digVel) //
				];

				allDir.forEach(allDir => {
					generic.NewProjectileSimple(npc.Center, allDir, ModProjectile.getTypeByName('BloodScythe'), damage);
				});
			};
			const player = Main.player[npc.target];

			const ExplosionEffect = () => {
				ShootCrossBloodBloodScythe();
				for (let i = 0; i < 75; i++) {
					let ex = Dust.NewDust(dustPos, npc.width, npc.height, 90, 0, 0, 100, color.instance(), 1 + i * 0.05);
					Main.dust[ex].noGravity = true;
				}
			};
			const AI_FinalAtack = () => {
				if (this.finalArenaPosition === null) this.finalArenaPosition = player.Center;
				npc.velocity = vector2.instance(0, 0);

				if (this.finalPhaseRealTimer === 1) {
					MakeRedCircleWarn(this.finalArenaPosition);
				}
				if (this.finalPhaseRealTimer >= 120) {
					this.finalPhaseIsReal = true;
				} else {
					this.NotHaveAlpha = true;
				}

				if (this.finalPhaseIsReal) {
					npc.Center = this.finalArenaPosition;
				}

				npc.ai[1] = 0;
			};

			// disable everying if it's in last phase
			if (npc.life < npc.lifeMax * 0.2) this.finalPhase = true;

			if (this.finalPhase) {
				this.finalPhaseRealTimer++;
				AI_FinalAtack();
			} else {
				this.finalArenaPosition = npc.Center;
			}

			// Phase 1 and 2
			const EnvironmentDashsAndEffect = () => {
				/**
				    @summary Pre phase 1 dash
				*/

				Dust.NewDust(dustPos, npc.width, npc.height, 90, 0, 0, 100, color.instance(), 1);

				let projTime = 30;
				let dashCount = npc.ai[3];
				let Phase1Dashing = npc.ai[2] == 1 && npc.ai[1] == 2;
				let dashing = npc.ai[2] == 1;

				if (dashing) ExplosionEffect();
				if (Phase1Dashing) {
					npc.velocity = vector2.Multiply(npc.velocity, 3);
				}
				// in phase 1 and life > 80
				const AI_Phase1 = () => {
					let prePhase1Dashing = npc.ai[1] === 0 ? npc.ai[2] == 210 - projTime : npc.ai[2] == 100 - projTime;
					// Pre atack visual
					if (prePhase1Dashing) MakeRedCircleWarn();
				};

				const AI_Phase2 = () => {
					if (this.DisableTranslation == true) {
						this.canAnableTranslation = true;
					} else this.canAnableTranslation = false;

					if (this.canAnableTranslation === true) {
						npc.ai[0] = 1;
						npc.ai[2] = 0.05;

						ExplosionEffect();
						this.DisableTranslation = false;
					}

					// Force Strong Dash
					if (npc.ai[2] === 180) npc.ai[1] = 4;

					// Strong dash projectile
					if (this.Phase2Dashing) {
						npc.velocity = vector2.Multiply(npc.velocity, 1.4);
						MakeRedCircleWarn();

						ShootCone();
					}
				};

				if (this.phase1 && this.inPhase1) AI_Phase1();
				if (this.inPhase2) AI_Phase2();
			};

			EnvironmentDashsAndEffect();

			const AlphaLogic = () => {
				if (this.NotHaveAlpha) {
					if (npc.alpha < 255) npc.alpha += 2;
				} else {
					if (npc.alpha > 0) npc.alpha -= 3;
				}

				// No Black eye : )
				if (npc.alpha > 255) npc.alpha = 255;
				if (npc.alpha < 0) npc.alpha = 0;
			};

			AlphaLogic();
		}
	}

	OnKill(npc) {
		if (npc.type === 4) {
			this.finalPhaseIsReal = false;
			this.finalArenaPosition = null;
		}
	}

	OnHitPlayer(npc, player) {
		if (npc.type === 4) {
			player.AddBuff(BuffID.BrokenArmor, 60 * 15, true, false);
			player.AddBuff(BuffID.Venom, 30 * 2, true, false);
			player.AddBuff(BuffID.Obstructed, 60 * 2, true, false);
		}
	}
	PreDrawMod(Projectile, lightColor) {
		const screenPosition = Main.screenPosition;
		const tex = TextureAssets.Projectile[Projectile.type].Value;
		const texWidth = tex.Width;
		const texHeight = tex.Height;

		const pos = vector2.Subtract(Projectile.Center, screenPosition);
		// const truePos = Vector2_new(pos.X - texWidth / 2, pos.Y - texHeight / 2);
		const pivot = vector2.instance(texWidth / 2, texHeight / 2);

		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](tex, pos, null, Color.Red, Projectile.rotation, pivot, Projectile.scale * 0.5, null, 0.0);
		return false 
	}
}
