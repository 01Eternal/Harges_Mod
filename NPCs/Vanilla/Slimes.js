/** @format */

import { using } from '../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework');
using('TL');
using('Harges')
const Slime = [            
    NPCID.BlueSlime,
            NPCID.BlackSlime,
            NPCID.Pinky,
            NPCID.SlimeRibbonGreen,
            NPCID.SlimeRibbonRed,
            NPCID.SlimeRibbonWhite,
            NPCID.SlimeRibbonYellow,
            NPCID.SlimeMasked,
            NPCID.Slimeling,
            NPCID.Slimer,
            NPCID.Slimer2,
            NPCID.SlimeSpiked,
            NPCID.BabySlime,
            NPCID.BlackSlime,
            NPCID.CorruptSlime,
            NPCID.DungeonSlime,
            NPCID.DungeonSlime,
            NPCID.GoldenSlime,
            NPCID.GreenSlime,
            NPCID.IceSlime,
            NPCID.JungleSlime,
            NPCID.IlluminantSlime,
            NPCID.LavaSlime,
            NPCID.MotherSlime,
            NPCID.PurpleSlime,
            NPCID.QueenSlimeMinionPink,
            NPCID.QueenSlimeMinionPurple,
            NPCID.RainbowSlime,
            NPCID.RedSlime,
            NPCID.SandSlime,
            NPCID.SpikedIceSlime,
            NPCID.SpikedJungleSlime,
            NPCID.UmbrellaSlime,
            NPCID.YellowSlime,
            NPCID.Crimslime,
            NPCID.BigCrimslime,
            NPCID.LittleCrimslime,
            NPCID.ToxicSludge
       ]
export default class Slimes extends GlobalNPC {
	constructor() {
		super();
	}

	SetDefaults(npc) {
	}
	
	AI(npc) {
	    if (Slime.includes(npc.type)) {
	        npc.TargetClosest(true)
	    }
	}
	
	OnHitPlayer(npc, player) {
	    if (Slime.includes(npc.type)) {
	        player.AddBuff(BuffID.Slimed, 60, true, false)
	    }
	}
}
