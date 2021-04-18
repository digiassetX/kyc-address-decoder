require('nodeunit');
const KycAddressDecoder = require('../index'),
    events = require('events');
module.exports = {
    'fake kyc': function(test) {
        const data={
            "height": 12562265,
            "vin": [
                {
                    txid:   "9255c37ee7b424ddbe4ef0eb8444aaa024f2fbe954cf70b0f61848b2b22f9e61",
                    vout:   0,
                    scriptPubKey: {
                        addresses: ["DMCZRq2ZjKjXE8MZdPcxouxijWQfr7sMRJ"]
                    }
                }
            ],
            "vout": [
                {
                    "value": "600",
                    "scriptPubKey": {
                        "addresses": [
                            "DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY"
                        ]
                    },
                    "vout": 0
                },
                {
                    "value": "0",
                    "scriptPubKey": {
                        "hex": "6a1f825c4ca71a4d415454484557204b454e4e45544820434f524e454c49535345",
                        "type": "nulldata"
                    },
                    "vout": 1
                },
                {
                    "value": "8758349858",
                    "scriptPubKey": {
                        "addresses": [
                            "dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"
                        ]
                    },
                    "vout": 2
                }
            ]
        };


        const result=KycAddressDecoder(data);
        test.equal(result,false);
        test.done();
    },
    'first kyc': function(test) {
        const data={"txid":"4fc6d848786960738a906f05e05f8ef6f2bb7f11702034ac96287c6f8e47d009","hash":"f30c25729f3d10f660d774eb4dfa6f209960eaadfb7f69681fd197861bd35d08","version":1,"size":415,"vsize":333,"weight":1330,"locktime":0,"vin":[{"txid":"9255c37ee7b424ddbe4ef0eb8444aaa024f2fbe954cf70b0f61848b2b22f9e61","vout":0,"scriptSig":{"asm":"3044022036b5a585d400ff574af2af0a62d276dd339173004a5f35c58d2816b2ac6f712d02205b4553befd7bcc5f642561538022e97e2aab05cb0099597f8663dc9b850c8662[ALL] 035f5ebdb7d3c2b71cfe5b8898c14d37e6fd3fddd3768704407f27c4827fc6f1ad","hex":"473044022036b5a585d400ff574af2af0a62d276dd339173004a5f35c58d2816b2ac6f712d02205b4553befd7bcc5f642561538022e97e2aab05cb0099597f8663dc9b850c86620121035f5ebdb7d3c2b71cfe5b8898c14d37e6fd3fddd3768704407f27c4827fc6f1ad"},"sequence":4294967295,"source":12562569,"value":8813097418n,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 11b1b75b6cd52d2cd6f7b3450633614faccada1c OP_EQUALVERIFY OP_CHECKSIG","hex":"76a91411b1b75b6cd52d2cd6f7b3450633614faccada1c88ac","reqSigs":1,"type":"pubkeyhash","addresses":["D6kevTehzh8e2r9yZ4fDJYaJjhTA2aDXHi"]}},{"txid":"02532c42f6aa4f64b7969c2ebed117cd2e367d620f8c4d20b072e11b16d98e6c","vout":2,"scriptSig":{"asm":"","hex":""},"txinwitness":["304402201004755c45c88c958a8b99a1076c8142ae5f92252ca146782be5912cd240a30e022051739b723cf8ef53781a6bb72fb4d740e7997666d9cc2d60ea149c401ff4790901","0248cce9c5ad00e5c18eb3138495327b333ded7c3364b35d02272c569e78bb56a4"],"sequence":4294967295,"source":12562265,"value":8758349858n,"scriptPubKey":{"asm":"0 dc5db823be5eddf34c379732aa68a27d1b891f86","hex":"0014dc5db823be5eddf34c379732aa68a27d1b891f86","reqSigs":1,"type":"witness_v0_keyhash","addresses":["dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"]}}],"vout":[{"value":600n,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 eaa5333e82962b3ea4a4296b0cd386e38fa99e21 OP_EQUALVERIFY OP_CHECKSIG","hex":"76a914eaa5333e82962b3ea4a4296b0cd386e38fa99e2188ac","reqSigs":1,"type":"pubkeyhash","addresses":["DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY"]},"vout":0},{"value":0n,"scriptPubKey":{"asm":"OP_RETURN 825c4ca71a4d415454484557204b454e4e45544820434f524e454c49535345","hex":"6a1f825c4ca71a4d415454484557204b454e4e45544820434f524e454c49535345","type":"nulldata"},"vout":1},{"value":17571446008n,"scriptPubKey":{"asm":"0 dc5db823be5eddf34c379732aa68a27d1b891f86","hex":"0014dc5db823be5eddf34c379732aa68a27d1b891f86","reqSigs":1,"type":"witness_v0_keyhash","addresses":["dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"]},"vout":2}],"hex":"01000000000102619e2fb2b24818f6b070cf54e9fbf224a0aa4484ebf04ebedd24b4e77ec35592000000006a473044022036b5a585d400ff574af2af0a62d276dd339173004a5f35c58d2816b2ac6f712d02205b4553befd7bcc5f642561538022e97e2aab05cb0099597f8663dc9b850c86620121035f5ebdb7d3c2b71cfe5b8898c14d37e6fd3fddd3768704407f27c4827fc6f1adffffffff6c8ed9161be172b0204d8c0f627d362ecd17d1be2e9c96b7644faaf6422c53020200000000ffffffff0358020000000000001976a914eaa5333e82962b3ea4a4296b0cd386e38fa99e2188ac0000000000000000216a1f825c4ca71a4d415454484557204b454e4e45544820434f524e454c49535345f8fc561704000000160014dc5db823be5eddf34c379732aa68a27d1b891f86000247304402201004755c45c88c958a8b99a1076c8142ae5f92252ca146782be5912cd240a30e022051739b723cf8ef53781a6bb72fb4d740e7997666d9cc2d60ea149c401ff4790901210248cce9c5ad00e5c18eb3138495327b333ded7c3364b35d02272c569e78bb56a400000000","blockhash":"589b6a1c0ecbe81bba71066e75cca3e4e4ecc00f27ffa97630fdbc1044043bbd","height":12562681,"time":1615348932};


        const result=KycAddressDecoder(data);
        test.equal(result.type,"KycPublic");
        test.equal(result.address,'DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY');
        test.equal(result.country,'CAN');
        test.equal(result.name,'MATTHEW KENNETH CORNELISSE');
        test.done();
    },
    'secret kyc': function(test) {
        const data={
            "height": 12562265,
            "vin": [
                {
                    txid:   "9255c37ee7b424ddbe4ef0eb8444aaa024f2fbe954cf70b0f61848b2b22f9e61",
                    vout:   0,
                    scriptPubKey: {
                        addresses: ["DMCZRq2ZjKjXE8MZdPcxouxijWQfr7sMRJ"]
                    }
                },
                {
                    txid:   "02532c42f6aa4f64b7969c2ebed117cd2e367d620f8c4d20b072e11b16d98e6c",
                    vout:   2,
                    scriptPubKey: {
                        addresses: ["dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"]
                    }
                }
            ],
            "vout": [
                {
                    "value": "600",
                    "scriptPubKey": {
                        "addresses": [
                            "DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY"
                        ]
                    },
                    "vout": 0
                },
                {
                    "value": "0",
                    "scriptPubKey": {
                        "hex": "6a25825c4ca700767200669ed14359cab2546a3b7f4a72564e593095d4149ff4d9e51308e719b2",
                        "type": "nulldata"
                    },
                    "vout": 1
                },
                {
                    "value": "8758349858",
                    "scriptPubKey": {
                        "addresses": [
                            "dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"
                        ]
                    },
                    "vout": 2
                }
            ]
        };


        const result=KycAddressDecoder(data);
        test.equal(result.type,"KycSecret");
        test.equal(result.address,'DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY');
        test.equal(result.country,'CAN');
        test.equal(result.hash.length,32);
        test.done();
    },
    'revoke': function(test) {
        const data={
            "height": 12562265,
            "vin": [
                {
                    txid:   "9255c37ee7b424ddbe4ef0eb8444aaa024f2fbe954cf70b0f61848b2b22f9e61",
                    vout:   0,
                    scriptPubKey: {
                        addresses: ["DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY"]
                    }
                }
            ],
            "vout": [
                {
                    "value": "601",
                    "scriptPubKey": {
                        "addresses": [
                            "dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"
                        ]
                    },
                    "vout": 0
                },
                {
                    "value": "0",
                    "scriptPubKey": {
                        "hex": "6a02825c",
                        "type": "nulldata"
                    },
                    "vout": 1
                },
                {
                    "value": "8758349858",
                    "scriptPubKey": {
                        "addresses": [
                            "dgb1qm3wmsga7tmwlxnphjue2569z05dcj8uxjx69p6"
                        ]
                    },
                    "vout": 2
                }
            ]
        };


        const result=KycAddressDecoder(data);
        test.equal(result.type,"KycRevoke");
        test.equal(result.address,'DSXnZTQABeBrJEU5b2vpnysoGiiZwjKKDY');
        test.equal(result.height,12562265);
        test.done();
    }

};

