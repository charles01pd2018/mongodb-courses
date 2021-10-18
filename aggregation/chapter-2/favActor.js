var getFavMovies = ( pipeline ) => {
    let aggregations = db.getSiblingDB( 'aggregations' );

    try {
        let resultsExplain = aggregations.movies.aggregate( pipeline );
        print ( resultsExplain.next().title );
    }
    catch ( error ) {
        print ( error );
    }
}

var favActors = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"
];

var pipeline = [
    {
        $match: {
            'tomatoes.viewer.rating': { $gte: 3 },
            'countries': { $in: [ 'USA' ] },
            'cast': { $exists: true },
        },
    },
    {
        $addFields: {
            'num_favs': {
                $size: {
                    $setIntersection: [ '$cast', favActors ],
                },
            },
        },
    },
    {
        $sort: {
            'num_favs': -1,
            'tomatoes.viewer.rating': -1,
            'title': -1,
        }
    },
    {
        $skip: 24,
    }
];

getFavMovies( pipeline );