type Depature = {
  depatureAt: string;
  arriveAt: string;
  avaliableSeats: number;
  prices: Price[];
};

export class Flight {
  constructor(
    public flight_id: string,
    public depatureDestination: string,
    public arrivalDestination: string,
    public itineraries: Depature[],
  ) {}
}
