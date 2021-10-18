var getNormRating = ( pipeline ) => {
    try {
        let results = db.movies.aggregate( pipeline ).next();

        print( results.title );
    }
    catch ( error ) {
        print( error );
    }
}

var pipeline = [
    {
        $match: {
            'languages': { $in: [ 'English' ] },
            'imdb.rating': { $gte: 1 },
            'imdb.votes': { $gte: 1 },
            'year': { $gte: 1990 },
        },
    },
    {
        $addFields: {
            'normalized_rating': {
                $avg: [
                    '$imdb.rating',
                    {
                        $add: [
                            1,
                            {
                                $multiply: [
                                    9,
                                    {
                                        $divide: [
                                            { $subtract: [ '$imdb.votes', 5 ] },
                                            { $subtract: [ 1521105, 5] },
                                        ],
                                    },
                                ],
                            },
                        ],
                    }
                ],
            },
        },
    },
    { $sort: { 'normalized_rating': 1 } },
    { $limit: 1 },
];

getNormRating( pipeline );