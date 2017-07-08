export interface Base {
  prop: number;
  method: Function;
}
export interface Delegated {
  prop2: string;
  method2: Function;
}
export type Result = Base & Delegated;

export const createBase: () => Base = () => {
  return {
    prop: 1,
    method: () => {
      return 2;
    }
  };
};
export const createDelegated: () => Delegated = () => {
  return {
    prop2: 'prop2',
    method2: () => {
      return 'method2';
    }
  };
};
