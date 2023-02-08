class Promise {
    constructor(executor) {
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        this.callbacks = [];
        const self = this;
        function resolve(data) {
            if (self.PromiseState != 'pending') return;
            self.PromiseState = 'Resolved';
            self.PromiseResult = data;
            setTimeout(() => {
                self.callbacks.forEach(items => {
                    items.onResolved(data);
                });
            });
        }
        function reject(data) {
            if (self.PromiseState != 'pending') return;
            self.PromiseState = 'Rejected';
            self.PromiseResult = data;
            setTimeout(() => {
                self.callbacks.forEach(items => {
                    items.onRejected(data);
                });
            });
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            self.PromiseState = 'Rejected';
            self.PromiseResult = e;
        }
    }

    then(onResolved, onRejected) {
        const self = this;
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason;
            }
        }
        if (typeof onResolved !== 'function') {
            onResolved = value => value;
        }
        return new Promise((resolve, reject) => {
            function callback(type) {
                try {
                    let result = type(self.PromiseResult);
                    if (result instanceof Promise) {
                        result.then(v => {
                            resolve(v);
                        }, r => {
                            reject(r);
                        })
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            }
            if (self.PromiseState === 'Resolved' || self.PromiseState === 'fullfilled') {
                setTimeout(() => {
                    callback(onResolved);
                })
            }
            if (self.PromiseState === "Rejected") {
                setTimeout(() => {
                    callback(onRejected);
                })

            }
            //处理异步回调
            if (self.PromiseState === 'pending') {
                self.callbacks.push({
                    onResolved: function () {
                        callback(onResolved);
                    },
                    onRejected: function () {
                        callback(onRejected);
                    }
                })
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                try {
                    value.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } catch (e) {
                    reject(e);
                }

            } else {
                resolve(value)
            }
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let count = 0;
            let arr = [];
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    count++;
                    arr[i] = v;
                    if (count === promises.length)
                        resolve(arr);
                }, r => {
                    reject(r)
                })
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    resolve(v);
                }, r => {
                    reject(r)
                })
            }
        })
    }

    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            resolve(promises);
        })
    }
}