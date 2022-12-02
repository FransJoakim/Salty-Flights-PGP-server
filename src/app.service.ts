import { Injectable } from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';
import { Flight } from './app.model';
import * as flightData from './data.json';
const fs = require('fs');

@Injectable()
export class AppService {
  bookFlight(nrSeats: number, trip: Trip) {
    this.reserveSeats(trip.departure, nrSeats);
  }

  private reserveSeats(bookedFlight: FlightDetails, reservations: number) {
    const updatedFlightData = flightData.map((flight: Flight) => {
      if (flight.flight_id !== bookedFlight.flight_id) return flight;

      return {
        ...flight,
        itineraries: flight.itineraries.map((trip) => {
          if (trip.depatureAt !== bookedFlight.departureTime.timeDateString)
            return trip;

          return {
            ...trip,
            avaliableSeats: trip.avaliableSeats - reservations,
          };
        }),
      };
    });

    let data = JSON.stringify(updatedFlightData, null, 2);
    try {
      fs.writeFileSync('./src/data.json', data);
      console.log('Data successfully saved to disk');
    } catch (error) {
      console.log('An error has occurred ', error);
    }
  }

  getFlights(D_City, A_City, D_Date, R_Date, P_Count): Trip[] {
    let resultingItinerary = [];

    const D_DateFlights = flightData.filter((flight) => {
      return (
        D_City === flight.depatureDestination &&
        A_City === flight.arrivalDestination
      );
    });

    D_DateFlights.forEach((flight: Flight) => {
      const itinerary = this.getFlightDetails(
        flight,
        Number(D_Date),
        Number(P_Count),
      );
      resultingItinerary = resultingItinerary.concat(itinerary);
    });

    let R_DateFlights;
    if (R_Date) {
      R_DateFlights = flightData.filter((flight) => {
        return (
          A_City === flight.depatureDestination &&
          D_City === flight.arrivalDestination
        );
      });

      let R_Itinerary = [];

      R_DateFlights.forEach((flight: Flight) => {
        const itinerary = this.getFlightDetails(
          flight,
          Number(R_Date),
          Number(P_Count),
        );
        R_Itinerary = R_Itinerary.concat(itinerary);
      });

      let roundTripItinerary = [];
      resultingItinerary.forEach((D_flight: Trip) => {
        const x = R_Itinerary.map((R_flight: Trip) => {
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

  private getFlightDetails = (
    flight: Flight,
    bookingDate: number,
    P_Count: number,
  ) => {
    const itinerary = [];

    flight.itineraries.forEach((depature) => {
      const departureDateObj = new Date(depature.depatureAt);
      const arrivalDateObj = new Date(depature.arriveAt);

      if (
        departureDateObj.getDate() === bookingDate &&
        depature.avaliableSeats >= P_Count
      ) {
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
            duration: this.msToTime(
              arrivalDateObj.getTime() - departureDateObj.getTime(),
            ),
            avaliableSeats: depature.avaliableSeats,
            prices: depature.prices[0],
          },
        };
        itinerary.push(details);
      }
    });
    return itinerary;
  };

  private msToTime = (duration: number) => {
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return hoursStr + ':' + minutesStr;
  };

  private dateToString = (date: Date) => `${date.getDate()}/${date.getMonth()}`;
}
