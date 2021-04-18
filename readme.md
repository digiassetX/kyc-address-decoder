# KYC Address Decoder



## Installation
``` bash
npm install kyc-address-decoder
```

## How to find in chain
KYC verification txs can be found in a few ways.
1) Output 2 and the last input always point to one of the verification addresses that was valid at that block height
2) OP_return data on output 1 always starts with the hex word: 825c

## Usage
To decode a tx you think may be a KYC verification use the following code:

