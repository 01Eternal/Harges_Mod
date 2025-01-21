/** @format */

import { using } from '../../../TL/ModClasses.js';

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

export default class SlimeBoss extends GlobalNPC {
	constructor() {
		super();
	}

	SetDefaults(npc) {
		if (npc.type === 50) {
			npc.life *= 1.15;
			npc.lifeMax *= 1.15;

			this.slimeDelay = null;
			this.slimeSpikeDelay = 0 
			this.slimeJumpCount = null;
			this.inJump = null;
			this.teleportDelay = null;
		}
	}

	AI(npc) {
		if (npc.type == 50) {
		this.slimeSpikeDelay++
		
		    	const ShootFallSpike = (quantity = 3, projID = ModProjectile.getTypeByName('SlimySpike')) => {
		    	let damage = 10
				for (let i = 0; i < quantity; i++) {
					NewProjectile(
						Projectile.GetNoneSource(),
						vector2(Main.player[Main.myPlayer].Center.X - 512 + i * 75, Main.player[Main.myPlayer].Center.Y - 400),
						vector2(0, 1),
						projID,
						damage,
						0,
						Main.myPlayer,
						0,
						0,
						0
					);
				}
			};
			
			if (this.slimeSpikeDelay % 150 === 0) // ShootFallSpike(10, ModProjectile.getTypeByName('SpikeLine'))
			
			if (this.slimeSpikeDelay % 200 === 0) ShootFallSpike(15)
		}
	}

	OnHitPlayer(npc, player) {
		if (npc.type === 50) {
		}
	}
}
