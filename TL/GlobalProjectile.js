import { ModHooks } from "./ModHooks.js";
import { Terraria } from "./ModImports.js";

export class GlobalProjectile {
    static RegisteredProjectile = [];

    static register(projectile) {
        this.RegisteredProjectile.push(new projectile());
        ModHooks.initialize();
    }
    
    SetDefaults(proj) {        
    }
    
    AI(proj) {
    }
    
    Kill(projectile) {
    }
}