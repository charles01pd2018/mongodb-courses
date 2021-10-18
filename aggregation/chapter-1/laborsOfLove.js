var getLaborsOfLove = ( pipeline ) => {
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
        $match: {
            'writers': { $elemMatch: { $exists: true } },
            'cast': { $elemMatch: { $exists: true } },
            'directors': { $elemMatch: { $exists: true } },
        }
    },
    {
        $project: {
            'baseWriters': {
                $map: {
                    input: '$writers',
                    as: 'bWriters',
                    in: {
                        $arrayElemAt: [
                            {
                                $split: [ '$$bWriters', ' (' ]
                            }, 
                            0
                        ]
                    }
                }
            },
            'cast': 1,
            'directors': 1,
        }
    },
    {
        $project: {
            'laborsOfLove': {
                $gt: [
                    { 
                        $size: { $setIntersection: [ '$cast', '$directors', '$baseWriters' ] } 
                    },
                    0,
                ]
            },
        },
    },
    {
        $match: {
            'laborsOfLove': true,
        },
    },
]

getLaborsOfLove( pipeline );