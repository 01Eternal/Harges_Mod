/** @format */

import { using } from "../../../../TL/ModClasses.js";

// Merceless Mode Muhahaha
import MERCELESS_AI from "./Marceless/AIM.js";

// Projectile register
import Sickle from "./BloodScythe.js";
import Blood_Shuriken from "./BloodSpike.js";
import Blood_Warn from "./EOCGlowRing.js";

using("Microsoft.Xna.Framework");
using("TL");
using("Terraria.ID");
using("Harges");

let arenaTex = null;
let eocSpawnTex = null;
export default class Eoc extends GlobalNPC {
    constructor() {
        super();
    }

    SetStaticDefaults() {
        ModProjectile.register(Sickle);
        // ModProjectile.register(Blood_Shuriken);
        ModProjectile.register(Blood_Warn);
        arenaTex = tl.texture.load("Assets/AdditiveTextures/HardEdgeRing.png");
        eocSpawnTex = tl.texture.load("NPCs/Vanilla/Bosses/EOC/EternalEocFont.png");
    }

    SetDefaults(npc) {
        if (npc.type === 4) {
            npc.life *= 1.7; // 1.2
            npc.lifeMax *= 1.5; // -1%
            npc.color = Color.Purple;
            this.fadeinoff = generic.toSec(3);
            this.Phase1Dashing = null;
            this.Phase2Dashing = null;
            this.inPhaseTranslation = null;
            this.SpaswmAnim = this.SpaswmAnimMax;
            this.SpaswmAnimMax = generic.toSec(4);
            this.inPhase1 = null; // > 90%
            this.inPhase2 = null; // 90% to 50%

            this.DisableTranslation = true;
            this.canAnableTranslation = false;

            this.canSuperDash = false;
            this.superDashDelay = 0; // 0 to 30
            this.EyeMakeDash = false;
            this.inPhase4 = null; // 20%

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
            this.arenaUpdate = 0;
            this.arenaUpdateMax = 2;
            this.finalShoot = 0;
            this.finalArenaScale = 17;
            this.maxFinalArenaScale = false;
            this.canFinalBulletHell = false;
            this.canArena = false;
            this.finalArenaRotation = 0;
            this.teleportDelay = -1;
            this.teleportPosition = null;
        }
    }

    DrawInterface() {
        let player = Main.player[Main.myPlayer];
        const drawFont = () => {
            this.fadeinoff = Math.sin((this.SpaswmAnim / 240) * (Math.PI / 2));
            let firstColor = Color.Purple;
            let secondColor = Color.Black;

            let colorFixed = Color.Lerp(secondColor, Color.Purple, this.fadeinoff);
            let ccolor = Color.Multiply(colorFixed, this.fadeinoff);
            if (this.SpaswmAnim > 0 && this.SpaswmAnim !== null)
                generic.drawTexture(
                    eocSpawnTex,
                    vector2.instance(Main.screenWidth / 2, Main.screenHeight / 2 - 100),
                    ccolor,
                    0,
                    vector2.getOrigin(eocSpawnTex.Width, eocSpawnTex.Height),
                    0.18
                );
        };
        for (let pc of Array.from(Main.npc)) {
            if (pc.type === 4 && pc.active === true) {
                drawFont();
            }
        }
    }
    DrawExtra(npc) {
        let player = Main.player[Main.myPlayer];

        // ArenaLogic disable the arena if player died.

        for (let pc of Array.from(Main.npc)) {
            if (pc.type === 4 && pc.active === false) {
                this.finalArenaPosition = null;
                this.SpaswmAnim = null;
            }
            if (this.finalArenaPosition == null) break;
        }
        if (Main.player[Main.myPlayer].statLife === 0 || this.canArena == false) {
            this.finalPhaseIsReal = false;
            this.finalArenaPosition = null;
            return;
        }

        this.finalShoot++;
        if (this.finalArenaPosition == null) return;

        let arenaScreenPosition = vector2.Subtract(this.finalArenaPosition, Main.screenPosition);
        let arenaColor = color.instance(255, 0, 0, 255);

        this.finalArenaRotation += Math.random() * 0.35;
        if (this.finalArenaRotation > Math.PI * 2) this.finalArenaRotation = 0;

        const arenaColossion = () => {
            let arenaRadius = (arenaTex.Width / 2) * this.finalArenaScale * 0.92;

            const ProjectileCollision = () => {
                for (let proj of Array.from(Main.projectile)) {
                    let projectileDistance = vector2.Distance(proj.Center, this.finalArenaPosition);
                    if (projectileDistance > arenaRadius) {
                        proj.Kill();
                        if (Math.random() < 0.3) return;
                        let ex = Dust.NewDust(proj.Center, proj.width, proj.height, 90, 0, 0, 100, color.instance(), 2);
                        Main.dust[ex].noGravity = true;
                    }
                }
            };

            const PlayerCollision = () => {
                let playerDistance = vector2.Distance(player.Center, this.finalArenaPosition);
                if (playerDistance > arenaRadius) {
                    player.AddBuff(BuffID.Obstructed, 8, true, false);
                    player.AddBuff(BuffID.Venom, 8, true, false);
                }
            };
            PlayerCollision();
            ProjectileCollision();
        };
        generic.drawTexture(
            arenaTex,
            arenaScreenPosition,
            color.instance(255, 0, 0, 0),
            this.finalArenaRotation,
            vector2.getOrigin(arenaTex.Width, arenaTex.Height),
            this.finalArenaScale
        );
        if (this.arenaUpdate++ > this.arenaUpdateMax) {
            this.arenaUpdate = 0;
            arenaColossion();
        }
    }

