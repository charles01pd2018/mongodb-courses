var getPopMovie = ( pipeline ) => {
    try {
        let results = db.movies.aggregate( pipeline ).next();

        printjson( results );
    }
    catch ( error ) {
        print( error );
    }
}

var pipeline = [
    {
        $unwind: '$cast',
    },
    {
        $group: {
            '_id': '$cast',
            'numFilms': { $sum: 1 },
            'average': { $avg:'$imdb.rating' },
        },
    },
    {
        $sort: { 'numFilms': -1 },
    },
    {
        $limit: 1,
    },
]

getPopMovie( pipeline );