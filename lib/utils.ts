import 'reflect-metadata';

export const delay = (ms: number): Promise<unknown> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function findBy(selector: string): Function {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get() {
          const promise = (this).browser.findElement(selector);
          return new type(promise, selector);
        },
    });
  };
}

export enum Browsers {
  Chrome="chrome",
  Edge="edge",
  Firefox="firefox"
}