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

export default class BloodScythe extends ModProjectile {
	constructor() {
		super();
		this.Texture = `NPCs/Vanilla/Bosses/EOC/${this.constructor.name}`;
	}

	SetDefaults() {
		this.Projectile.width = 22 * 0.6;
		this.Projectile.height = 48 * 0.6;
		this.Projectile.hostile = true;
		// this.Projectile.scale *= 0.6
		this.Projectile.friendly = false;
		this.Projectile.timeLeft = 350;
		this.Projectile.aiStyle = 18;
		this.Projectile.tileCollide = true;
	}

	AIMod(Projectile) {
		Projectile.ai.val0 = 0;
		Projectile.ai.val1 = 0;
		Projectile.ai.val2 = 0;
	}

	OnHitPlayerMod(projectile, player, damage, crit) {
		player.AddBuff(BuffID.OnFire, 60 * 7, true, false);
		player.AddBuff(BuffID.Slow, 30 * 2, true, false); // 30 = 1s
		player.AddBuff(BuffID.Bleeding, 60 * 5, true, false);
	}

	PreDrawMod(Projectile, lightColor) {
		const screenPosition = Main.screenPosition;
		const tex = TextureAssets.Projectile[Projectile.type].Value;
		const texWidth = tex.Width;
		const texHeight = tex.Height;
		const pivot = vector2.instance(texWidth / 2, texHeight / 2);
		const pos = vector2.Subtract(Projectile.Center, screenPosition);
		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](tex, pos, null, Color.Red, Projectile.rotation, pivot, Projectile.scale * 1.1, null, 0.0);

		return false;
	}
}
