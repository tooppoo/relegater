export interface Delegater<T> {
  to: (delegater: Object | Function, ...properties: string[]) => Delegater<T>;
  self: T;
}
export interface $Delegater {
  to: (delegater: Object | Function, ...properties: string[]) => $Delegater;
}

interface ValidationParameter {
  target: any;
  message: string;
}
const validateArgument = ({ target, message }: ValidationParameter) => {
  const acceptable = target && (typeof target === 'object' || typeof target === 'function');

  if (!acceptable) {
    throw new TypeError(`[delegate-js] ${message}`);
  }
}


const delegating = function(destructive: boolean, delegated: Object, ...properties: string[]) {
  validateArgument({
    target: delegated,
    message: `delegated object must not be undefined or null, but actualy ${delegated}`
  });

  properties.forEach(property => {
    const targetProp = (<any>delegated)[property];
    if (targetProp === undefined) {
      return;
    }

    Object.defineProperty(this, property, {
      get: () => (<any>delegated)[property],
      configurable: false
    });
  });
  return destructive ? $delegate(this) : delegate(this);
};


export const delegate = <T extends Object>(self: T): Delegater<T> => {
  validateArgument({
    target: self,
    message: `${JSON.stringify(self)} is not acceptable. accept only object.`
  });
  return {
    to: delegating.bind(Object.create(self), false),
    self
  };
};

export const $delegate = (self: Object): $Delegater => {
  validateArgument({
    target: self,
    message: `${JSON.stringify(self)} is not acceptable. accept only object.`
  });
  return {
    to: delegating.bind(self, true)
  };
}
