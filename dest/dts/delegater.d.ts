export interface Delegater<T> {
    to: (delegater: Object | Function, ...properties: string[]) => Delegater<T>;
    self: T;
}
export interface $Delegater {
    to: (delegater: Object | Function, ...properties: string[]) => $Delegater;
}
export declare const delegate: <T extends Object>(self: T) => Delegater<T>;
export declare const $delegate: (self: Object) => $Delegater;
