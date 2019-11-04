const EventEmitter = require('events');

module.exports = class SSE extends EventEmitter {
  constructor() {
    super();
  }

  call(id, type) {
    this.emit('change', { id, type, timestamp: Date.now() });
  }

  register(req, res) {
    /**
     * format
     * {
     *  id: posting ID,
     *  type: CREATE or UPDATE or DELETE
     *  timestamp: Unix Epoch timestamp
     * }
     */
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
    res.write('\n');

    this.on('change', data => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
};
