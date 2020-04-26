# DiverseText

A library for generating randomized texts.

## Build

```
npm i && npm run build
```

## Examples

### Choose a random word

```typescript
import { render, randomOne } from 'diverse-text'

const diverseText = randomOne('begin', 'start', 'commence', 'initiate')
const renderedStaticText = render(text);
console.log(renderedStaticText); // can print "start"
```

### Choose a random word with weights

```typescript
import { render, randomOne } from 'diverse-text'

const text = randomOne([0.8, 'begin'], [0.2 'start'])
console.log(render(text)); // most likely prints "begin"
```

### Combine parts of texts with no limits

```typescript
import { render, all, randomOne } from 'diverse-text'

const text = all('I want to ', randomOne([0.8, 'begin'], [0.2 'start'], ' a project')
console.log(render(text)); // I want to start a project
```

### Omit trailing spaces

```typescript
import { render, all, randomOne, separateBy } from 'diverse-text'

const text = all(separateBy(' '), 'I want to', randomOne([0.8, 'begin'], [0.2 'start'], 'a project')
console.log(render(text)); // I want to begin a project
```

### Randomize order

```typescript
import { render, randomAll, separateBy } from 'diverse-text'

const text = randomAll(
    separateBy(', ').separateLastBy(', and '),
    'red',
    'white',
    'blue'
);
console.log(render(text)); // white, blue, and red
```

### Take N random words with weights

```typescript
import { render, randomN, separateBy } from 'diverse-text'

const text = randomN(
    2,
    separateBy(' '),
    [0.5, 'red'],
    [0.1, 'white'],
    [0.4, 'blue']
);
console.log(render(text)); // blue red
```

### More complex example

```
node dist/example-google.js
```