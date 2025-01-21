/** @format */

import { using } from '../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework');
using('TL');

const NewProjectile =
	Projectile[
		'int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'
	];

const vector2 = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x, y);
const Multiply = Vector2['Vector2 Multiply(Vector2 value1, float scaleFactor)'];
const Normalize = Vector2['Vector2 Normalize(Vector2 value)'];
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];

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
