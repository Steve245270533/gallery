import {Light, Mesh} from "three";

export function isMesh(obj: unknown): obj is Mesh {
	return (typeof obj === "object" && obj !== null && "isMesh" in obj);
}

export function isLight(obj: unknown): obj is Light {
	return obj instanceof Light;
}
