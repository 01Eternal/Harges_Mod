/** @format */

import { using } from '../../TL/ModClasses_Inner.js';
using('Microsoft.Xna.Framework');
using('Terraria');

export class eternal {
	static PlayerBuffWithPenality(buffID = 0, buffTime = 0) {
		return Main.player[Main.myPlayer].Addbuff(buffTime, buffID, true, false);
	}
}

export class generic {
	static NewProjectile =
		Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];

	static NewProjectileSimple = (Position, Velocity, ProjType, dmg, target = Main.myPlayer) => {
		generic.NewProjectile(Projectile.GetNoneSource(), Position, Velocity, ProjType, dmg, 0, target, 0, 0, 0);
	};

	static drawTexture(texture, position, color, rotation, origin, scale, sprite = null) {
		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](texture, position, null, color, rotation, origin, scale, sprite, 0.0);
	}

	static randomNext(minValue, maxValue) {
		return Main.rand['int Next(int minValue, int maxValue)'](minValue, maxValue);
	}

	static maxNext(maxValue) {
		return Main.rand['int Next(int maxValue)'](maxValue);
	}
}
