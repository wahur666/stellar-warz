


export class Node {
    id: string;
    neighbors: Set<string>;

    constructor(id: string) {
        this.id = id;
        this.neighbors = new Set();
    }

    addNeighbor(id: string) {
        this.neighbors.add(id);
    }
}

export class Nav {
    private nodes: Map<string, Node>;

    constructor() {
        this.nodes = new Map();
    }

    private addNode(id: string): void {
        if (this.nodes.has(id)) {
            return;
        }
        this.nodes.set(id, new Node(id));
    }

    addEdge(id1: string, id2: string): void {
        if (!this.nodes.has(id1)) {
            this.addNode(id1)
        }
        if (!this.nodes.has(id2)) {
            this.addNode(id2)
        }
        this.nodes.get(id1)!.addNeighbor(id2);
        this.nodes.get(id2)!.addNeighbor(id1);
    }

    getNode(id: string): Node | undefined {
        return this.nodes.get(id);
    }

    bfs(start: string, target: string): string[] | null {
        if (!this.nodes.has(start) || !this.nodes.has(target)) return null;

        const queue: [string, string[]][] = [[start, [start]]];
        const visited: Set<string> = new Set();

        while (queue.length > 0) {
            const [current, path] = queue.shift()!;
            if (current === target) return path;

            if (!visited.has(current)) {
                visited.add(current);
                for (const neighbor of this.nodes.get(current)!.neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push([neighbor, [...path, neighbor]]);
                    }
                }
            }
        }

        return null; // No path found
    }
}