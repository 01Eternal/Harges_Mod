/** @format */

// =============================================================================================

import { ModItem } from '../TL/ModItem.js';
import { ModPlayer } from '../TL/ModPlayer.js';
import { ModProjectile } from '../TL/ModProjectile.js';

import { GlobalItem } from '../TL/GlobalItem.js';
import { GlobalNPC } from '../TL/GlobalNPC.js';
import { GlobalProjectile } from '../TL/GlobalProjectile.js';


import DebuffZone from '../Players/DebuffEnvironment.js'

import Slimes_Rework from '../NPCs/Vanilla/Slimes.js'
import EyeOfChuthulho from '../NPCs/Vanilla/Bosses/EOC/AI.js';
import KingSlime from '../NPCs/Vanilla/Bosses/KingSlime/AI.js';

// =============================================================================================

export function Register() {
	Items();
	NPCs();
	// projectiles();
	ModPlayers()
}

function NPCs() {
    GlobalNPC.register(Slimes_Rework)
	GlobalNPC.register(EyeOfChuthulho);
	GlobalNPC.register(KingSlime);
}

function ModPlayers() {
    ModPlayer.register(DebuffZone)
}

function Items() {
	// ModItem.register(itemTest);
}

function projectiles() {}
