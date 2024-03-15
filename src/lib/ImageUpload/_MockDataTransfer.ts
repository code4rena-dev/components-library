
/**
 * Mock implementation for DataTransfer suggested by the following GitHub Comment:
 * {@link https://github.com/jsdom/jsdom/issues/1272#issuecomment-1433806654}
 */
class DataTransfer {
  items: object;
  files: object;

  constructor() {
    const foo = document.createElement('input');
    foo.type = 'file';

    /**
     * You can't construct a FileList, so we have to steal one.
     */
    const fileList = foo.files as FileList;
    const arr: File[] = [];

    /**
     * Bolt on DataTransferItemList things so we can manipulate and reuse it.
     */
    const fileListProxy = new Proxy(fileList, {
      get(target, prop, receiver) {
        if (prop === 'add') {
          return (x: File) => {
            arr.push(x);
          };
        } else if (prop === 'length') {
          return arr.length;
        } else if (typeof prop === "number" && arr[prop]) {
          return arr[prop];
        }

        // @ts-ignore
        return Reflect.get(...arguments);
      },
    });

    this.items = fileListProxy;
    this.files = fileListProxy;
  }
}


export default DataTransfer;