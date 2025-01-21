/** @format */

// =============================================================================================

import { ModItem } from '../TL/ModItem.js';
import { ModPlayer } from '../TL/ModPlayer.js';
import { ModProjectile } from '../TL/ModProjectile.js';

import { GlobalItem } from '../TL/GlobalItem.js';
import { GlobalNPC } from '../TL/GlobalNPC.js';
import { GlobalProjectile } from '../TL/GlobalProjectile.js';


import DebuffZone from '../Players/DebuffEnvironment.js'
import KingSlime from '../NPCs/Vanilla/Bosses/SlimeBoss.js';
import Slimy_Spike from '../Projectiles/Eternal/SlimySpike.js';

import Slimes_Rework from '../NPCs/Vanilla/Slimes.js'
import EyeOfChuthulho from '../NPCs/Vanilla/Bosses/Eoc.js';
import Eye_Lighting from '../Projectiles/Eternal/BloodSpike.js';

// =============================================================================================

export function Register() {
	Items();
	NPCs();
	projectiles();
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

function projectiles() {
	ModProjectile.register(Slimy_Spike)
	ModProjectile.register(Eye_Lighting);
}
