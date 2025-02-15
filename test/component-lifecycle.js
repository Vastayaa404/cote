// const test = require('ava');
// const LogSuppress = require('../lib/log-suppress');
// const r = require('randomstring');

// const environment = r.generate();
// const { Requester, Responder } = require('../')({ environment });

// LogSuppress.init(console);

// test('Instantiate a requester', (t) => {
//     const key = r.generate();
//     const requester = new Requester({ name: `${t.title}: requester`, key });

//     t.is(requester.type, 'req');
// });

// test.cb('Discover and close a requester', (t) => {
//     t.plan(1);

//     const key = r.generate();
//     const requester = new Requester({ name: `${t.title}: ${key} requester`, key });
//     const responder = new Responder({ name: `${t.title}: ${key} responder`, key });

//     responder.on('cote:added', () => requester.close());
//     responder.on('cote:removed', (obj) => {
//         t.is(obj.advertisement.name, `${t.title}: ${key} requester`);

//         responder.close();
//         t.end();
//     });
// });

import test from 'ava';
import LogSuppress from '../lib/log-suppress';
import { randomString } from 'randomstring';
import { Requester, Responder } from '../';

const environment = randomString();
const { Requester: RequesterClass, Responder: ResponderClass } = Requester({ environment });

LogSuppress.init(console);

test('Instantiate a requester', (t) => {
    const key = randomString();
    const requester = new RequesterClass({ name: `${t.title}: requester`, key });

    t.is(requester.type, 'req');
});

test.cb('Discover and close a requester', (t) => {
    t.plan(1);

    const key = randomString();
    const requester = new RequesterClass({ name: `${t.title}: ${key} requester`, key });
    const responder = new ResponderClass({ name: `${t.title}: ${key} responder`, key });

    responder.on('cote:added', () => requester.close());
    responder.on('cote:removed', (obj) => {
        t.is(obj.advertisement.name, `${t.title}: ${key} requester`);

        responder.close();
        t.end();
    });
});
