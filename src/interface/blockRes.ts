export interface RequestType {
  avatar?: string;
  account?: string;
  time?: string;
  tx: {
    type?: string;
    nonce?: string;
    gasPrice?: string;
    maxPriorityFeePerGas?: string;
    maxFeePerGas?: string;
    gas?: string;
    value?: string;
    input?: string;
    v?: string;
    r?: string;
    s?: string;
    to?: string;
    hash?: string;
  };
}
