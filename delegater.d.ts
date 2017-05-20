interface Delegater<T> {
  to: (delegater: Object | Function, ...properties: string[]) => Delegater<T>;
  self: T;
}
interface $Delegater {
  to: (delegater: Object | Function, ...properties: string[]) => $Delegater;
}
