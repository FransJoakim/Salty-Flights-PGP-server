type Depature = {
    depatureAt: string;
    arriveAt: string;
    avaliableSeats: number;
    prices: Price[];
};
export declare class Flight {
    flight_id: string;
    depatureDestination: string;
    arrivalDestination: string;
    itineraries: Depature[];
    constructor(flight_id: string, depatureDestination: string, arrivalDestination: string, itineraries: Depature[]);
}
export {};
