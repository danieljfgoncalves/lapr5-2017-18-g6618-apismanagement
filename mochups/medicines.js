/**
 * The medicines json mock data.
 */

module.exports = {

    medicines: [
        { name: "Dysmenorrhea" },
        { name: "Osteoarthritis" },
        { name: "Arthritis" },

        { name: "Glipizide" },
        { name: "Methadone" },

        { name: "Restasis" },
        { name: "Gralise" }
    ],
    
    drugs: [
        { name: "Ibuprofen" },
        { name: "Xanax" },
        { name: "Lunesta" }
    ],
    
    posologies: [
        { period: '5 days', interval: '4 to 6 hours', dosage: '240 to 400 mg', technique: 'oral', recommendedFor: 'above 18' },
        { period: '7 days', interval: '18 n\' 18', dosage: '130 mg', technique: 'injection' },

        { period: '9 days', interval: '14 n\' 14', dosage: '20 mg', technique: 'oral tablet', recommendedFor: 'above 6' },
        { period: '2 days', interval: '8 to 10 hours', dosage: '100 mg', technique: 'compounding powder' },

        { period: '30 days', interval: '12 n\' 12', dosage: '300 mg', technique: 'extended release' },
        { period: '18 days', interval: '5 to 6 hours', dosage: '40 mg', technique: 'disintegrating', recommendedFor: 'above 10'},

        { period: '10 days', interval: '4 to 6 hours', dosage: '240 to 400 mg', technique: 'oral', recommendedFor: 'above 18' },
        { period: '20 days', interval: '18 n\' 18', dosage: '130 mg', technique: 'injection' },

        { period: '35 days', interval: '14 n\' 14', dosage: '20 mg', technique: 'oral tablet', recommendedFor: 'above 6' },
        { period: '25 days', interval: '8 to 10 hours', dosage: '100 mg', technique: 'compounding powder' },

        { period: '14 days', interval: '12 n\' 12', dosage: '300 mg', technique: 'extended release' },
        { period: '33 days', interval: '5 to 6 hours', dosage: '40 mg', technique: 'disintegrating', recommendedFor: 'above 10'}
    ],
    
    comments: [
        { physician:'auth0|5a59f55220ca020c265c77ba', text: 'changes in patterns and rhythms of speech' },
        { physician:'auth0|5a59f56620ca020c265c77bf', text: 'difficulty with coordination' },

        { physician:'auth0|5a59f56620ca020c265c77bf', text: 'irritability' },
        { physician:'auth0|5a59f53d20ca020c265c77b5', text: 'lack of appetite' },

        { physician:'auth0|5a59f53d20ca020c265c77b5', text: 'trouble concentrating' },
        { physician:'auth0|5a59f55220ca020c265c77ba', text: 'unusual tiredness or weakness' }
    ],
    
    presentations: [
        { form: 'blister', concentration: '200mg', packageQuantity: 30 },
        { form: 'injection', concentration: '300mg', packageQuantity: 40 },

        { form: 'xarope', concentration: '100ml', packageQuantity: 50 },
        { form: 'injection', concentration: '80ml', packageQuantity: 60 },

        { form: 'xarope', concentration: '135ml', packageQuantity: 70 },
        { form: 'blister', concentration: '200mg', packageQuantity: 80 }
    ]
    
}