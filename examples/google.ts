import { render, all, randomOne, randomAll, randomN, separateBy } from '../src/index';

const company = all(
    randomOne(
        all(separateBy(' '), 'an American', randomAll(separateBy(' '), 'multinational', 'technology')),
        all(separateBy(' '), randomOne('a multinational', 'an international'), randomAll(separateBy(' '), 'American', 'technology')),
        all(separateBy(' '), 'a technology', randomAll(separateBy(' '), randomOne('multinational', 'international'), 'American')),
    ),
    ' ',
    'company'
);

const services = randomN(
    4,
    separateBy(', ').separateLastBy(', and '),
    'online advertising technologies',
    'a search engine',
    'cloud computing',
    'software',
    'hardware');

const definition = all(
    all(
        separateBy(' '),
        'Google',
        randomOne([0.6, 'LLC'], [0.3, '']),
        'is',
        company,
        randomOne('that specializes', 'specializing'),
        all('in Internet', randomOne('-related', '')),
        randomAll(separateBy(' and '), 'services', 'products')
    ),
    randomOne(', which', '. They'),
    ' include ',
    services
);

const otherBig4Companies = randomAll(separateBy(', ').separateLastBy(', and '), 'Amazon', 'Apple', 'Microsoft');

const isInBig4 = all(
    all(
        all(separateBy(' '), 'It is considered one of the Big Four', randomOne('technology', 'IT'), 'companies'),
        ', ',
        randomOne('alongside', 'same as')),
    ' ',
    otherBig4Companies
);

const result = all(definition, '. ', isInBig4, '.');

console.log(render(result));