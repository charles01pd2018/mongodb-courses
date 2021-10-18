var getUniqueAlliance = ( pipeline ) => {
    try {
        let results = db.air_routes.aggregate( pipeline ).next();

        printjson( results );
    }
    catch ( error ) {
        print( error )
    }
}

var AIRPORTS = [ 'JFK', 'LHR' ];
// airline.name in air_routes = name in air_alliances
var pipeline = [
    {
        $match: {
            'src_airport': { $in: AIRPORTS },
            'dst_airport': { $in: AIRPORTS },
        },
    },
    {
        $lookup: {
            from: 'air_alliances',
            localField: 'airline.name',
            foreignField: 'name',
            as: 'flightRoute',
        },
    },
    {
        $match: {
            'flightRoute': { $ne: [] },
        },
    },
]

getUniqueAlliance( pipeline );