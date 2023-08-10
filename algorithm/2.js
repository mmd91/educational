var MyQueue = function () {
    this.firstStack = []
    this.secondStack = []
  }
  
  MyQueue.prototype.push = function (x) {
    this.firstStack.push(x)
  }
  
  MyQueue.prototype.pop = function () {
    this._prepare()
    return this.secondStack.pop()
  }
  
  MyQueue.prototype.peek = function () {
    this._prepare()
    return this.secondStack[this.secondStack.length - 1]
  }
  
  MyQueue.prototype.empty = function () {
    return this.firstStack.length === 0 && this.secondStack.length === 0
  }
  
  MyQueue.prototype._prepare = function () {
    if (this.secondStack.length === 0)
      while (this.firstStack.length > 0)
        this.secondStack.push(this.firstStack.pop())
  };
  
  
  
  var myQueue = new MyQueue();
  console.log(myQueue.push(1)); // queue is: [1]
  console.log(myQueue.push(2)); // queue is: [1, 2] (leftmost is front of the queue)
  console.log(myQueue.peek()); // return 1
  console.log(myQueue.pop()); // return 1, queue is [2]
  console.log(myQueue.empty()); // return false