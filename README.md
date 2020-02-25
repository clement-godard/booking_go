# BookingGo Techincal Test Submission

Command line application and simple REST API.
Questions - [you can find them here](https://github.com/rideways/technical_test)

## Install and Test

- Clone the project using `git clone`
- Open the project directory `cd booking_go`
- Run `npm install` in your terminal to install all dependencies
- Run `npm test` to run unit tests.

## Run

### Part 1

To run the script use `node app.js pickupLocation dropoffLocation minPassangers supplier`

- `pickup` and `dropoff` have the following format `latitude,longitude`, `min` is an integer
- If supplier is not provided, all available suppliers will be fetched.

Example: `node app.js 51.470020,-0.454295 51.5112079,-0.1215334 3`

### Part 2

- To start a local server for the REST api run `node api.js`
- Make a GET request to `localhost:3000/endpoint` to test the API. The following endpoints are available

#### Endpoints

1. **`/fetchSupplier`**

Query parameters

```javascript
{supplier: "string", pickup: "lat,lon", dropoff: "lat,lon", min: int}
```

Example response

```javascript
{"message": "No result"}
```

2. **`/fetchAllSuppliers`**

Query parameters

```javascript
{pickup: "lat,lon", dropoff: "lat,lon", min: int}
```

Example response

```javascript
{
  [
    "MINIBUS - dave - 284791",
    "PEOPLE_CARRIER - dave - 536676",
    "LUXURY - dave - 616931",
    "STANDARD - dave - 628005"
  ];
}
```

Examples:

- `http://localhost:3000/fetchSupplier?supplier=dave&pickup=51.470020,-0.454295&dropoff=51.5112079,-0.1215334&min=3`
