import gameSetting from "../../../src/game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    odds: {
        regular: 2,
        banBan: 3,
        banLuck: 2,
        fiveCardTrick: 3,
    },
    botenabled: true,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
};

const userRoundsData = (uid) => {
    return [
        {
            result: [
                {
                    rank: "9",
                    suit: 2,
                },
                {
                    rank: "4",
                    suit: 1,
                },
                {
                    rank: "8",
                    suit: 0,
                },
            ],
            ended: true,
            id: 1,
            uid: uid,
            name: "NormalUser",
            odds: {
                regular: 2,
                fiveCardTrick: 3,
                banBan: 3,
                banLuck: 2,
            },
            exchangeRateId: 1,
            __v: 0,
            settlementResult: 21,
        },
        {
            result: [
                {
                    rank: "7",
                    suit: 2,
                },
                {
                    rank: "A",
                    suit: 2,
                },
            ],
            ended: false,
            id: 2,
            uid: uid,
            name: "NormalUser",
            odds: {
                regular: 2,
                fiveCardTrick: 3,
                banBan: 3,
                banLuck: 2,
            },
            exchangeRateId: 1,
            __v: 0,
            settlementResult: 18,
        },
    ];
};

const userBetData = (uid) => {
    return [
        {
            id: 48,
            pos: 1,
            actions: ["stand"],
            cards: [
                {
                    rank: "A",
                    suit: 2,
                },
                {
                    rank: "7",
                    suit: 0,
                },
            ],
            total: 18,
            softPoints: [],
            bet: 1,
            betwin: 0,
            freeBet: false,
            roundId: 1,
            paid: true,
            uid: uid,
            name: "NormalUser",
            siteId: "111",
            currency: "$US",
            playerId: 1,
            operatorId: "dummy-operator-id",
            rate: 1,
        },
        {
            id: 47,
            pos: 2,
            actions: [],
            cards: [
                {
                    rank: "Q",
                    suit: 2,
                },
                {
                    rank: "5",
                    suit: 0,
                },
            ],
            total: 15,
            softPoints: [],
            bet: 1,
            betwin: 0,
            freeBet: false,
            roundId: 2,
            paid: false,
            uid: uid,
            name: "NormalUser",
            siteId: "111",
            currency: "$US",
            playerId: 1,
            operatorId: "dummy-operator-id",
            rate: 1,
        },
    ];
};

const userBetLogData = (uid) => {
    return [];
};

const promotions = [];

