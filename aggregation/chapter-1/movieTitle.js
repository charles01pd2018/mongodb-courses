var getOneWordMovieTitle = ( pipeline ) => {
    let aggregations = db.getSiblingDB("aggregations");

    try {
        let resultsExplain = aggregations.movies.aggregate( pipeline ).itcount();
      print ( resultsExplain );
    }
    catch ( error ) {
        print( error );
    }
}

var pipeline = [
    {
        $project: {
            'titleWordCount': {
                $size: {
                    $split: [ '$title', ' ' ],
                },
            },
        },
    },
    {
        $match: {
            'titleWordCount': 1,
        },
    },
]

getOneWordMovieTitle( pipeline );