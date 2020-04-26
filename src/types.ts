export enum Strategy {
    Strict = 1,
    Randomized = 2
}

export interface DiverseTextNodeConfig {
    separator?: DiverseTextNodeSeparatorConfig;
}

export interface DiverseTextNodeSeparatorConfig {
    default: DiverseText;
    last?: DiverseText;
}

interface DiverseTextNode {
    strategy?: Strategy;
    children?: DiverseText[];
    childrenWeights?: number[];
    count?: number;
    config?: DiverseTextNodeConfig;
}
export type DiverseText = DiverseTextNode | string;

export type Separator = DiverseText | DiverseText[];

export type Weighted<T> = [number, T];
export type OptionallyWeighted<T> = Weighted<T> | T;