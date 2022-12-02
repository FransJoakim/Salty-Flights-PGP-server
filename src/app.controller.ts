import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('book')
  bookFlight(@Body('trip') trip: any, @Body('travelers') travelers: any) {
    return this.appService.bookFlight(travelers.length, trip);
  }

  @Get('availability')
  findFlights(
    @Query('P_Count') P_Count: number,
    @Query('D_City') D_City: string,
    @Query('A_City') A_City: string,
    @Query('D_Date') D_Date: number,
    @Query('R_Date') R_Date: number,
  ) {
    return this.appService.getFlights(D_City, A_City, D_Date, R_Date, P_Count);
  }
}
