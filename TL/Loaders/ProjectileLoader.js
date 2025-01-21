import { GlobalProjectile } from "../GlobalProjectile.js";
import { ModHooks } from "../ModHooks.js";
import { Terraria, ReLogic, Microsoft} from "../ModImports.js";
import { ModTexture } from "../ModTexture.js";
import { ModLocalization } from "../ModLocalization.js";
import { ModProjectile } from "../ModProjectile.js";
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
const Negative = Vector2['Vector2 Negate(Vector2 value)'];

const Main = Terraria.Main;
const EntitySpriteDraw = Main["void EntitySpriteDraw(Texture2D texture, Vector2 position, Rectangle sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float worthless)"];
const v_Subtract = Microsoft.Xna.Framework.Vector2["Vector2 Subtract(Vector2 value1, Vector2 value2)"];
const Frame = Terraria.Utils["Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)"];


export class ProjectileLoader {

    static RegisteredProjectile = [];
    static Registered = 0;

    static MAX_VANILLA_PROJECTILE_ID = Terraria.ID.ProjectileID.Count;

    static isModType(type) {
        return type >= ProjectileLoader.MAX_VANILLA_PROJECTILE_ID;
    }

    static isModProjectile(projectile) {
        return ProjectileLoader.isModType(projectile.type);
    }

    static getByName(name) {
        for (let projectile of ProjectileLoader.RegisteredProjectile) {
            if (projectile.constructor.name === name) {
                return projectile;
            }
        }
    }

    static getTypeByName(name) {
        return ProjectileLoader.getByName(name).Type;
    }

    static getModProjectile(type) {
        if (ProjectileLoader.isModType(type)) {
            for (let projectile of ProjectileLoader.RegisteredProjectile) {
                if (projectile.Type === type) {
                    return projectile;
                }
            }
        }

        return undefined;
    }

    static register(projectile) {
        ProjectileLoader.RegisteredProjectile.push(new projectile());
        //ProjectileLoader.Registered++;
        ModHooks.initialize();
    }

    static register2(projectiles) {
        projectiles.forEach(projectile => {
            ProjectileLoader.RegisteredProjectile.push(new projectile());
            //ProjectileLoader.Registered++
        });
        ModHooks.initialize();
    }

    static InitializeRegisteredProjectile() {
        for (let projectile of ProjectileLoader.RegisteredProjectile) {
            ProjectileLoader.InitializeProjectile(projectile);
        }

        tl.log(`\n\nPROJECTILES ADDED!\n\n`);
    }

    static InitializeProjectile(projectile) {
        projectile.Projectile = {};

        const projectileName = projectile.constructor.name;
        ProjectileLoader.Registered++;

        const newSize = Terraria.ID.ProjectileID.Count + ProjectileLoader.Registered;
        
        
        tl.log(`${newSize}`);

        projectile.Type = projectile.Projectile.type = tl.projectile.registerNew(projectileName);
        tl.log(`\n\n${projectileName}, id-${projectile.Type}, count-${newSize}`);

        function cloneResizedSetLastProjectile(array, newSize, value) {
            const resized = array.cloneResized(newSize);
            resized[newSize - 1] = value;
            return resized;
        }

        function resizeArrayProperty(propertyHolder, propertyName, newSize, value) {
            propertyHolder[propertyName] = cloneResizedSetLastProjectile(propertyHolder[propertyName], newSize, value);
        }

        function addProjectileToArray(propertyHolder, propertyName, proj) {
            const array = propertyHolder[propertyName];
            const arrayLength = array.length;
            propertyHolder[propertyName] = cloneResizedSetLastProjectile(array, arrayLength + 1, proj);
        }

        function resizeTextureAssets(propertyName, newSize, value) {
            resizeArrayProperty(Terraria.GameContent.TextureAssets, propertyName, newSize, value);
        }

        Terraria.Main.projHostile = Terraria.Main.projHostile.cloneResized(newSize);
        Terraria.Main.projHook = Terraria.Main.projHook.cloneResized(newSize);
        Terraria.Main.projPet = Terraria.Main.projPet.cloneResized(newSize);
        Terraria.Main.projFrames = Terraria.Main.projFrames.cloneResized(newSize);

        addProjectileToArray(Terraria.Lang, "_projectileNameCache", ModLocalization.getTranslationProjectileName(projectileName));


        const projectileTexture = new ModTexture(projectile.Texture);
        if (projectileTexture.exists) {
            tl.log(`\n\nBefore resizing, Projectile length: ${Terraria.GameContent.TextureAssets.Projectile.length}\n\n`);
            resizeTextureAssets('Projectile', newSize, projectileTexture.asset.asset);

            tl.log(`\n\nAfter resizing, Projectile length: ${Terraria.GameContent.TextureAssets.Projectile.length}\n\n`);
        } else {
            tl.log("\n\nTEXTURE NOT FOUND");
        }

        projectile.SetStaticDefaults();
        
        tl.log(`\n\n\nFinal array content for Projectile: - ${Terraria.GameContent.TextureAssets.Projectile.length}`);
    }

