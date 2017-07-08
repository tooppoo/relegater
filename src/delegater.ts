export interface Delegater<T> {
  to: (delegater: Object | Function, ...properties: string[]) => Delegater<T>;
  self: T;
}
export interface $Delegater {
  to: (delegater: Object | Function, ...properties: string[]) => $Delegater;
}

const delegating = function(destructive: boolean, delegated: Object, ...properties: string[]) {
  const acceptable = (typeof this === 'object' || typeof this === 'function');
  if(!acceptable) {
    throw new TypeError(`[delegate-js] ${JSON.stringify(this)} is not acceptable, only object or function`);
  }
  if(!delegated) {
    throw new TypeError(`[delegate-js] delegated object must not be undefined or null`);
  }

  properties.forEach(property => {
    const targetProp = (<any>delegated)[property];
    if(targetProp === undefined) {
      return;
    }

    Object.defineProperty(this, property, {
      get: () => (<any>delegated)[property],
      configurable: false
    });
  });
  return destructive ? $delegate(this) : delegate(this);
};

export const delegate = <T extends Object | Function>(self: T): Delegater<T> => {
  return {
    to: delegating.bind(Object.create(self), false),
    self
  };
};

export const $delegate = (self: Object | Function): $Delegater => {
  return {
    to: delegating.bind(self, true)
  };
}