    AI(npc) {
        if (npc.type == 4) {
            const player = Main.player[Main.myPlayer];
            let playerTeleportPos = vector2.instance(player.position.X, player.position.Y - 300); // generic.NewProjectileSimple(npc.Center, vector2.instance(0, 0), ModProjectile.getTypeByName("RedGlowRing"), 25);
            let invisibleEyePos = vector2.instance(player.position.X, player.position.Y - 1900);
            player.AddBuff(BuffID.Darkness, 2, true, false);
            if (this.SpaswmAnim-- > 0) {
                npc.position = invisibleEyePos;
                npc.alpha = 0;
                npc.ai[0] = 0;
                npc.ai[1] = 0;
                npc.ai[2] = 0;
                npc.ai[3] = 0;

                if (this.SpaswmAnim == 30) {
                }
            }
            if (this.SpaswmAnim == 0) npc.position = playerTeleportPos;

            this.canArena = true;
            this.phase1 = npc.ai[0] == 0;
            this.inPhase1 = npc.life > npc.lifeMax * 0.8;
            this.inPhase2 = npc.life < npc.lifeMax * 0.8 && npc.life > npc.lifeMax * 0.5;

            this.inPhase4 = npc.life < npc.lifeMax * 0.2;

            this.Phase1Dashing = npc.ai[1] == 2 && npc.ai[2] == 1;
            this.Phase2Dashing = npc.ai[1] == 4 && npc.ai[2] == 1;
            this.inPhaseTranslation = npc.ai[0] == 2 ? true : false;

            let dustPos = vector2.instance(npc.Center.X - npc.width / 2, npc.Center.Y - npc.height / 2);
            if (this.superDashDelay > 0) this.superDashDelay--;

            if (Main.player[Main.myPlayer].statLife === 0) return;
            this.finalArenaPosition = npc.Center;
            if (this.finalArenaScale > 5.0 && !this.maxFinalArenaScale) this.finalArenaScale -= 0.01;
            let damage = 15;

            const MakeRedCircleWarn = (pos = npc.Center) => {
                return generic.NewProjectileSimple(pos, vector2.instance(0, 0), ModProjectile.getTypeByName("RedGlowRing"), 25);
            };

            const ShootCrossBloodBloodScythe = () => {
                let vel = 0.5;
                const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
                angles.forEach(angle => {
                    let rad = (Math.PI / 180) * angle;
                    let dir = vector2.instance(Math.cos(rad) * vel, Math.sin(rad) * vel);
                    return generic.NewProjectileSimple(npc.Center, dir, ModProjectile.getTypeByName("BloodScythe"), damage);
                });
            };

            const ExplosionEffect = () => {
                ShootCrossBloodBloodScythe();
                for (let i = 0; i < 75; i++) {
                    let ex = Dust.NewDust(dustPos, npc.width, npc.height, 272, 0, 0, 100, color.instance(), 1 + i * 0.05);
                    Main.dust[ex].noGravity = true;
                }
            };
            const AI_FinalAtack = () => {
                const ExtendDash = Multiplier => (npc.velocity = vector2.Multiply(npc.velocity, Multiplier));
                this.finalArenaPosition = null; // disable arena in final phase

                let delayMax = 60;
                let dash = npc.ai[2] == 4;
                let Teleport = npc.ai[2] == 0;
                let phase3 = npc.ai[3] == 4;
                let noDash = npc.ai[3] == 2;
                if (npc.life <= npc.lifeMax * 0.03) npc.StrikeNPC(npc.life, 0, 0, false, false, false);

                if (this.teleportDelay > 0) npc.ai[2] = -6; // lock npc in your owm pos

                if (this.teleportDelay === delayMax) {
                    MakeRedCircleWarn(this.teleportPosition);
                }

                if (this.teleportDelay === 0) {
                    npc.Center = this.teleportPosition;
                    npc.ai[2] = 50;
                }

                this.teleportDelay = Math.max(-1, this.teleportDelay - 1);

                if (dash) ExtendDash(2.0);
                if (noDash) npc.ai[2] += 1;
                if (Teleport && phase3) {
                    this.teleportPosition = vector2.instance(player.Center.X + 600 * player.direction, player.Center.Y);
                    this.teleportDelay = delayMax;
                }
            };

            // disable everying if it's in last phase
            if (npc.life < npc.lifeMax * 0.2) this.finalPhase = true;

            if (this.finalPhase) {
                AI_FinalAtack();
            }

            // Phase 1 and 2
            const EnvironmentDashsAndEffect = () => {
                // Blood effect in bettle
                Main.player[Main.myPlayer].nebulaMonolithShader = true;
                Main.player[Main.myPlayer].ZoneCrimson = true;
                /** 
				          @summary Pre phase 1 dash    
		            */

                /**
                 * @summary Eye Permanent Dust
                 */
                if (Math.random() > 0.5) {
                    let f = Dust.NewDust(dustPos, npc.width, npc.height, 272, npc.velocity.X, npc.velocity.Y, 100, color.instance(), 1);
                    Main.dust[f].noGravity = true;
                }
                let projTime = 30;
                let dashCount = npc.ai[3];
                let Phase1Dashing = npc.ai[2] == 1 && npc.ai[1] == 2;
                let dashing = npc.ai[2] == 2;

                if (dashing) {
                    ExplosionEffect();
                    this.EyeMakeDash = true;
                } else this.EyeMakeDash = false;
                if (Phase1Dashing) {
                    let dashSpeed = 1.7; // Speed Multiplier
                    npc.velocity = vector2.Multiply(npc.velocity, dashSpeed);
                }
                // in phase 1 and life > 80
                const AI_Phase1 = () => {
                    let prePhase1Dashing = npc.ai[1] === 0 ? npc.ai[2] == 210 - projTime : npc.ai[2] == 100 - projTime;
                    // Pre atack visual
                    if (prePhase1Dashing) MakeRedCircleWarn(dustPos);
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
                        MakeRedCircleWarn(dustPos);
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
            this.SpaswmAnim = null;
        }
    }

    OnHitPlayer(npc, player) {
        if (npc.type === 4) {
            player.AddBuff(BuffID.BrokenArmor, 60 * 15, true, false);
            player.AddBuff(BuffID.Venom, 30 * 2, true, false);
            player.AddBuff(BuffID.Obstructed, 60 * 2, true, false);
        }
    }
}
