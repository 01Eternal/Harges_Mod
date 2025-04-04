/** @format */

import { using } from "../TL/ModClasses.js";

using("TL");
using("Terraria");
using("Terraria.ID");
using("Terraria.DataStructures");
using("Harges");

let cactusDamage = 10;
export default class DebuffEnvironment extends ModPlayer {
    PreUpdateEquips(player) {
        let tileCenter = vector2.instance(this.player.Center.X, this.player.Center.Y);
        let currentTile = Framing["Tile GetTileSafely(Vector2 position)"](tileCenter);

        // cactus collision
        if (currentTile.type === TileID.Cactus) {
            if (this.player.immuneTime == 0) {
                this.player.Hurt(PlayerDeathReason.ByCustomReason("killed by cactus"), cactusDamage, -this.player.direction, false, false, false, 0, false);
                
            }
        }

        const ApplyDebuffDebuff = () => {
            // In Water
            if (this.player.wet) {
                if (this.player.ZoneSnow) {
                    if (this.player.chilled) {
                        this.player.moveSpeed *= 0.9; // - 10 %
                    }
                }

                if (this.player.ZoneJungle) {
                    this.player.AddBuff(BuffID.Poisoned, 2, true, false);
                }

                if (this.player.ZoneCrimson) {
                    this.player.AddBuff(BuffID.Ichor, 60 * 5, true, false);
                }

                if (this.player.ZoneCorrupt) {
                    this.player.AddBuff(BuffID.CursedInferno, 2, true, false);
                }
            }
            // Generic
            if (this.player.ZoneUnderworldHeight) {
                this.player.AddBuff(BuffID.OnFire, 2, true, false);
                this.player.solarMonolithShader = true;
            }

            if (this.player.ZoneCorrupt) {
                this.player.AddBuff(BuffID.Darkness, 2, true, false);
            }
            if (this.player.ZoneCrimson) {
                this.player.AddBuff(BuffID.Bleeding, 2, true, false);
            }

            // if player have Slimed Debuff Reduce Move Speed in 70%
            if (this.player.drippingSlime) {
                this.player.moveSpeed *= 0.6; //40%
                this.player.jumpHeight *= 0.6; //40%
            }
        };
        ApplyDebuffDebuff();
    }
}
