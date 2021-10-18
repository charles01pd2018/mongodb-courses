var getHighestRatedMovies = ( pipeline ) => {
    try {
        let results = db.movies.aggregate( pipeline ).next();

        printjson( results );
    }
    catch ( error ) {
        print( error )
    }
}

var pipeline = [
    {
        $facet: {
            'topImdb': [
                { $sort: { 'imdb.rating': -1, } },
                { $limit: 10 },
            ],
            'topMetacritic': [
                { $sort: { 'metacritic': -1 } },
                { $limit: 10 },
            ],
        },
    },
    {
        $project: {
            'topFilmsCount': {
                $size: {
                    $setIntersection: [ '$topImdb', '$topMetacritic' ],
                },
            }
        }
    },
]

getHighestRatedMovies( pipeline )