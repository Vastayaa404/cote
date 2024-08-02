import { Requester } from './requester.mjs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export class PendingBalancedRequester extends Requester {
  constructor(advertisement, discoveryOptions) {
    super(advertisement, discoveryOptions);

    this.sock.on('connect', (sock) => {
      sock.uuid = uuid.v4();
    });
  }

  send(...args) {
    const sock = this.sock;

    if (sock.socks.length) {
      sock.socks.forEach((s) => {
        s.count = 0;
      });

      _.forEach(sock.callbacks, (cb) => {
        cb.sock && cb.sock.count++;
      });

      sock.n = sock.socks.indexOf(_.minBy(sock.socks, 'count'));
    }

    const rv = super.send(...args);

    if (!sock.socks.length) return rv;

    const sentSock = sock.socks[sock.n - 1];

    const cbId = `${sock.identity}:${sock.ids - 1}`;
    sock.callbacks[cbId].sock = sentSock;

    return rv || sentSock.uuid;
  }
}