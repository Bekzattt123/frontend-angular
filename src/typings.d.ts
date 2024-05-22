// src/typings.d.ts
declare interface PromiseWithResolvers<T> extends Promise<T> {
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}
