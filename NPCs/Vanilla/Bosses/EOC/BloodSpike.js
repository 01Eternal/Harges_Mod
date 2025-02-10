/** @format */

import { using } from '../../../../TL/ModClasses.js';

using('TL');
using('Terraria');
using('Terraria.GameContent');
using('Terraria.ID');
using('Microsoft.Xna.Framework.Graphics');

let SolidCollision = Collision['bool SolidCollision(Vector2 Position, int Width, int Height)'];
const Frame = Utils['Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)'];

let HallowedBloom = '';
let Spike = '';

export default class BloodSpike extends ModProjectile {
	constructor() {
		super();
		this.Texture = `NPCs/Vanilla/Bosses/EOC/${this.constructor.name}`;
	}

	SetStaticDefaults() {
		super.SetStaticDefaults();
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
		this.Projectile.tileCollide = true;
		//this.Projectile.scale *= 1.5;
	}

	AIMod(Projectile) {
		this.trailLoop++;

		// if (SolidCollision(Projectile.Center, Projectile.width, Projectile.height)) {
			// Projectile.velocity = Vector2.new()['void .ctor(float x, float y)'](Math.floor(Projectile.velocity.X / 2), Math.floor(-Projectile.velocity.Y / 2));
		// }
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

		const pos = vector2.Subtract(Projectile.Center, screenPosition);
		const pivot = vector2.instance(texWidth / 2, texHeight / 2);
		
		// change to green if is meecelesss mode.
		const bloomColor = !isMerceless ? color.instance(255, 0, 0, 150) : color.instance(0, 255, 0, 150);
		const oldPosLength = Projectile.oldPos.length;

		
		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](Spike, pos, null, bloomColor, Projectile.rotation, pivot, Projectile.scale, null, 0.0);
		

		if (Projectile.active) {
			if (!Projectile.velocity.X == 0 || !Projectile.velocity.Y == 0)
				if (Projectile.velocity.X <= -1.5 || Projectile.velocity.X >= 1.5 || Projectile.velocity.Y <= -1.5 || Projectile.velocity.Y >= 1.5) {
					for (let i = 0; i < oldPosLength; i++) {
						const trailPos = vector2.Subtract(Projectile.oldPos[i], screenPosition);
						const trueTrailPos = vector2.instance(trailPos.X + 26 / 2, trailPos.Y + 26 / 1.5);
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
		player.AddBuff(BuffID.Slow, 30 * 2, true, false); // 30 = 1s 
		player.AddBuff(BuffID.Bleeding, 60 * 5, true, false);
	}
}