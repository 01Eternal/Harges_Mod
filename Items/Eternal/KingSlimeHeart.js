/** @format */

import { using } from '../../TL/ModClasses.js';
using('Harges');
using('Terraria');

export default class KingSlimeHeart extends ModItem {
	constructor() {
		super();
		this.Texture = `Items/Eternal/${this.constructor.name}`;
		this.horizontalFrames = 4;
		this.dashingResetTimer = 0;
		this.slimyDashTimer = 0;
		this.dashCount = 0;
	}

	SetDefaults() {
		this.Item.accessory = true;
		this.Item.material = true;
	}

	UpdateAccessory(item, player) {
	    HargesPlayer.SlimyHeart = true
	}
}