const resultsData = [
    {
        roundId: 2,
        clientSeed: 22,
        encryptedServerSeed: {
            iv: "1f6214b884e18c577759e97f711fe7a6",
            content:
                "910346ee1e338c81c5d30ef5c44fa66e5811804cf0927f63790236aa545fb4fedbac426644f8c5cb384d15f6b89fb448e98e0d9b305989e9842e33831dd5f0671565e4ac2aab02ae79f46e9e53d7b85238cc3a9f3e956b7b1c4eb821005e663fe3b5bd95198ad53a737b0b7f73128a33c23612c65f965c7ef86b1c360d91b0fbd722b4fcbcddd5f98d4b82c4a399ab43cc495ae29978146364aacfd64aa6f6006e2ceb3fbc57d3fd2c13ebc45d14d48a62ba5899f165e4dc19cb6e0ba91a07010c1abff802064f30c6e43eed9b86b60208f4e6306831aabf52c258601c24e0bd4c7225127b838aa4b58869dc32674531b0dba51834d8c380b815a20f2c85a67389a42ca5af82852bb0523f37e86a302f3d5d5d0ec3ece1bfbff8b6bbab594ecbad5f4a75bc3408a9c8691266b91257e3198090eed0a5d1479fc3838ab97f36b1eec46e9cef8c81ae12f2d4745e2cc57b7237ed82000233d5e74253c242f6884af02512fd2b42cbeeef104b8d5b881f83d600fbfc2102fbec4a157a59c3fb30a403e120d6ae00b2dc91b037a3ccec629915ac1b974a358ee61327b3d899a06ecc4294b340dec6221130c97bab03d8bb8425fbb3a8bd59ab35baee4a8dc1bab13c348f15ab0feb5a523f51fe811882cf4800a8ae1b1e5302924dbed9f0351a5712b0ade11d72c93d4a43fb24392e4b29f743491010e81fa07e57c4a3f7d545f9b30a5168aa9f5262de9b8e377473e91f270ba4e25605e30a4dea146ff15ca94b9d9ff9e74ffa09a5ad4583c580aee42fd2b6dcbd282041f8d795cd0a",
        },
        hash: "ce8cdba8e3162532d2474fcd82971a8f83cb56b11371d030c9c1a92fca3b2c04",
        encryptedFinalResult: {
            iv: "51a76a00ddfb9042f1a7bddf880d4e71",
            content:
                "f262545490ec1ed8b65f9a56d34237af8415bde3726febdcbd50bc753ffb10de96f59ba0b71e4efcf30642e2373576adb3797987e7964720e407894096d447734b5d6cab38e36feea6530e2fb13a5bd646b491fce44143b6de31e6c52d2a91ba5fcaf4904f04ce909b9e6ea357f62a3a5cd8516003c584242f7a0050d6d016acf6d98517afddbcca6954ed659c68ed55a364fa085bfaacb00b9fbf7557daa41c18e9fa21f695a20643fe5acf3bb0dd83343498ffb03753f31a30e4a9d85b6973420220a94be70fc11508424444de23ad82aa565caabffbdcfd498a6deff0178720e95ccd94f422c27b705db48146cc66b8964b6a3296913235cd21613611100f0e2f55d2c9be59671212b879c092a30e80ceda218e0ac470847aef0b93c94b721f5ebdf39ca430df32fb73840da5d16f6dff1477459fca8fe61fd62c1e994ee3134da242a17999bf9fa4d4f2d952cfb1f45a393ccd793f8a041ed42972ed7480f7ed3b06e8846b2a3813f0ff695a75bcba456e0a0b218238302c9adfca1d3f6cfc2abce413b4c1dbf53812b525e110a4109ec13e2bcf4735c87cf23c8cd55aa6ed65bbfa52b34118c8b738343cf2a0b8bc5fb25169e7a35c38eb69c794ec7e1c98e9a2a0e73761811e6c0688e6621ae0aa585c19db437d26d614eebbfc9dbe6a7df9c01b95c5118bfefe3cdd0b88310f1dbe05f8869f61550865953e5442477d7e32efca2a38bda9c67780da4fb6c1699e706611a4e9f73e2438d233f7eb927d2dbfbb9c04eb02d2a3cf24dd92b2f7329666393b7e61d1e2c96a5c018f30dda484ebd2f6e35d77a0d8265f7e659fe9d02eb946f181058dd6cdab642ea601cddbda861aa1ac6c055e9dc4759777a2b8b3ed772ac3abdd1a0164646d2ed7e633e4718635be0a192cac6ab064f6a6ab256472914bdb54b65c7200b142144c63fbd062a1f18353f8b16c6365507263e8ae0c87563a0c3f558fb01968c571c192169584cb136d14e47fd652934fa1e4f498758f604449216d8b9564a53eb45dba731cc93fb6a47d4a158ece56936d26a3cf51b2ba23f969b9c87dcc7fc6d1246d9e4c97fa343e132deaa090151e2501fc0811d69ef584e94969cf1afec46dee40eceaf708052de7b5518f5192086181f417b046ae262673e14b68526b7f792c7c7feceedf9d6c28adba7448fdac4b25feba20cf21a1a64c00279eacf669f4c557372200dfcae64c9973ad18547cbbf64d244c3d098a4e814e25b4ba22b7deab8b6c7f96f824539bf613c4a5755e6e6f28c957ffe5814f7a79061db1a569e178debd116f0cab96981a043befc7f3c5140e51cd45a991bec73d573e33aa077f5c11f2b3112c7fc78cb8174994f3c72f8eab8fa468f61da47d29bdb938dd7344b53f8befbfdaecec5f2abcd832fd248b6799ba7f8912d13374aa39828585370610a4fb66048b438a2a00eb4b1b418b61ba1919e20b476a97ea895a6cff18a9ba14ce2268824777f343346be9631eacdbca8768c156deaee06789fc5b459a9c40cdb6d27964f156ac99f94a1213cb3905dbd2be08e8d8729fd3c3d7918dea51c1270e263279254391d969fefdf6d7f1ca6d0ee252c86eded6e283f87fbd4f2b3986c12351f8c0a4d2fc0f9a641090e0a53bbf5eba8d3814dec3de0269ecb59bed24d1fb8b20c013177c4bc2f21d1d626681aed8e14015a93ff7de37814ccda7ceb3df0bc31324f88e4ab518162a0c251950f15edd012341dfbf939b22791580d77ca38bb69260ef040b56f352823554e9958063bb5c1aeadb96e1e661ed86131a0280b4fd2d1409762168977cad3aa51b69574332ad1b343225e15c5dca6142dead98369d898c1393fb7fccd7907da8977fe2ebb57471343cf9823b9be6afa8ee39684b8611513918889cc099d217bd6d760b2aceed5b5baf04e2ef3da0160eb41945b520a628732e0b03bd7bdbe587f35aa65cfc0e34f3d065f06db07b50a4133988345cf8301da3a1843e3df73d46fb7e634616166e413ffc4041f5799f6883dd02975b06808184f97799e7a32e237c7522b42c2048c68a55b86e7d6f3c9462b5af1726cdf91baabe3587849a8ef3b887f25b6080186609b48d951f25ae5f9c5484f0adcf9ef31be807d0b4e56e69f28264eed73f8f4d73304373bfa5e4c589cb4a488baf69962b605b7666cc1d337daafa06b31402d622c4b5a34d2e6b3eaba89e29ef1330075a5310ddf3cf104bffc2f88dc3b12f6a5a9e16a89018bcc8a1e02a0d3a8aa2c62fcd56d17a74cddd447d771a001699a01aa67b4a7836dfd4a7f9fafaaebd2938db12f236f1712806a515e32e178defbaea689ff643867bce2ad6ff0d919de069b55fbbcda1011f92d400f2ecee571fd0d7c2422db7aa35eeadfc3d8bb30209676efcc3d5bbb493a080a31b6e48efb9a4272b1f4d16787a33c1b01d39f07e512a1f6bdcb44050b83aadd57597b8a1a21a3cd6a9fa9b7859776da72347aafde48926b807efad05dc9dd4bd45d79d54e2ac957ced9bbef7fe94f1a6b6dd8ff4f732d451e05f9e31a0cb5a0017db659d64bbfaf61e9dec2d0ef095a8d5e6b302a8340bf52b95433c0e25c6f17a8cd364a3eee304abec7477d5809a6196ee78031ce65e3861db0863400ee77e1238bf3607fc8d11f70edc32ff019a03ec0e3641fa85ce5efd38007d526cbe7cb08dfd1bc07ca58d431b8884b3f10db6d6a73be58832562f83e423e36cf0442888c307618c4279fdd5edb58eb47f8b16bcad40b82b39bcb13f12e41841c8520e01578a7e366bbb444d6118a591c6b0288349d478d0593dce61bf8e671f5934a1aa9b19eee26ffa5a5864190da842fc1ecee90f30d7629488185eb38e1519231cd2b25de5961eec5ba7b6898b1a5a8f882432ffa973a76572bc6d156efbe7f7715d27cf5b2aba1d8f0b3f6c9c7f8551389e054319b11d49d24373f8fa9f90b8704c790d819c8a1d3b6c85b6c844594924cf06055e2559419252d24b349faaa35bbd757e727c57b700e787b336eb4348b5650a435cc4932abd247f6f31bfd06ec8769e810788d309ff42cb99f49e1b98edf88c93315d7b5085dfb627f482d5df282740d482c6e5ec7a037dca4783e857a4d9af39",
        },
    },
];

export { game, currencyData, socketOptionsFunc, gameConfig, userRoundsData, userBetData, promotions, userBetLogData, resultsData };
