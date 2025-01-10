import Vector2 = Phaser.Math.Vector2;

/** Return (0..num-1) values */
export const range = (num: number): number[] => [...Array(num).keys()];

/** Converts Vector2 to [x, y] */
export function vector2ToArray(p: Vector2): [number, number] {
    return [p.x, p.y];
}

export const defaultFont = "Roboto, Arial, sans-serif";

export const formatTime = (s: number) => (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

export function coordToIndex(x: number, y: number, width: number, height: number): number {
    if (x < 0 || y < 0 || x >= width || y >= height) {
        throw new Error("Coordinates are out of bounds");
    }
    return y * width + x;
}

export function c2i(x: number, y: number): number {
    return coordToIndex(x, y, 49, 22)
}