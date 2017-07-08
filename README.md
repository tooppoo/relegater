# relegater

[![Build Status](https://travis-ci.org/topo-js/delegate-js.svg?branch=master)](https://travis-ci.org/topo-js/delegate-js)
[![Coverage Status](https://coveralls.io/repos/github/topo-js/delegate-js/badge.svg?branch=master)](https://coveralls.io/github/topo-js/delegate-js?branch=master)

provide functions in order to delegate a property access or method call for base object to other.

Interfaces of the functions imitate `delegate` method in Ruby on Rails.

## example
```javascript
import { delegate, $delegate } from 'relegater';

const baseObj = {
  a: 1, b: 'b'
};
const delegated = {
  c: () => 'c',
  d: {
    e: true
  }
};

// delegate() create new object.
// no update to base object exist.
var result = delegate(baseObj).to(delegated, 'c', 'd').self;

result.a // 1
result.b // 'b'
result.c() // 'c'
result.d.e // true

baseObj.a // 1
baseObj.b // 'b'
baseObj.c // undefined
baseObj.d // undefined

// $delegate() modify base object destructively.
$delegate(baseObj).to(delegated, 'c', 'd');

baseObj.a // 1
baseObj.b // 'b'
baseObj.c() // 'c'
baseObj.d.e // true
```

**baseObj** is a object which receive actually property accesses or method calls.

when you want to delegate reference for **baseObj** to other, you should pass **baseObj** to `delegate()` or `$delegate()`.

## delegate()
`delegate()` create a new object which extends **baseObj**.

this function don't modify **baseObj**, so you use the created object instead of **baseObj**.

you can get the object from `delegate({}).self`.

## $delegate()
`$delegate()` modify **baseObj** directly and destructively, but not modify prototype of **baseObj**.

## how to delegate
`delegate()/$delegate()` return object which has following property.

- to(delegated, prop1, prop2, ... propX)

  this method return a new object which has same interface.
  this method can chain. when a property is specified twice in the method chain, later is preferred.

  **delegated** is a object which **baseObj** delegate some property accesses or method calls to.
  - **delegated** must be *object*. if this is not *object*, runtime error raise.
  - prop1~X is variable arguments.
    each prop is string which presents property name in **delegated**;

    if propX does not exist in **delegated**, it is ignored.

- self
  this property exist only when you use `delegate()`.

  this object base on **baseObj** and has all properties which are specified by `to()`.

## License
MIT License
