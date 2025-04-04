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

const rectangle = (x, y, width, height) => {
    const rectangle = Rectangle.new();
    rectangle.X = x;
    rectangle.Y = y;
    rectangle.Width = width;
    rectangle.Height = height;

    return rectangle;
}


export default class BloodScythe extends ModProjectile {
	constructor() {
		super();
		this.Texture = `NPCs/Vanilla/Bosses/EOC/${this.constructor.name}`;
	}
	
		SetStaticDefaults() {
		super.SetStaticDefaults();
		HallowedBloom = tl.texture.load('Projectiles/GlowLine.png');
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
	}

	OnHitPlayerMod(projectile, player, damage, crit) {
		player.AddBuff(BuffID.OnFire, 60 * 7, true, false);
		player.AddBuff(BuffID.Slow, 30 * 2, true, false); // 30 = 1s
		player.AddBuff(BuffID.Bleeding, 60 * 5, true, false);
	}
PreDrawMod(Projectile, lightColor) {
    const screenPosition = Main.screenPosition;
    const tex = TextureAssets.Projectile[Projectile.type].Value;

    const pivot = vector2.instance(tex.Width / 2, tex.Height / 2);
    const Glowpivot = vector2.instance(HallowedBloom.Width / 2, HallowedBloom.Height / 2);

    const pos = vector2.Subtract(Projectile.Center, screenPosition);
    // let rec = rectangle(pos.X, pos.Y, 5, 100000);

    // Cálculo do alpha para fade-in e fade-out
    let fadeDuration = 40; // Tempo de fade-in e fade-out
    let alpha = 2; // Alpha padrão (opaco)

    if (Projectile.timeLeft > 350 - fadeDuration) {
        // Fading in (início)
        
                alpha = Projectile.timeLeft / fadeDuration;
    } else if (Projectile.timeLeft < fadeDuration) {
        // Fading out (final)
        alpha = (350 - Projectile.timeLeft) / fadeDuration;

    }

    let color = Color.Multiply(Color.Purple, alpha); // Aplicando alpha ao vermelho

    if (Projectile.timeLeft > 350 - fadeDuration / 2) {
        Main.spriteBatch[
            'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
        ](HallowedBloom, pos, null, color, Math.atan2(Projectile.velocity.X, Projectile.velocity.Y) + Math.PI * 2, Glowpivot, Projectile.scale, null, 0.0);
    } 
   
        Main.spriteBatch[
            'void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'
        ](tex, pos, null, Color.White, Projectile.rotation, pivot, Projectile.scale, null, 0.0);

    return false;
}
}