import { Strategy, DiverseText, Weighted } from './types';

export function render(node: DiverseText): string {
    if (typeof node === "string") {
        return node;
    }
    const strategy = node.strategy || Strategy.Strict;
    const children = node.children || [];

    let result: string[];

    switch (strategy) {
        case Strategy.Strict:
            result = children.map(render);
            break;
        case Strategy.Randomized:
            result = renderRandomized(children, node.childrenWeights || [], node.count || children.length);
            break;
    }

    result = result.filter(x => x);

    if (result.length < 2 || !node.config || !node.config.separator) {
        return result.join('');
    }

    return result.slice(0, result.length - 1).join(render(node.config.separator.default))
        + render(node.config.separator.last || node.config.separator.default)
        + result[result.length - 1];
}

function renderRandomized(nodes: DiverseText[], weights: number[], count: number): string[] {
    const result = [];
    const weightedChildren = nodes.map((x, i) => [weights[i] || 0, x] as Weighted<DiverseText>);
    for (let i = 0; i < count; ++i) {
        const index = pickIndex(weightedChildren);
        result.push(render(weightedChildren[index][1]));
        weightedChildren.splice(index, 1);
    }
    return result;
}

function pickIndex<T>(weightedValues: Weighted<T>[]): number {
    const weightSum = weightedValues.reduce((a, b) => a + b[0], 0);
    let roll = Math.random() * weightSum;
    for (let i = 0; i < weightedValues.length; i++) {
        roll -= weightedValues[i][0];
        if (roll <= 0) {
            return i;
        }
    }
    return weightedValues.length - 1;
}