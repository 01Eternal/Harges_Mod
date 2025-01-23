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

export default class BloodSpike extends ModProjectile {
	constructor() {
		super();
		this.Texture = `Projectiles/Eternal/${this.constructor.name}`;
	}

	SetStaticDefaults() {
		super.SetStaticDefaults();
		ModProjectile.register(RedGlowRing);
		HallowedBloom = tl.texture.load('Projectiles/trailBase.png');
		Spike = tl.texture.load(`${this.Texture}.png`);
		ProjectileID.Sets.TrailingMode[this.Type] = 3;
		ProjectileID.Sets.TrailCacheLength[this.Type] = 10;
		this.trailLoop = 0;
	}

	SetDefaults() {
		this.Projectile.width = 26;
		this.Projectile.height = 26;
		this.Projectile.hostile = true;
		this.Projectile.friendly = false;
		this.Projectile.timeLeft = 350;
		this.Projectile.aiStyle = 1;
		this.Projectile.tileCollide = false;
		//this.Projectile.scale *= 1.5;
	}

	AIMod(Projectile) {
		this.trailLoop++;
		//Main.NewText(`${Projectile.ai}`, 255, 255, 255);
		//Main.NewText(`${Projectile.localA}`, 255, 255, 255);

		if (SolidCollision(Projectile.Center, Projectile.width, Projectile.height)) {
			Projectile.velocity = Vector2.new()['void .ctor(float x, float y)'](Math.floor(Projectile.velocity.X / 2), Math.floor(-Projectile.velocity.Y / 2));
		}

		Projectile.scale -= 0.005;
		if (Projectile.scale <= 0) Projectile.Kill();
		//Main.NewText(`${Projectile.velocity.Y}`, 255, 255, 255);

		// if (Projectile.velocity.Y == 0) Projectile.Kill();

		// deleted in 2.0 why using trail.
		// 		let Effect = Dust.NewDust(
		// 			Vector2.new()['void .ctor(float x, float y)'](Projectile.Center.X - Projectile.width / 2, Projectile.Center.Y - Projectile.height / 2),
		// 			Projectile.width,
		// 			Projectile.height,
		// 			DustID.CrimsonSpray,
		// 			0,
		// 			0,
		// 			100,
		// 			Color.new(),
		// 			1
		// 		);
		//
		// 		Main.dust[Effect].noGravity = true;
	}

	PreDrawMod(Projectile, lightColor) {
		const screenPosition = Main.screenPosition;

		const tex = TextureAssets.Projectile[Projectile.type].Value;
		const texWidth = tex.Width;
		const texHeight = tex.Height;

		const pos = v_Subtract(Projectile.Center, screenPosition);
		const pivot = Vector2_new(texWidth / 2, texHeight / 2);

		const bloomColor = Color.new()['void .ctor(int r, int g, int b, int a)'](255, 0, 0, 150);
		const oldPosLength = Projectile.oldPos.length;

		/*
		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](Spike, pos, null, bloomColor, Projectile.rotation, pivot, Projectile.scale, null, 0.0);
		*/

		if (Projectile.active) {
			if (!Projectile.velocity.X == 0 || !Projectile.velocity.Y == 0)
				if (Projectile.velocity.X <= -1.5 || Projectile.velocity.X >= 1.5 || Projectile.velocity.Y <= -1.5 || Projectile.velocity.Y >= 1.5) {
					for (let i = 0; i < oldPosLength; i++) {
						const trailPos = v_Subtract(Projectile.oldPos[i], screenPosition);
						const trueTrailPos = Vector2_new(trailPos.X + 26 / 2, trailPos.Y + 26 / 1.5);
						const alpha = 1 - i / oldPosLength;
						const scaleFactor = alpha;
						const trailColor = Color.Multiply(bloomColor, alpha);

						Main.spriteBatch[
							'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
						](Spike, trueTrailPos, null, trailColor, Projectile.rotation, pivot, scaleFactor, null, 0.0);
					}

					if (Projectile.timeLeft <= 350 / 2 && Projectile.scale > -1) {
						Projectile.scale--;
					}
				}
		}
		return false;
	}

	OnHitPlayerMod(projectile, player, damage, crit) {
		player.AddBuff(BuffID.OnFire, 60 * 7, true, false);
		player.AddBuff(BuffID.Slow, 60 * 2, true, false);
		player.AddBuff(BuffID.Bleeding, 60 * 5, true, false);
	}
}

class RedGlowRing extends ModProjectile {
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
