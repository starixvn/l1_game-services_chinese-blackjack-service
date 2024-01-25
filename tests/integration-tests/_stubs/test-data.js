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
        clientSeed: 3,
        encryptedServerSeed: {
            iv: "21070b5f1f4a0b8d27a54dfeb7a78f29",
            content:
                "b8f78b248240cb3aeb251194fd9353b0ff127165fc19157a9568469270f216964213658db4a99af4452ff1de50e4357b0411ec1ec5bf21849e8237f22de40c0e0038ed347a754819c781dd799e7d0795ae2a2e119384bab024cadc7bc26378e873fb1614a6b07f87c8e466e2ee3aa0b80542eaa9fd5ffb243f086ca78678c55d95fbe32c5a04ae99b6bd015ae200ae52d2337b247bd8e28a549fbf735f335ceb514a4fb25e053b6cd56ea90ba9b8c50a244522765d76109e186205e928097cc740849425098ccbb0e0831d774f05e8b997d31acb654f258101ce20271071aa640f4d8540c454ff5552f8f4898303bf524bf13c6840f5d476172a2315ce0e13ebacc7799ad99038d0282bea3fcb88396fde6c5168477db903975fce6cc4f3404481ef076ced906dce7af1613a08947aecb340183217d29a96c5ce7f934ca29f818e315c73b9116bacb38c2a30c41dfaf79537a75e6a45b79bbaade336b27d2f85cce3cd6d26582f1b34b9aecb70ddd95359e846ed294bf93d4ec781729d2b46e115d7e86f815638e34e6cc6f19cc70ddda4c8a7e6ae6eac27810bdb03f17c9295f759755f33d141dbcf54b980818f8d66a9aed0ab504d414706571fe05f2bd43955c278c79186c6c8c5b91f689e865e533fd6b2cd1aeb6e47d45e6c290ea0d158a99bd8f5ad8a5aa5078d6fd08e4a320e074bc0da9418b11decf0e7227eeee2103c9cbc442aea2aa40a5e76a4c42e6527d0c4300e187c7049ff123ff96da3de57588e646809a59a371df6212312dea0d548de7b77760b6838ed9b1d",
        },
        hash: "0b646dd45cf2c643ae51cf0e09c1881ec19f168cd29c9ba2668a4818be590aba",
        encryptedFinalResult: {
            iv: "168484f96b80d43c57aadc29cd2c4bfb",
            content:
                "cf6617285053ac3ab5edfe8ed1612fb89bbf74dd59dc127edeb9ebbbb171beb9d35dc6219bd47ab90cb9a1dc063fae1ceeabcc26d09bdfbbda6b75b06ccf772d5b5caba886bb40f120c829ca3c80df56f2605d0db8f7976abc896b4fb00662ff11fb3a0b9c4fa9ae989d35be5c1d20d515e12813da5808a41161e506058e6962ace346939591aa486f25a3100403b4e012faee77ba4006a8dae9f20be87da70d119ab7560b3ac6d7a42e7ba001ae1ebb57eb406797ada995957de9d0fb72ff68521019480ff5f2ee4d636e99ee40bacc484a76bb466feb4108046f8b68e22171a544d266f04302f79cc11f0b7925402fcf2a5e49b50eddbe8215a44f211319cec408e5061ca0d3209a48f5493060e8510932aa188d3725c0e439d58bfcc5bbc191bfa1b43393d816858f2625b85ba79c8890c4fc87735fc1542a3522d33fafb7c5e6e7fd847e95195b5998220686f2936a69f721516e76b48af84d66af8a007fc67f39f6a2b082a94f8da8fc451378795811ba42373565f242fdce86c30ed3a5400889cddc8bf65ed099943c3898736a7bcf7ebe86061c6a8bceb325fec2cb1b668a21fadf6f140790b245d3218652734c8c89e64d3e5809ad5f5c3600c015409da867be682bbd193aaf0beedd06037c73c66742e0d924907b5ee0de446f5c8f27f02cd0a333042807de75d7906cd7c34a4f0156330cb944207852167cd8f10a32bf29080467ad1749111026e569371c903f1e1cc1d4679875a99b3df557a2cc88f99caa5c9bc43a95bdd764a331056fa268673a3cd266c7e4c4ff9b35438f84ab1398e999e04c3dd6f731edaf5e75db700bb8a6bdbc1fb0b82425f1ac7bcc5fdcc1b0fa3e921a77b216a03c025247361aaf1e5d850778c6e226a79ef9bbe11d1d27e1cbbc8e6855000c962e9a3c58fab4dfdf4fe90358580c0b9e084f4191fe8318e198e2f72ee7e5fc60fd3365e46b60ec7a067be3fc9f407a365f3f124db047fb38997fc834f9b6477ca8c5864f79430cbdd028ccbac8fd81340f95ac927b132d2537143a13e84d8b01345f50ec3258f8ed5a3a85c320353be44c9d00f63c27ce33758f32daced08a81f8a167f2291d2c6688005224158de88ea5979a6f229ce39cc4fa019f99f6e02bea656899d24cf4a51e9dfc56c755d1b823a2019e9ece1be9179f32712328ddf26d4071cd83b2e7da087ea8eb08d3212a4822f570084ff40aacf9b8286e88178ac51e7383db1fa21fe03d5e8534e8bbb41263c56fcbcc73ee4a4e7e5f8670cb1a9c4517d9f37b7713272a8877bbcfc3089fb6172ee6b63166ba50fb377a4a90b9920f8cf9fe7da3e92a567d9536525cb455cba5479db1e3aedf7bf6a5a86c790a4b648bedbe70cb184663f96021cf5d7822e8999c7e8b9e47f3758cbe585a54eb9fb4e9c2ae8fa2b625433368c054cc4e8752def2216c94aa18687816cbf9b5c742cb65e1ff693d2b8d030bdaa88fcb6b82afbac96ef16e595ec18b0b85db3ba8147a942b8708775c1431ef4ac255258d95902aa072f63c26277444d81d12de1a5b83e494a71030e827ca55061409845404d25d61777a724ef40bdd58ea030870a3bf5626a424fd3820fc9815ab99bfc49f866127402c05479824ce784038fedf5b1d544e8faccbdbe399dca7bbb0e187f4c91c28a5f0c2b67c8d33207602dd81c9223608ab0308209276966e41882ec887fdd23219b8efe1febcf89cebf91e8227536ec100796a25d23d022dc5c76a771f98a5c5197560c8541e2c19bf4b30fe886c7df166360ac0785d51037f42135c4bf282cb70a229e60d68b41d59e45340500462e612632089d2eec26df5880c3d06b8da5067cf2e874931922c7982eedf194ba69a6f7c0d6b3fcf23722f3e4428ef089efdc69292294ffb777a82b6aa19724206356ae354781e057c9a64fef79fea463d6120ad7b5e46847c511ef5b97765191022f3e82f82f98d27b71b9a08a4b624c7ff01e95ae185ab46040f664019eacbaaf861c60d666b904d926f462a83bf63d47bf24a2a6631f7774273f23e30222958c073900718a1f033420278e2452cff1816a764891956e0055821b18ff5e5c5d067f24233e4ce5564be33286f526e36efbe0b2be3b6de7b9b7f77ecd0e6d613a0e5848af836ea138ac9ac4661ce49233bdbae23e84b2b870944f5bb559601d12d1912f19bb617ef58bdf1c625591bfa123528bd36b635b130aecff957ec210e42990d33eed99054aa1a1339e17c4747ee36be4a8ad248f133aaac5bdbf341583898d880abfa1ed5b4676a404613deacc94cd087f8bd4b2329e79a12a0f475b1b5aa53fb1e81a47763d571fc387cc133161a4e56ed3976e4c5017aedfb733d269e9a7526648032a5be3b7038588d68a47f5787b2a61a622942cd741e984b1829dfb43160c4431cb6e2e493294143f79e41bfc96967abdbdba3f47ca6838979f105975fddab020dcb73e193e00b473b9080fa8feb2ca10cd71841b5d07146722a6b2b74cbcd14b0b3dc768af8cfda41b7aa7c01fbe6e9e8c22912607cbdc47ee6d996d12e7d9b47a3054fe69ec3bcbda9b702f488ec34b0b825e5d156109ca7d801098fd914fd4c51c4c7bc1c0a39704b772961574c5520c6444ea6752eddc9a10d278be709e93e6460df4a4a021b02367a66b35ae8e8255fe6e93f26b6e91a18e4d82a6dfc1b902d8a531bcc9b198fa6ca59a42d3b55034f023601e8f865d3d7a206644d44417514182d940d182e354cf33305dbca201eff8359d465ce92639caa6ab069174d48505db64fe8292cc852afeb9873101ece8cd35a221a77c6d11932e2814e12f423dc347df197323b7ea4898ab319d97c050075531c7a73b22b8c273fd4295fc43df114b22fdff97815ab034cd77810b10daa4db493c07c32c13e280087767edeef204377682cd93ea57ce90e2031e62596b4520c33ef8257708a0f8041dc419ec1dd96409ddcb29216248902607a9602a35a33175d992c89132a88a196d1eaa687a42d4ef3ab5207ed1debaee49f602b497f61b22a6462a200e5e431d661f01ce0722115407ae974da7a41e3bb6e8311876db3fb767a2dabfb9e6854906cd83ddfbd30a07bf92640c89ecce2d58199652fc8400f75ba7f23ba0ef2ca82f3931b5ccb345024c80a78276d95e990dc3da42479387d50500294596a9e705be0900abed1142b01d17aa0d97bfbcb51a0d23be12b51724a042c01ad428934e93873df0895dd52a49d",
        },
    },
];

export { game, currencyData, socketOptionsFunc, gameConfig, userRoundsData, userBetData, promotions, userBetLogData, resultsData };
