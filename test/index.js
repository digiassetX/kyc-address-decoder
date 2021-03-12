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

