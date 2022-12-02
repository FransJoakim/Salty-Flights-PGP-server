"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const flightData = require("./data.json");
const fs = require('fs');
let AppService = class AppService {
    constructor() {
        this.getFlightDetails = (flight, bookingDate, P_Count) => {
            const itinerary = [];
            flight.itineraries.forEach((depature) => {
                const departureDateObj = new Date(depature.depatureAt);
                const arrivalDateObj = new Date(depature.arriveAt);
                if (departureDateObj.getDate() === bookingDate &&
                    depature.avaliableSeats >= P_Count) {
                    const details = {
                        departure: {
                            flight_id: flight.flight_id,
                            depatureDestination: flight.depatureDestination,
                            arrivalDestination: flight.arrivalDestination,
                            departureTime: {
                                timeDateString: depature.depatureAt,
                                dateString: this.dateToString(departureDateObj),
                                timeString: this.msToTime(departureDateObj.getTime()),
                            },
                            arrivalTime: {
                                timeDateString: depature.arriveAt,
                                dateString: this.dateToString(arrivalDateObj),
                                timeString: this.msToTime(arrivalDateObj.getTime()),
                            },
                            duration: this.msToTime(arrivalDateObj.getTime() - departureDateObj.getTime()),
                            avaliableSeats: depature.avaliableSeats,
                            prices: depature.prices[0],
                        },
                    };
                    itinerary.push(details);
                }
            });
            return itinerary;
        };
        this.msToTime = (duration) => {
            let minutes = Math.floor((duration / (1000 * 60)) % 60);
            let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            const hoursStr = hours < 10 ? '0' + hours : hours;
            const minutesStr = minutes < 10 ? '0' + minutes : minutes;
            return hoursStr + ':' + minutesStr;
        };
        this.dateToString = (date) => `${date.getDate()}/${date.getMonth()}`;
    }
    bookFlight(nrSeats, trip) {
        this.reserveSeats(trip.departure, nrSeats);
    }
    reserveSeats(bookedFlight, reservations) {
        const updatedFlightData = flightData.map((flight) => {
            if (flight.flight_id !== bookedFlight.flight_id)
                return flight;
            return Object.assign(Object.assign({}, flight), { itineraries: flight.itineraries.map((trip) => {
                    if (trip.depatureAt !== bookedFlight.departureTime.timeDateString)
                        return trip;
                    return Object.assign(Object.assign({}, trip), { avaliableSeats: trip.avaliableSeats - reservations });
                }) });
        });
        let data = JSON.stringify(updatedFlightData, null, 2);
        try {
            fs.writeFileSync('./src/data.json', data);
            console.log('Data successfully saved to disk');
        }
        catch (error) {
            console.log('An error has occurred ', error);
        }
    }
    getFlights(D_City, A_City, D_Date, R_Date, P_Count) {
        let resultingItinerary = [];
        const D_DateFlights = flightData.filter((flight) => {
            return (D_City === flight.depatureDestination &&
                A_City === flight.arrivalDestination);
        });
        D_DateFlights.forEach((flight) => {
            const itinerary = this.getFlightDetails(flight, Number(D_Date), Number(P_Count));
            resultingItinerary = resultingItinerary.concat(itinerary);
        });
        let R_DateFlights;
        if (R_Date) {
            R_DateFlights = flightData.filter((flight) => {
                return (A_City === flight.depatureDestination &&
                    D_City === flight.arrivalDestination);
            });
            let R_Itinerary = [];
            R_DateFlights.forEach((flight) => {
                const itinerary = this.getFlightDetails(flight, Number(R_Date), Number(P_Count));
                R_Itinerary = R_Itinerary.concat(itinerary);
            });
            let roundTripItinerary = [];
            resultingItinerary.forEach((D_flight) => {
                const x = R_Itinerary.map((R_flight) => {
                    return {
                        departure: D_flight.departure,
                        return: R_flight.departure,
                    };
                });
                roundTripItinerary = roundTripItinerary.concat(x);
            });
            resultingItinerary = roundTripItinerary;
        }
        return [...resultingItinerary];
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map