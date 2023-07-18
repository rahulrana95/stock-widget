function debounce<T extends any[]>(
  inner: (...args: T) => any,
  ms: number = 0
): (...args: T) => Promise<any> {
  let timer: NodeJS.Timeout | null = null;
  let resolves: ((value: any) => void) | null = null;

  return function debounced(...args: T): Promise<any> {
    clearTimeout(timer!);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        const result = inner(...args);
        resolves && resolves(result);
        resolves = null;
      }, ms);
      resolves = resolve;
    });
  };
}

function fixKeys(obj: Object) {}

export { debounce };
