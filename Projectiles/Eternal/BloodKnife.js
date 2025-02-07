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

export default class BloodKnife extends ModProjectile {
	constructor() {
		super();
		this.Texture = `Projectiles/Eternal/${this.constructor.name}`;
	}

	SetStaticDefaults() {
		super.SetStaticDefaults();
	}

	SetDefaults() {
		this.Projectile.width = 22 * 0.6;
		this.Projectile.height = 48 * 0.6;
		this.Projectile.hostile = true;
		// this.Projectile.scale *= 0.6
		this.Projectile.friendly = false;
		this.Projectile.timeLeft = 350;
		this.Projectile.aiStyle = 0;
		this.Projectile.tileCollide = true;
	}
	
AIMod(Projectile) {
    Projectile.rotation = Math.atan2(Projectile.velocity.Y, Projectile.velocity.X) + Math.PI / 2;
}

	OnHitPlayerMod(projectile, player, damage, crit) {
		player.AddBuff(BuffID.OnFire, 60 * 7, true, false);
		player.AddBuff(BuffID.Slow, 30 * 2, true, false); // 30 = 1s 
		player.AddBuff(BuffID.Bleeding, 60 * 5, true, false);
	}
}