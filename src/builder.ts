import { Strategy, DiverseText, Weighted, OptionallyWeighted, Separator } from './types';
import { DiverseTextNodeConfigBuilder } from './config-builder';

export function separateBy(separator: DiverseText): DiverseTextNodeConfigBuilder {
    return new DiverseTextNodeConfigBuilder().separateBy(separator);
}

export function separateLastBy(separator: DiverseText): DiverseTextNodeConfigBuilder {
    return new DiverseTextNodeConfigBuilder().separateLastBy(separator);
}

function all(config: DiverseTextNodeConfigBuilder, ...nodes: DiverseText[]): DiverseText
function all(...nodes: DiverseText[]): DiverseText
function all(config: any, ...nodes: DiverseText[]): DiverseText {
    if (!(config instanceof DiverseTextNodeConfigBuilder)) {
        nodes.unshift(config);
        config = null;
    }
    return sequence(nodes, config);
}

function randomN(count: number, ...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText
function randomN(count: number, config: DiverseTextNodeConfigBuilder, ...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText
function randomN(count: number, config: any, ...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText {
    if (!(config instanceof DiverseTextNodeConfigBuilder)) {
        weightedNodes.unshift(config);
        config = null;
    }
    return randomizedSequence(count, weightedNodes, config);
}

function randomAll(config: DiverseTextNodeConfigBuilder, ...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText
function randomAll(...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText
function randomAll(config: any, ...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText {
    if (!(config instanceof DiverseTextNodeConfigBuilder)) {
        weightedNodes.unshift(config);
        config = null;
    }
    return randomizedSequence(weightedNodes.length, weightedNodes, config);
}

function randomOne(...weightedNodes: OptionallyWeighted<DiverseText>[]): DiverseText {
    return randomizedSequence(1, weightedNodes);
}

function sequence(nodes: DiverseText[], config?: DiverseTextNodeConfigBuilder): DiverseText {
    if (!nodes.length) {
        return '';
    }

    return {
        children: nodes,
        config: config && config.build()
    };
}

function randomizedSequence(count: number, optionallyWeightedNodes: OptionallyWeighted<DiverseText>[], config?: DiverseTextNodeConfigBuilder): DiverseText {
    if (!optionallyWeightedNodes.length) {
        return '';
    }

    const weightedNodes = optionallyWeightedNodes.map(convertWeighted);
    return {
        strategy: Strategy.Randomized,
        children: weightedNodes.map(x => x[1]),
        childrenWeights: weightedNodes.map(x => x[0]),
        count: count,
        config: config && config.build()
    };
}

function convertWeighted<T>(optionallyWeighted: OptionallyWeighted<T>): Weighted<T> {
    return isWeighted(optionallyWeighted) ? optionallyWeighted : [1, optionallyWeighted];
}

function isWeighted<T>(value: OptionallyWeighted<T>): value is Weighted<T> {
    return Array.isArray(value) && value.length === 2 && typeof (value[0]) === 'number';
}

export {
    all,
    randomN,
    randomAll,
    randomOne
}