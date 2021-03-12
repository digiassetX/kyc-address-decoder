/**
 * @typedef {{
 *     height:      int,
 *     hash:        string,
 *     last:        int
 * }} State
 */


/**
 * @typedef {{
 *     Bucket:      string,
 *     Key:         string
 * }} BucketParam
 */



/**
 * @typedef {{
 *     asm:         string,
 *     hex:         string,
 *     reqSigs:     int,
 *     type:        string,
 *     addresses:   string[]
 * }} ScriptPubKey
 */

/**
 * @typedef {{
 *     assetId:     string,
 *     amount:      string|bigint,
 *     decimals:    int             //TODO double check
 * }} AssetCount
 */

/**
 * @typedef {{
 *     sequence:    int,
 *     value:       string|bigint,
 *
 *     coinbase:    string?,
 *
 *     txid:        string,
 *     vout:        int,
 *     source:      int,
 *     scriptSig:   {asm:string,hex:string},
 *     scriptPubKey:ScriptPubKey?,
 *     assets:      AssetCount[]?
 * }} Vin
 */

/**
 * @typedef {{
 *     value:       string|bigint,
 *     vout:        int,
 *     spent:       int?,
 *     scriptPubKey:ScriptPubKey,
 *     assets:      AssetCount[]?
 * }} Vout
 */


/**
 * @typedef {{
 *     txid:        string,
 *     vout:        int,
 *     value:       string|bigint,
 *     scriptPubKey:ScriptPubKey,
 *     assets:      AssetCount[]?
 * }} UTXO
 */

/**
 * change & balance are BigInt but saved as string
 * @typedef {{
 *     assetId:     string?,
 *     time:        int,
 *     height:      int,
 *     txid:        string,
 *     change:      string|bigint,
 *     balance:     string|bigint
 * }} AddressTxRecord
 */

/**
 * @typedef {{
 *     time:        int,
 *     height:      int,
 *     txid:        string,
 *     type:        string,
 *     input:       Object<string|bigint>,
 *     output:      Object<string|bigint>
 * }} AssetTxRecord
 */

/**
 * @typedef {{
 *     min:         string|bigint,
 *     max:         string|bigint,
 *     sum:         string|bigint,
 *     count:       int
 * }} DepositWithdraw
 */




/*
███████╗██╗██╗     ███████╗███████╗
██╔════╝██║██║     ██╔════╝██╔════╝
█████╗  ██║██║     █████╗  ███████╗
██╔══╝  ██║██║     ██╔══╝  ╚════██║
██║     ██║███████╗███████╗███████║
╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
 */

/**
 * key=address
 * @typedef {{
 *     address:     string,
 *     index:       int,
 *     group:       int,
 *     firstUsed:   int,
 *     lastUsed:    int,
 *     txs:         AddressTxRecord[],
 *     deposit:     DepositWithdraw,
 *     withdraw:    DepositWithdraw?,
 *     assets:      Object<string|bigint>
 * }} AddressData
 */

/** TODO
 * key={Address}_utxo
 * @typedef {{
 *     txid:        string,
 *     vout:        int,
 *     value:       string|bigint,
 *     hex:         string,
 *     assets:      [AssetCount]
 * }[]} AddressUtxoData
 */

/**
 * key=height or hash
 * @typedef {{
 *      hash:           string,
 *      strippedsize:   int,
 *      size:           int,
 *      weight:         int,
 *      height:         int,
 *      version:        int,
 *      pow_algo_id:    int,
 *      time:           int,
 *      mediantime:     int,
 *      difficulty:     Number,
 *      nTx:            int,
 *      previousblockhash: string,
 *      nextblockhash:  string?,
 *      tx:             TxData[]
 * }} DigiByteBlockData
 * */


/**
 * key=txid
 * @typedef {{
 *     txid:       string,
 *     vin:        Vin[],
 *     vout:       Vout[],
 *     blockhash:  string,
 *     height:     int,
 *     time:       int
 * }} TxData
 */

/**
 * key=assetId
 * @typedef {{
 *     assetId:     string,
 *     issuer:      string,
 *     locked:      boolean,
 *     aggregation: int,
 *     divisibility:int,
 *     holders:     Object<string|bigint>,
 *     supply:  {
 *         initial: string|bigint,
 *         current: string|bigint
 *     }
 *     metadata:    {
 *         txid:    string,
 *         cid:     string
 *     }[],
 *     txs:         AssetTxRecord[],
 *     firstUsed:   int,
 *     lastUsed:    int
 * }} AssetData
 */


/**
 * key='index_block_'+floor(height/1000)+'000'
 * @typedef {
 *     {
 *         height:      int,
 *         txs:         int,
 *         algo:        int,
 *         time:        int,
 *         difficulty:  Number
 *     }[]
 * } BlockIndexData
 */

/**
 * key='index_asset_'+floor(height/1000)+'000'
 * @typedef {
 *     {
 *         assetId:     string,
 *         height:      height,
 *         time:        int,
 *         torrent:     string,
 *         metadataHash:string
 *     }[]
 * } AssetIndexData
 */

/**
 * key='height'
 * Returns the current height synced
 * @typedef {int} HeightData
 */

/**
 * key=helpers.dataKey('coinbase',height)
 * @typedef {{
 *         height:  int,
 *         hash:    string,
 *         data:    string
 *     }[]} CoinbaseOpReturnData
 */

/**
 * key=helpers.dataKey('tx',height)
 * @typedef {{
 *         height:  int,
 *         txid:    string,
 *         vout:    int,
 *         data:    string|boolean|int
 *     }[]} TxOpReturnData
 */

/**
 * @typedef {
 *     ?
 * }
 */
let GroupData;  //TODO