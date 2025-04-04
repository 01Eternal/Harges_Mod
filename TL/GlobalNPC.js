import { ModHooks } from "./ModHooks.js";

export class GlobalNPC {
    static RegisteredNPC = [];

    constructor() {}

    static register(npc) {
        this.RegisteredNPC.push(new npc());
        ModHooks.initialize();
    }

    SetDefaults(npc) {}

    SetStaticDefaults() {}

    PreAI(npc) {}

    UpdateNPC(npc, i) {}

    AI(npc) {}

    Hurt(npc) {}

    OnHitPlayer(npc, player) {}

    OnKill(npc) {}

    NPCLoot(npc) {}

    DrawExtra(npc) {}

    ModifyNPCLoot(npcLoot) {}

    PostDraw(npc, spriteBatch, screenPos) {}

    SetupShop(type, shop, nextSlot) {}

    SetupTravelShop(shop, nextSlot) {}

    ScaleExpertStats(npc, numPlayers, bossLifeScale) {}

    HitEffect(npc, hitDirection, damage) {}

    CheckDead(npc) {
        return true;
    }

    PreKill(npc) {
        return true;
    }

    CheckActive(npc) {
        return true;
    }

    DrawInterface() {}
}
