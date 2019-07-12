namespace CryptInterface {
    export interface Keys {
      [key: number]: string;
    }

    export interface KeysReverse {
      [key: string]: number;
    }

    export interface Chr {
      [key: number]: string;
    }

    export interface Ord {
      [key: string]: number;
    }

    export type Block = Array<any>

    export interface ReduceData {
      index: number;
      data: Block;
      allData: Array<Block>;
    }
}

export default CryptInterface