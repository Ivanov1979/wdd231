export const templates = {
    apply: [
        { id: "T01", type: "add", denom: "unlike", difficulty: "easy", maxD: 10 },
        { id: "T02", type: "add", denom: "unlike", difficulty: "easy", maxD: 10 },
        { id: "T03", type: "sub", denom: "unlike", difficulty: "easy", maxD: 10 },
        { id: "T04", type: "sub", denom: "unlike", difficulty: "easy", maxD: 10 },

        { id: "T05", type: "add", denom: "unlike", difficulty: "medium", maxD: 12 },
        { id: "T06", type: "add", denom: "unlike", difficulty: "medium", maxD: 12 },
        { id: "T07", type: "sub", denom: "unlike", difficulty: "medium", maxD: 12 },
        { id: "T08", type: "sub", denom: "unlike", difficulty: "medium", maxD: 12 },

        { id: "T09", type: "add", denom: "unlike", difficulty: "hard", maxD: 15 },
        { id: "T10", type: "add", denom: "unlike", difficulty: "hard", maxD: 15 },
        { id: "T11", type: "sub", denom: "unlike", difficulty: "hard", maxD: 15 },
        { id: "T12", type: "sub", denom: "unlike", difficulty: "hard", maxD: 15 },

        { id: "T13", type: "add", denom: "like", difficulty: "easy", maxD: 12 },
        { id: "T14", type: "sub", denom: "like", difficulty: "easy", maxD: 12 },
        { id: "T15", type: "add", denom: "like", difficulty: "medium", maxD: 15 },
        { id: "T16", type: "sub", denom: "like", difficulty: "medium", maxD: 15 },

        { id: "T17", type: "add", denom: "unlike", difficulty: "medium", maxD: 14 },
        { id: "T18", type: "sub", denom: "unlike", difficulty: "medium", maxD: 14 }
    ],

    pbl: [
        {
            id: "W01",
            type: "add",
            denom: "unlike",
            difficulty: "easy",
            maxD: 10,
            story: "Sofía read {a} of a book in the morning and {b} in the afternoon. How much did she read in total?"
        },
        {
            id: "W02",
            type: "sub",
            denom: "unlike",
            difficulty: "easy",
            maxD: 10,
            story: "A recipe needs {a} cup of flour. You already have {b} cup. How much more do you need?"
        },
        {
            id: "W03",
            type: "add",
            denom: "unlike",
            difficulty: "medium",
            maxD: 12,
            story: "A runner traveled {a} km in the first part and {b} km in the second part. What is the total distance?"
        },
        {
            id: "W04",
            type: "sub",
            denom: "unlike",
            difficulty: "medium",
            maxD: 12,
            story: "A tank was {a} full. After using {b} of the tank, how much remains?"
        },
        {
            id: "W05",
            type: "add",
            denom: "like",
            difficulty: "medium",
            maxD: 12,
            story: "You ate {a} of a pizza and your friend ate {b}. How much was eaten in total?"
        },
        {
            id: "W06",
            type: "sub",
            denom: "like",
            difficulty: "hard",
            maxD: 15,
            story: "A ribbon is {a} meters long. If you cut off {b} meters, how much ribbon is left?"
        }
    ]
};
