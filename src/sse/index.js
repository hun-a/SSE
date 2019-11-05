const SseStream = require('ssestream');
const PubSub = require('pubsub-js');

module.exports = class SSE {
  constructor(topic) {
    this.topic = topic;
  }

  detect(id, type) {
    PubSub.publish(this.topic, { id, type, timestamp: Date.now() });
  }

  register(req, res) {
    /**
     * Data format
     * {
     *  id: posting ID,
     *  type: CREATE or UPDATE or DELETE
     *  timestamp: Unix Epoch timestamp
     * }
     */
    const sse = new SseStream(req);
    sse.pipe(res);
    PubSub.subscribe(this.topic, (event, data) => {
      sse.write({ event, data });
    });

    res.on('close', () => {
      sse.unpipe(res);
    });
  }
};
