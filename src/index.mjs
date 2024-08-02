import { Discovery } from './components/discovery.mjs';
import { Requester } from './components/requester.mjs';
import { Responder } from './components/responder.mjs';
import { Publisher } from './components/publisher.mjs';
import { Subscriber } from './components/subscriber.mjs';
import { Sockend } from './components/sockend.mjs';
import { Monitor } from './components/monitor.mjs';
// import MonitoringTool from './monitoring-tool/index.js'; todo
import { TimeBalancedRequester } from './components/time-balanced-requester.mjs';
import { PendingBalancedRequester } from './components/pending-balanced-requester.mjs';

import optionsBuilder from 'cote/src/options-builder.mjs';

const cote = (options = {}) => {
    options = optionsBuilder(options);
    Discovery.setDefaults(options);

    const components = [
        Requester,
        Responder,
        Publisher,
        Subscriber,
        Sockend,
        TimeBalancedRequester,
        PendingBalancedRequester,
    ];

    components.forEach(function(component) {
        component.setEnvironment(options.environment);
        component.setUseHostNames &&
            component.setUseHostNames(options.useHostNames);
    });

    return cote;
};

cote.Requester = Requester;
cote.Responder = Responder;
cote.Publisher = Publisher;
cote.Subscriber = Subscriber;
cote.Sockend = Sockend;
cote.Monitor = Monitor;
//cote.MonitoringTool = MonitoringTool;
cote.TimeBalancedRequester = TimeBalancedRequester;
cote.PendingBalancedRequester = PendingBalancedRequester;

export default cote();