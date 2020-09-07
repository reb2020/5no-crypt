export namespace CryptInterface {
  interface Keys {
    [key: number]: string;
  }

  interface KeysReverse {
    [key: string]: number;
  }

  interface Chr {
    [key: number]: string;
  }

  interface Ord {
    [key: string]: number;
  }

  type Block = Array<any>

  interface ReduceData {
    index: number;
    data: Block;
    allData: Array<Block>;
  }

  interface Crypt {
    decrypt(): string;
    encrypt(): string;
  }
}