    static SetDefaults(projectile) {
        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.SetDefaults(projectile);
        }
    }

    static OnSpawn(projectile, source) {
        ModProjectile.getModProjectile(projectile.type)?.OnSpawnMod(source);

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.OnSpawn(projectile, source);
        }
    }

    static PreAI(projectile) {
        let result = true;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            result = result && globalProjectile.PreAIMod();
        }

        if (result && ModProjectile.getModProjectile(projectile) != null) {
            return ModProjectile.PreAI(projectile);
        }

        return result;
    }

    static AI(projectile) {
        ModProjectile.getModProjectile(projectile.type)?.AIMod(projectile);

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.AI(projectile);
        }
    }

    static PostAI(projectile) {
        ModProjectile.getModProjectile(projectile.type)?.PostAIMod();

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.PostAI(projectile);
        }
    }

    static ProjectileAI(projectile) {
        if (ProjectileLoader.PreAI(projectile)) {
            let type = projectile.type;
            let useAIType = ModProjectile.getModProjectile(projectile) != null && ModProjectile.getModProjectile(projectile).AIType > 0;
            if (useAIType) {
                projectile.type = ModProjectile.getModProjectile(projectile.type).AIType;
            }
            projectile.VanillaAI();

            if (useAIType) {
                projectile.type = type;
            }

            ProjectileLoader.AI(projectile);
        }

        ProjectileLoader.PostAI(projectile);
    }

    static ShouldUpdatePosition(projectile) {
        if (ProjectileLoader.isModProjectile(projectile) && !ModProjectile.getModProjectile(projectile.type).ShouldUpdatePosition(projectile)) {
            return false;
        }

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            if (!globalProjectile.ShouldUpdatePosition(projectile)) {
                return false;
            }
        }

        return true;
    }

    static TileCollideStyle(projectile, width, height, fallThrough, hitboxCenterFrac) {
        if (ProjectileLoader.isModProjectile(projectile) && !ModProjectile.getModProjectile(projectile.type).TileCollideStyleMod(width, height, fallThrough, hitboxCenterFrac)) {
            return false;
        }

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            if (!globalProjectile.TileCollideStyle(projectile, width, height, fallThrough, hitboxCenterFrac)) {
                return false;
            }
        }

        return true;
    }

    static OnTileCollide(projectile, oldVelocity) {
        let result = true;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile()) {
            result = result && globalProjectile.OnTileCollide(projectile, oldVelocity);
        }

        if (result && ModProjectile.getModProjectile(projectile.type) != null) {
            return ModProjectile.getModProjectile(projectile.type).OnTileCollideMod(oldVelocity);
        }

        return result;
    }

    static PreKill(projectile, timeLeft) {
        let result = true;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.PreKillGlobal(projectile, timeLeft);
        }

        if (result && ModProjectile.getModProjectile(projectile.type) != null) {
            return ModProjectile.getModProjectile(projectile.type).PreKillMod(timeLeft);
        }

        return result;
    }

    static Kill(projectile, timeLeft) {
        ModProjectile.getModProjectile(projectile.type)?.Kill(projectile, timeLeft);

        for (let projectile of GlobalProjectile.RegisteredProjectile) {
            projectile.KillGlobal(projectile, timeLeft);
        }
    }

    static CanDamage(projectile) {
        let result = null;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            let canDamage = globalProjectile.CanDamage(projectile);

            if (canDamage.HasValue) {
                if (!canDamage.HasValue) {
                    return false;
                }

                result = true;
            }
        }

        return result ?? ModProjectile.getModProjectile(projectile.type)?.CanDamageMod();
    }

    static CanHitNPC(projectile, target) {
        let flag = null;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            let canHit = globalProjectile.CanHitNPC(projectile, target);

            if (canHit > 0 && canHit == null) {
                return false;
            }

            if (canHit > 0) {
                flag = canHit.HasValue;
            }
        }

        if (ModProjectile.getModProjectile(projectile.type) != null) {
            let canHit = ModProjectile.getModProjectile(projectile.type).CanHitNPCMod(target);

            if (canHit > 0 && canHit == null) {
                return false;
            }

            if (canHit > 0) {
                flag = canHit.HasValue;
            }
        }

        return flag;
    }

    static OnHitNPC(projectile, target, damage, knockback) {
        ModProjectile.getModProjectile(projectile.type)?.OnHitNPC(projectile, target, damage, knockback);

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.OnHitNPCGlobal(projectile, target, damage, knockback);
        }
    }

    static CanHitPlayer(projectile, target) {
        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            if (!globalProjectile.CanHitPlayer(projectile, target)) {
                return false;
            }
        }

        if (ModProjectile.getModProjectile(projectile.type) != null) {
            return ModProjectile.getModProjectile(projectile.type).CanHitPlayerMod(target);
        }

        return true;
    }

    static OnHitPlayer(projectile, target, damage, crit) {
        ModProjectile.getModProjectile(projectile.type)?.OnHitPlayerMod(projectile, target, damage, crit);

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.OnHitPlayer(projectile, target, damage, crit);
        }
    }

    static Colliding(projectile, projHitbox, targetHibox) {
        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            let colliding = globalProjectile.Colliding(projectile, projHitbox, targetHibox);

            if (colliding.HasValue) {
                return colliding.Value;
            }
        }

        return ModProjectile.getModProjectile(projectile.type)?.CollidingMod(projHitbox, targetHibox);
    }

    static DrawHeldProjInFrontOfHeldItemAndArms(projectile, flag) {
        if (ModProjectile.getModProjectile(projectile.type) != null) {
            flag = ModProjectile.getModProjectile(projectile.type).DrawHeldProjInFrontOfHeldItemAndArms;
        }
    }

    static GetAlpha(projectile, color) {
        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            color = globalProjectile.GetAlpha(projectile, color);

            if (color.HasValue) {
                return color;
            }
        }

        return ModProjectile.getModProjectile(projectile.type)?.GetAlphaMod(color);
    }

    static DrawOffset(projectile, offsetX, offsetY, originX) {
        if (ModProjectile.getModProjectile(projectile.type) != null) {
            offsetX = ModProjectile.getModProjectile(projectile.type).DrawOffsetX;
            offsetY = Negative(ModProjectile.getModProjectile(projectile.type).DrawOriginOffsetY);
            originX += ModProjectile.getModProjectile(projectile.type).DrawOriginOffsetX;
        }
    }

    static PreDrawExtras(projectile) {
        let result = true;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            result = result && globalProjectile.PreDrawExtras(projectile);
        }

        if (result && ModProjectile.getModProjectile(projectile.type) != null) {
            return ModProjectile.getModProjectile(projectile.type).PreDrawExtrasMod();
        }

        return result;
    }
    
    static Draw(proj, LightColor) {
    if (ProjectileLoader.isModType(proj.type)) {
    	
        const projectileName = ProjectileLoader.getModProjectile(proj.type).constructor.name
        
        if (projectileName && ModHooks.tmp_tex && ModHooks.tmp_tex[projectileName]) {
            const texture = ModHooks.tmp_tex[projectileName];
            
            if (texture && texture.asset && texture.asset.asset) {
                const tex = texture.asset.asset.Value;
                const pivot = Microsoft.Xna.Framework.Vector2.new()["void .ctor(float x, float y)"](tex.Width / 2, tex.Height / 2);
                const pos = v_Subtract(proj.Center, Main.screenPosition);
                const Rect = Frame(tex, 1, 1, 0, 0, 0, 0);

                EntitySpriteDraw(tex, pos, Rect, LightColor, proj.rotation, pivot, proj.scale, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
            } 
        }
    }
}

    static PreDraw(projectile, lightColor) {
        let result = true;

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            result = result && globalProjectile.PreDraw(projectile, lightColor);
        }

        if (result && ModProjectile.getModProjectile(projectile.type) != null) {
            return ModProjectile.getModProjectile(projectile.type).PreDrawMod(projectile, lightColor);
        }

        return result;
    }

    static PostDraw(projectile, lightColor) {
        ModProjectile.getModProjectile(projectile.type)?.PostDrawMod(lightColor);

        for (let globalProjectile of GlobalProjectile.RegisteredProjectile) {
            globalProjectile.PostDraw(projectile, lightColor);
        }
    }
}