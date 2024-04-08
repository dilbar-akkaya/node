function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
        return this;
    }
    on(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
        return this;
    }

    removeListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName].filter(item => item !== fn);
    }

    off(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName].filter(item => item !== fn);
    }

    once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        const onceWrapper = () => {
            fn();
            this.removeListener(eventName, onceWrapper);
        }
        this.listeners[eventName].push(onceWrapper);
    }

    emit(eventName, ...args) {
        let fns = this.listeners[eventName];
        if (!fns) return false;
        fns.forEach((f) => {
            f(...args);
        });
        return true;
    }

    listenerCount(eventName) {
        let fns = this.listeners[eventName] || [];
        return fns.length;
    }

    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}

const myEmitter = new EventEmitter();
myEmitter.on('eventOne', c1);
myEmitter.on('eventOne', c2);
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));
myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');
console.log(myEmitter.listenerCount('eventOne'));
console.log(myEmitter.rawListeners('eventOne'));
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

const fetchFromUrl = async (url, cb) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error ('Response isnt ok');
    };
    const data = await response.json();
    cb(null, data);
    return data;
  } catch(err) {
    console.error('error:', err);
    cb(err, null);
  }
}

class WithTime extends EventEmitter {
    constructor() {
        super();
    }
    async execute(asyncFunc, ...args) {
        try {
            this.emit('begin');
            console.log('Starting...');
            let startTime = Date.now();
            let data = await asyncFunc(...args, (err, data) => {
                if (err) {
                    console.error('error', err);
                }
                console.log('data:', data);
            });
            let endTime = Date.now();
            this.emit('end', endTime-startTime);
            console.log(`End with ${endTime-startTime} ms`);
            this.emit('data', data);
            console.log('data', data);
        } catch (err) {
            console.error(err);
        }
        
    }
 }

 const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', () => console.log('Recieved data'));
withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));

