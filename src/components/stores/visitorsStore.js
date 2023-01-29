import {defineStore} from "pinia";

export const useVisitorsStore = defineStore("visitor", {
    state: () => ({
        visitorsList: [
            {
                id: 1673883019368,
                name: "Bernardo Silies",
                phone: "0549532893",
            },
            {
                id: 1674135068696,
                name: "Bjola Ukulele",
                phone: "0365272754",
            },
            {
                id: 1673874894820,
                name: "Brandt Bools",
                phone: "0124891141",
            },
            {
                id: 1673900043137,
                name: "Chlapec Botinok",
                phone: "0365266546",
            },
            {
                id: 1673874916207,
                name: "Fernando Michi",
                phone: "0364538958",
            },
            {
                id: 1673899788864,
                name: "Fernas Parnas",
                phone: "0543625654",
            },
            {
                id: 1674241928192,
                name: "Holo Ukulele",
                phone: "0362656545",
            },
            {
                id: 1674135096806,
                name: "Homo Sapiens",
                phone: "0426436526",
            },
            {
                id: 1673874830882,
                name: "Ivan Polovecik",
                phone: "0152412433",
            },
            {
                id: 1673874848737,
                name: "Jenny Bruh",
                phone: "0513353151",
            },
            {
                id: 1674842261569,
                name: "Pecher echka Doli",
                phone: "0254634635",
            },
            {
                id: 1674848519298,
                name: "dsffsef",
                phone: "0532532552",
            },
        ],
    }),
});
