/** @format */

import { using } from '../TL/ModClasses_Inner.js';
import { ModPlayer } from '../TL/ModPlayer.js'

using('Terraria');

export default class HargesPlayer extends ModPlayer {
	static SlimyHeart;

	ResetEffects() {
		HargesPlayer.SlimyHeart = false;
	}

	PostUpdateEquips() {	
	
		const SlimyHeartLogic = (speed = 0, exDamage = 0) => {
		    this.player.statLifeMax2+= 25;
		    
		    
		    this.player.meleeDamage += exDamage
		    this.player.magicDamage += exDamage
		    this.player.rangedDamage += exDamage
		    
		    if (this.player.statLife < this.player.statLifeMax * 0.5) {
		        this.player.moveSpeed += speed
		    }
		}	
		if (HargesPlayer.SlimyHeart) SlimyHeartLogic(0.35, 0.07)
		
		
		
	}
}
