type ConnectionDetails = {
  timeDateString: string;
  dateString: string;
  timeString: string;
};

type Price = {
  currency: string;
  adult: number;
  child: number;
};

interface FlightDetails {
  flight_id: string;
  depatureDestination: string;
  arrivalDestination: string;
  departureTime: ConnectionDetails;
  arrivalTime: ConnectionDetails;
  duration: string;
  avaliableSeats: number;
  prices: Price;
}

interface Trip {
  departure: FlightDetails;
  return?: FlightDetails;
}
