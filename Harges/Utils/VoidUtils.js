/** @format */

import { using } from '../../TL/ModClasses_Inner.js';
using('Microsoft.Xna.Framework');
using('Terraria');

export class rec {
	static instance = Rectangle.new('void .ctor(int x, int y, int width, int height');
}
export class vec2 {
	static instance = Vector2.new()['void .ctor(float x, float y)'];

	static Normalize = Vector2['Vector2 Normalize(Vector2 value)'];
	static Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];
	static Multiply = Vector2['Vector2 Multiply(Vector2 value1, float scaleFactor)'];
	static Lerp = Vector2['Vector2 Lerp(Vector2 value1, Vector2 value2, float amount)'];
	static Distance = Vector2['float Distance(Vector2 value1, Vector2 value2)'];
	static getOrigin = (x, y) => vec2.instance(x / 2, y / 2);
}

export class gen {
	static NewProjectile =
		Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];

	static NewProjectileSimple = (Position, Velocity, ProjType, dmg, target = Main.myPlayer) => {
		gen.NewProjectile(Projectile.GetNoneSource(), Position, Velocity, ProjType, dmg, 0, target, 0, 0, 0);
	};

	static drawTexture(texture, position, color, rotation, origin, scale, sprite = null) {
		Main.spriteBatch[
			'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
		](texture, position, null, color, rotation, origin, scale, sprite, 0.0);
	}
}
