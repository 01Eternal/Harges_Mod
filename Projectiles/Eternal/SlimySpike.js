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
		ModProjectile.register(BlueGlowRing);

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
		player.AddBuff(BuffID.Slimed, 60 * 5, true, false);
	}
}
class BlueGlowRing extends ModProjectile {
	constructor() {
		super();
		this.Texture = `Projectiles/GlowRing`;
	}

	SetStaticDefaults() {
		super.SetStaticDefaults();
		this.animationLeft = 30;
	}

	SetDefaults() {
		this.Projectile.hostile = false;
		this.Projectile.friendly = false;
		this.Projectile.timeLeft = this.animationLeft;
		this.Projectile.aiStyle = 0;
		this.Projectile.tileCollide = false;
		this.Projectile.scale = 0.4;
	}

	AIMod(Projectile) {
		if (Projectile.timeLeft <= this.animationLeft / 2) {
			Projectile.scale -= 0.07;
		} else Projectile.scale -= 0.02;

		if (Projectile.scale <= 0) Projectile.Kill();
	}

	PreDrawMod(Projectile, lightColor) {
		const screenPosition = Main.screenPosition;
		const tex = TextureAssets.Projectile[Projectile.type].Value;
		const texWidth = tex.Width;
		const texHeight = tex.Height;

		const pos = v_Subtract(Projectile.Center, screenPosition);
		// const truePos = Vector2_new(pos.X - texWidth / 2, pos.Y - texHeight / 2);
		const pivot = Vector2_new(texWidth / 2, texHeight / 2);

		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](tex, pos, null, Color.Red, Projectile.rotation, pivot, Projectile.scale * 0.5, null, 0.0);

		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](tex, pos, null, Color.Red, Projectile.rotation, pivot, Projectile.scale, null, 0.0);

		return false;
	}
}
