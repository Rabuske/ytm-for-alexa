type AnyFunction<A = any> = (...input: any[]) => A;
export type GConstructor<T> = new (...args: any[]) => T;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;
export {};
