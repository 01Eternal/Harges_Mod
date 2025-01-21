/** @format */

import { using } from '../../TL/ModClasses.js';

using('TL');
using('Terraria');
using('Terraria.GameContent');
using('Terraria.ID');
using('Microsoft.Xna.Framework.Graphics');

let SolidCollision = Collision['bool SolidCollision(Vector2 Position, int Width, int Height)'];

const v_Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];
const Frame = Utils['Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)'];
const Vector2_new = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x, y);

let HallowedBloom = '';
let Spike = '';

export default class SlimySpike extends ModProjectile {
	constructor() {
		super();
		this.Texture = `Projectiles/Eternal/${this.constructor.name}`;
	}

	SetStaticDefaults() {
		super.SetStaticDefaults();
		ModProjectile.register(SpikeGlow);

		HallowedBloom = tl.texture.load('Projectiles/trailBase.png');
		Spike = tl.texture.load(`${this.Texture}.png`);
		ProjectileID.Sets.TrailingMode[this.Type] = 3;
		ProjectileID.Sets.TrailCacheLength[this.Type] = 3;
		this.trailLoop = 0;
	}

	SetDefaults() {
		this.Projectile.width = 7;
		this.Projectile.height = 46;
		this.Projectile.hostile = true;
		this.Projectile.friendly = false;
		this.Projectile.timeLeft = 350;
		this.Projectile.aiStyle = 1;
		this.Projectile.tileCollide = true;
	}

	AIMod(Projectile) {}

	OnHitPlayerMod(projectile, player, damage, crit) {
	    player.AddBuff(BuffID.Slimed, 60 * 5, true, false)
	}
}

class SpikeGlow extends ModProjectile {
	constructor() {
		super();
		this.Texture = `Projectiles/Eternal/GlowLine`;
		this.HallowedBloom = null;
	}

	SetStaticDefaults() {
		super.SetStaticDefaults();
		HallowedBloom = tl.texture.load('Projectiles/trailBase.png');
		ProjectileID.Sets.TrailingMode[this.Type] = 3;
		ProjectileID.Sets.TrailCacheLength[this.Type] = 3;
		this.trailLoop = 0;
	}

	SetDefaults() {
		this.Projectile.width = 1;
		this.Projectile.height = 146;
		this.Projectile.hostile = true;
		this.Projectile.friendly = false;
		this.Projectile.timeLeft = 69;
		this.Projectile.aiStyle = 1;
		this.Projectile.tileCollide = true;
	}

	AIMod(Projectile) {}

	PreDrawMod(Projectile, lightColor) {
		return true;
	}
}
