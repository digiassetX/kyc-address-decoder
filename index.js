const BitIO=require('bit-io');
const crypto=require('crypto');

require('./types');             //get streaming service types

/**
 * @typedef {{
 *     address: string,
 *     start:   int
 *     end:     int?
 * }}   Validator
 */

/**
 * type can be secret if name and pin where provided
 * @typedef {{
 *     type:    "KycPublic"|"KycSecret",
 *     address: string,
 *     country: string,
 *     name:    string
 * }}   KycPublic
 */

/**
 * @typedef {{
 *     type:    "KycSecret",
 *     address: string,
 *     country: string,
 *     hash:    Buffer
 * }}   KycSecret
 */

/**
 * @typedef {{
 *     type:    "KycRevoke",
 *     address: string,
 *     height:  int
 * }}   KycRevoke
 */


/** @type {Validator[]} */const kycValidators=[{
    address: "dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6",
    start:   12562265
}];
const infinity=1073741824;


/**
 * Determines if 2 buffers are identical
 * @param {Buffer}  a
 * @param {Buffer}  b
 * @return {boolean}
 */
const compareBuffer=(a,b)=>{
    if (a.length!==b.length) return false;
    for (let i in a) {
        if (isNaN(i)) continue;
        // noinspection JSUnfilteredForInLoop
        if (a[i]!==b[i]) return false;
    }
    return true;
}



/**
 * Sees if tx is a kyc cert.
 * If txData represents public kyc returns KycPublic type
 * if txData represents secret kyc and name and pin are provided returns KycPublic if correct, if not correct Kyc secret
 * If not valid cert returns false
 * @param {TxData}  txData
 * @param {string?} name
 * @param {string?} pin
 * @return {KycPublic|KycSecret|boolean}
 */
const kycCert=(txData,name,pin)=>{
    //quick checks to make sure valid format
    if (
        (txData.vout.length!==3) ||                                                 //wrong number of outputs
        (txData.vout[0].value!=="600") ||                                           //output 0 should be 600 sat
        (txData.vout[1].value!=="0") ||                                             //output 1 should be 0 sat
        (txData.vout[0].scriptPubKey.addresses.length!==1) ||                       //output 0 has only 1 address
        (txData.vout[2].scriptPubKey.addresses.length!==1)                          //output 2 has only 1 address
    ) return false;

    //find validator
    let lastInput=txData.vin.length-1;                                              //get index of last input
    if (txData.vin[lastInput].scriptPubKey.addresses.length!==1) return false;      //make sure last input has only 1 output
    let found=false;
    for (let {address,start,end=infinity} of kycValidators) {                       //go through each validator
        if (address!==txData.vin[lastInput].scriptPubKey.addresses[0]) continue;    //check if validators address
        found=((txData.height>=start)&&(txData.height<=end));                       //check if within the correct range
        break;                                                                      //no need to check more validators since address can only be in lst once
    }
    if (!found) return false;

    //get address that was validated
    let address=txData.vout[0].scriptPubKey.addresses[0];

    //get encoded data
    try {
        let bitStreamA = new BitIO();                                               //create bitstream
        bitStreamA.appendHex(txData.vout[1].scriptPubKey.hex);                      //add data that was on output 1
        if (bitStreamA.getBitcoin() !== "OP_RETURN") return false;                  //make sure first opcode is OP_RETURN
        let opReturnData = bitStreamA.getBitcoin();                                 //get data in op_return
        if (!Buffer.isBuffer(opReturnData)) return false;                           //if anything other then a buffer its invalid
        let bitStreamB = BitIO.fromBuffer(opReturnData);                            //create new bitstream from hex data encoded in stream
        if (bitStreamB.get3B40(3) !== "kyc") return false;                          //make sure beginning of data is "kyc" in 3B40 encoding
        let country = bitStreamB.get3B40(3).toUpperCase();                          //get country code ISO Alpha-3
        let length = bitStreamB.getFixedPrecision();                                //get length of data(or 0 for secret)
        if (length === 0n) {
            //secret
            let hash = bitStreamB.getBuffer(32);                                    //get the next 32 bytes of data which is the hash
            if ((name !== undefined) && (pin !== undefined)) {                      //check if name and pin where provided
                let testHash = crypto.createHash('sha256').update(address + "|" + pin + "|" + name).digest(); //compute the hash if given name and pin are correct
                if (compareBuffer(hash, testHash)) {
                    return {
                        type:   "KycSecret",
                        address,
                        country,
                        name
                    };
                }
            }
            return {
                type:   "KycSecret",
                address,
                country,
                hash
            };
        } else {
            //public
            return {
                type:   "KycPublic",
                address,
                country,
                name:   bitStreamB.getUTF8(parseInt(length.toString()))
            };
        }
    } catch (e) {
        return false;
    }
}



/**
 * In case of accidental leak of keys can mark an address as no longer KYC valid after this point by
 * sending 601 sat to one of the kyc validator addresses as output 0 and OP_RETURN kyc as output 1
 * @param {TxData}  txData
 * @return {KycRevoke|boolean}
 */
const kycRevoke=(txData)=>{
    //quick checks to make sure valid format
    if (
        (txData.vout.length<2) ||                                                   //wrong number of outputs
        (txData.vin.length!==1) ||                                                  //wrong number of inputs
        (txData.vin[0].scriptPubKey.addresses.length!==1) ||                        //input 0 has only 1 address
        (txData.vout[0].value!=="601") ||                                           //output 0 should be 601 sat
        (txData.vout[1].value!=="0") ||                                             //output 1 should be 0 sat
        (txData.vout[0].scriptPubKey.addresses.length!==1)                          //output 0 has only 1 address
    ) return false;

    //get encoded data
    try {
        let bitStreamA = new BitIO();                                               //create bitstream
        bitStreamA.appendHex(txData.vout[1].scriptPubKey.hex);                      //add data that was on output 1
        if (bitStreamA.getBitcoin() !== "OP_RETURN") return false;                  //make sure first opcode is OP_RETURN
        let opReturnData = bitStreamA.getBitcoin();                                 //get data in op_return
        if (!Buffer.isBuffer(opReturnData)) return false;                           //if anything other then a buffer its invalid
        let bitStreamB = BitIO.fromBuffer(opReturnData);                            //create new bitstream from hex data encoded in stream
        if (bitStreamB.get3B40(3) !== "kyc") return false;                          //make sure beginning of data is "kyc" in 3B40 encoding
    } catch (e) {
        return false;
    }

    //get address that was revoked
    let revokeAddress=txData.vin[0].scriptPubKey.addresses[0];

    //find validator
    for (let {address} of kycValidators) {                                          //go through each validator
        if (address!==txData.vout[0].scriptPubKey.addresses[0]) continue;           //check if validators address
        return {
            type:   "KycRevoke",
            address:revokeAddress,
            height: txData.height
        };
    }
    return false;
}





/**
 * Decodes a transaction
 * @param {TxData}  txData
 * @param {string?} name
 * @param {string?} pin
 * @return {KycPublic|KycSecret|KycRevoke,boolean}
 */
module.exports=(txData,name=undefined,pin=undefined)=>{
    //check if kyc cert
    let results=kycCert(txData,name,pin);
    if (results!==false) return results;

    //check if kyc revoke
    return kycRevoke(txData);
}