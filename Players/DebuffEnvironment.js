/** @format */

import { using } from '../TL/ModClasses.js';

using('TL');
using('Terraria');
using('Terraria.ID');
export default class DebuffEnvironment extends ModPlayer {
	PreUpdateEquips(player) {
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
