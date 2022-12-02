"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    bookFlight(trip, travelers) {
        return this.appService.bookFlight(travelers.length, trip);
    }
    findFlights(P_Count, D_City, A_City, D_Date, R_Date) {
        return this.appService.getFlights(D_City, A_City, D_Date, R_Date, P_Count);
    }
};
__decorate([
    (0, common_1.Post)('book'),
    __param(0, (0, common_1.Body)('trip')),
    __param(1, (0, common_1.Body)('travelers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "bookFlight", null);
__decorate([
    (0, common_1.Get)('availability'),
    __param(0, (0, common_1.Query)('P_Count')),
    __param(1, (0, common_1.Query)('D_City')),
    __param(2, (0, common_1.Query)('A_City')),
    __param(3, (0, common_1.Query)('D_Date')),
    __param(4, (0, common_1.Query)('R_Date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findFlights", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map