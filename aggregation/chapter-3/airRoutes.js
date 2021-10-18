var getAirRoutes = ( pipeline ) => {
    try {
        let results = db.air_alliances.aggregate( pipeline ).next();

        printjson( results );
    }
    catch ( error ) {
        print( error )
    }
}

var pipeline = [
    { $unwind: '$airlines' },
    {
        $lookup: {
            from: 'air_routes',
            localField: 'airlines',
            foreignField: 'airline.name',
            as: 'routes',
        },
    },
    { $unwind: '$routes' },
    {
        $match: {
            'routes.airplane': {
                $in: [ '747', '380' ],
            },
        },
    },
    {
        $group: {
            '_id': '$name',
            'routeCount': { $sum: 1 },
        },
    },
    {
        $sort: { 'routeCount': -1 }
    },
]

getAirRoutes( pipeline );