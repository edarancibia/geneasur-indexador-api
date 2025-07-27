import { Controller, Get, Logger } from '@nestjs/common';
import { CementeriesService } from './cementeries/cementeries.service';

@Controller('health')
export class HealthController {
    private readonly logger = new Logger(HealthController.name);
    constructor(
        private readonly service: CementeriesService
    ) {}

    @Get()
    async getHealth() {
        this.logger.log(`[HealthController]: ok`)
        const data = await this.service.findAllCemeteries()

        return { status: 'ok', timestamp: new Date().toISOString(), data };
    }
}