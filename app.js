const fetch = require("node-fetch")

SUPPLIERS = {
    dave: "dave",
    eric: "eric",
    jeff: "jeff"
}

const ENDPOINT = "https://techtest.rideways.com/"

const CARS = new Map()

CARS.set("STANDARD", 4)
CARS.set("EXECUTIVE", 4)
CARS.set("LUXURY", 4)
CARS.set("PEOPLE_CARRIER", 6)
CARS.set("LUXURY_PEOPLE_CARRIER", 6)
CARS.set("MINIBUS", 16)

timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

fetchSupplier = async (supplier, pickup, dropoff, min) => {
    if (!SUPPLIERS.hasOwnProperty(supplier)) return undefined
    let url = `${ENDPOINT + supplier}?pickup=${pickup}&dropoff=${dropoff}`
    const result = await timeout(2000, fetch(url))
        .then(response => response.json())
        .then(response => {
            return response
        }).catch(error => {
            return error
        })
    if (result instanceof Error || result.options == null) {
        return undefined
    }
    const formatted = result.options
        .sort((a, b) => a.price > b.price)
        .filter(s => CARS.get(s.car_type) > min)
        .map(a => `${a.car_type} - ${supplier} - ${a.price}`)
    if (formatted.length != 0) return formatted
    return undefined
}

fetchAllSuppliers = async (pickup, dropoff, min) => {
    let list = []
    for (SUPPLIER in SUPPLIERS) {
        const res = await fetchSupplier(SUPPLIER, pickup, dropoff, min)
        if (res != undefined) {
            list.push(res)
        }
    }
    var merged = [].concat.apply([], list);
    return merged
}

const run = async () => {
    if (process.argv.slice(2).length > 2) {
        let pickup = process.argv.slice(2)[0]
        let dropoff = process.argv.slice(2)[1]
        let min = process.argv.slice(2)[2]
        let supplier = process.argv.slice(2)[3]
        if (!supplier) {
            result = await fetchAllSuppliers(pickup, dropoff, min)
            if (result == null) {
                console.log("No result.")
            } else {
                result.forEach(r => console.log(r))
            }
        } else {
            result = await fetchSupplier(supplier, pickup, dropoff, min)
            if (result == null) {
                console.log("No result.")
            } else {
                result.forEach(r => console.log(r))
            }
        }
    } else {
        console.log("Invalid parameters. Please enter: pickup location, dropoff location and nb of passangers.")
    }
}

run()

