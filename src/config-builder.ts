import { DiverseText, DiverseTextNodeConfig } from './types';

export class DiverseTextNodeConfigBuilder {
    private config?: DiverseTextNodeConfig;

    separateBy(separator: DiverseText): DiverseTextNodeConfigBuilder {
        this.config = this.config || {};
        this.config.separator = this.config.separator || { default: separator };
        this.config.separator.default = separator;
        return this;
    }

    separateLastBy(separator: DiverseText): DiverseTextNodeConfigBuilder {
        this.config = this.config || {};
        this.config.separator = this.config.separator || { default: '' };
        this.config.separator.last = separator;
        return this;
    }

    build(): DiverseTextNodeConfig {
        return this.config;
    }
}