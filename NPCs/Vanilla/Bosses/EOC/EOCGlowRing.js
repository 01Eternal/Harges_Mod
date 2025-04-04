import { using } from "../../../../TL/ModClasses.js";

using("TL");
using("Terraria");
using("Terraria.GameContent");
using("Terraria.ID");
using("Microsoft.Xna.Framework.Graphics");

export default class RedGlowRing extends ModProjectile {
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
        this.Projectile.tileCollide = true;
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

        const pos = vector2.Subtract(Projectile.Center, screenPosition);
        // const truePos = vector2.instance(pos.X - texWidth / 2, pos.Y - texHeight / 2);
        const pivot = vector2.instance(texWidth / 2 , texHeight / 2);

        Main.spriteBatch[
            "void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)"
        ](tex, pos, null, Color.Red, Projectile.rotation, pivot, Projectile.scale * 0.5, null, 0.0);

        
        return false;
    }
}
