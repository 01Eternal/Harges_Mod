/** @format */

// EternalDev

/**
 * @Terraria
 */
import { ItemRarityID } from './Terraria/ID_ItemRarityID.js';

/**
 * ModdedClasses
 */

import { ModItem } from './ModItem.js';
import { ModProjectile } from './ModProjectile.js';
// import HargesApi from '../Harges/Harges.js';
import { GlobalNPC } from './GlobalNPC.js';
import { ModPlayer } from './ModPlayer.js';
import Harges_Player from '../Players/HargesPlayer.js';
import { GlobalItem } from './GlobalItem.js';
import { GlobalProjectile } from './GlobalProjectile.js';
import { ModTexture } from './ModTexture.js';
// TL Classes END

/**
 * HargesClasses
 */

import { vec2, rec, color } from '../Harges/Utils/MicrosoftUtils.js';
import { generic } from '../Harges/Utils/VoidUtils.js';

const AppDomain = new NativeClass('System', 'AppDomain');
const Assembly = new NativeClass('System.Reflection', 'Assembly');

const GetAssemblies = AppDomain['Assembly[] GetAssemblies()'];
const GetTypes = Assembly['Type[] GetTypes()'];

function getAllTypes() {
	const assemblies = GetAssemblies(AppDomain.CurrentDomain);
	const allTypes = {};

	for (let i = 0; i < assemblies.length; i++) {
		const assembly = assemblies[i];
		const types = GetTypes(assembly);

		for (let j = 0; j < types.length; j++) {
			const type = types[j];
			const typeName = type.Name;
			const namespaceName = type.Namespace || 'GLOBAL';

			if (!allTypes[namespaceName]) {
				allTypes[namespaceName] = new Set();
			}
			allTypes[namespaceName].add(typeName);
		}
	}
	return allTypes;
}

let allTypes = getAllTypes();
let NativeClasses = {};
let CustomClasses = {}; // Modded Class

function addClassToNamespace(structure, namespace, className, classInstance) {
	const namespaceParts = namespace.split('.');
	let current = structure;

	for (let part of namespaceParts) {
		if (!current[part]) {
			current[part] = {};
		}
		current = current[part];
	}

	current[className] = classInstance;
}

for (const namespace in allTypes) {
	const typesFromNamespace = allTypes[namespace];

	if (typesFromNamespace.size > 0) {
		for (const type of typesFromNamespace) {
			try {
				addClassToNamespace(NativeClasses, namespace, type, new NativeClass(namespace, type));
			} catch (error) {}
		}
	}
}

export function using(...namespaces) {
	namespaces.forEach(namespace => {
		if (NativeClasses[namespace]) {
			const classes = NativeClasses[namespace];
			for (const className in classes) {
				const classObj = classes[className];
				globalThis[className] = classObj;
			}
		} else {
			const namespaceParts = namespace.split('.');
			let currentNamespace = NativeClasses;

			for (const part of namespaceParts) {
				if (currentNamespace[part]) {
					currentNamespace = currentNamespace[part];
				} else {
					//tl.log(`Namespace ${namespace} Not Found.`);
					return;
				}
			}

			for (const className in currentNamespace) {
				globalThis[className] = currentNamespace[className];
			}
		}

		if (CustomClasses[namespace]) {
			const classes = CustomClasses[namespace];

			for (const className in classes) {
				globalThis[className] = classes[className];
			}
		}
	});
}

export function ModClass_register(namespace, className, classInstance) {
	addClassToNamespace(CustomClasses, namespace, className, classInstance);
	globalThis[className] = classInstance;
}

// Terraria Path Cause Error
ModClass_register('Terraria.ID', 'ItemRarityID', ItemRarityID);

// TL Path
ModClass_register('TL', 'ModProjectile', ModProjectile);
ModClass_register('TL', 'ModItem', ModItem);
ModClass_register('TL', 'ModTexture', ModTexture);
ModClass_register('TL', 'GlobalNPC', GlobalNPC);
ModClass_register('TL', 'ModPlayer', ModPlayer);
ModClass_register('TL', 'GlobalItem', GlobalItem);
ModClass_register('TL', 'GlobalProjectile', GlobalProjectile);

// Harge's API
// ModClass_register('Harges', 'Harges', HargesApi);
ModClass_register('Harges', 'vector2', vec2);
ModClass_register('Harges', 'color', color);
ModClass_register('Harges', 'rectangle', rec);
ModClass_register('Harges', 'generic', generic);
ModClass_register('Harges', 'HargesPlayer', Harges_Player);
