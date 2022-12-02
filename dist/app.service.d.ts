export declare class AppService {
    bookFlight(nrSeats: number, trip: Trip): void;
    private reserveSeats;
    getFlights(D_City: any, A_City: any, D_Date: any, R_Date: any, P_Count: any): Trip[];
    private getFlightDetails;
    private msToTime;
    private dateToString;
}
