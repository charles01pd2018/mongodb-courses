var getOscarState = ( pipeline ) => {
    try {
        let results = db.movies.aggregate( pipeline ).next();

        printjson( results );
    }
    catch ( error ) {
        print( error )
    }
}

var pipeline = [
    // {
    //     $addFields: {
    //         'awards': {
    //             $arrayElemAt: [
    //                 {
    //                     $split: [ '$awards', ' ' ],
    //                 },
    //                 1,
    //             ],
    //         }
    //     }
    // },
    // {
    //     $match: {
    //         'awards': { $gte: 1 },     
    //     },
    // },
    {
        $match: {
            'awards': { $regex : /Won \d+ Oscar/ }
        }
    },
    {
        $group: {
            '_id': 0,
            'highest_rating': { $max: '$imdb.rating' },
            'lowest_rating': { $min: '$imdb.rating' },
            'average_rating': { $avg: '$imdb.rating' },
            'stdDeviation': { $stdDevSamp: '$imdb.rating' },
        }
    }
]

getOscarState( pipeline );