/** @format */

import { ModLocalization } from './ModLocalization.js';
import { ModHooks } from './ModHooks.js';

import { ModTexture } from './ModTexture.js';
import { ModTexturedType } from './ModTexturedType.js';

import { Terraria, Microsoft } from './ModImports.js';
import { ProjectileLoader } from './Loaders/ProjectileLoader.js';

export class ModProjectile extends ModTexturedType {
	Projectile = undefined;
	Type = undefined;
	AIType = undefined;
	DrawHeldProjInFrontOfHeldItemAndArms = undefined;
	DrawOffsetX = undefined;
	DrawOriginOffsetY = undefined;
	DrawOriginOffsetX = undefined;

	constructor() {
		super();
	}

	SetStaticDefaults() {
		if (this.Projectile.hostile) {
			Terraria.Main.projHostile[this.Type] = true;
		}

		if (this.Projectile.aiStyle == 7) {
			Terraria.Main.projHook[this.Type] = true;
		}
	}

	SetDefaults() {}

	OnSpawnMod(projectile, source) {}

	PreAIMod() {
		return true;
	}

	OnHitPlayerMod(Projectile, target, damage, crit) {}

	AIMod(projectile) {}

	PostAIMod() {}

	ShouldUpdatePosition() {
		return true;
	}

	TileCollideStyleMod(width, height, fallThrough, hitboxCenterFrac) {
		return true;
	}

	OnTileCollideMod(oldVelocity) {
		return true;
	}

	PreKillMod(timeLeft) {
		return true;
	}

	KillMod(timeLeft) {}

	CanDamage() {
		return null;
	}

	CanHitNPCMod(target) {
		return null;
	}

	OnHitNPC(projectile, target, damage, knockback) {}

	CanHitPlayerMod(target) {
		return true;
	}

	Kill(proj, timeLeft) {}

	OnHitPlayerMod(target, damage, crit) {}

	CollidingMod(projHitbox, targetHibox) {
		return null;
	}

	GetAlphaMod(lightColor) {
		return null;
	}

	PreDrawExtrasMod() {
		return true;
	}

	PreDrawMod(projectile, lightColor) {
		return true;
	}

	PostDrawMod(lightColor) {}

	static register(projectile) {
		ProjectileLoader.register(projectile);
	}

	static isModType(type) {
		return type >= ModProjectile.MAX_VANILLA_ID;
	}

	static isModProjectile(projectile) {
		return ModProjectile.isModType(projectile.type);
	}

	static getModProjectile(type) {
		return ProjectileLoader.getModProjectile(type);
	}

	static getByName(name) {
		ProjectileLoader.getByName(name);
	}

	static getTypeByName(name) {
		return ProjectileLoader.getTypeByName(name);
	}

	/*static InitializeProjectile(projectile) {
        projectile.Projectile = {};
        
        const projectileName = projectile.constructor.name;

        projectile.Type = projectile.Projectile.type = tl.projectile.registerNew(projectileName);

        Terraria.Lang._projectileNameCache[projectile.Type] = ModLocalization.getTranslationProjectileName(projectileName);

        const projectileTexture = new ModTexture(projectile.Texture);

        if (projectileTexture.exists) {
            Terraria.GameContent.TextureAssets.Projectile[projectile.Type] = projectileTexture.asset.asset;
        }
        
        projectile.SetStaticDefaults();
    }*/
}
