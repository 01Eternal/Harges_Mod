/** @format */

import { vec2, gen } from './Utils/VoidUtils.js';

const Main = new NativeClass ('Terraria', 'Main')

export default class Harges {
	static vector2 = vec2;
	static generic = gen;
	static isMerceless = Main.GameMode == 2
}
