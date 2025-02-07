/** @format */

import { using } from '../../TL/ModClasses.js';

using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework');
using('TL');

const NewProjectile = Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 velocity, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];

const vector2 = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x, y);
const Multiply = Vector2['Vector2 Multiply(Vector2 value1, float scaleFactor)'];
const Normalize = Vector2['Vector2 Normalize(Vector2 value)'];
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)'];

const Goblin = [
	NPCID.GoblinArcher, //
	NPCID.GoblinPeon,
	NPCID.GoblinScout,
	NPCID.GoblinSorcerer,
	NPCID.GoblinSummoner,
	NPCID.GoblinThief,
	NPCID.GoblinWarrior
];
export default class Goblins extends GlobalNPC {
	constructor() {
		super();
	}

	SetDefaults(npc) {
		if (npc.type == NPCID.GoblinWarrior) npc.knockBackResist /= 10;
	}

	AI(npc) {}

	OnHitPlayer(npc, player) {
		if (Goblin.includes(npc.type)) {
			let item = player.HeldItem;

			if (item.type !== 0) {
				if (Math.random() > 0.75) player.DropSelectedItem();
			}
		}
	}
}
