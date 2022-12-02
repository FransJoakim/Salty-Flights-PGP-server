import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    bookFlight(trip: any, travelers: any): void;
    findFlights(P_Count: number, D_City: string, A_City: string, D_Date: number, R_Date: number): Trip[];
}
