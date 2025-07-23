import { Controller, Get, Logger } from '@nestjs/common';

@Controller('health')
export class HealthController {
    private readonly logger = new Logger(HealthController.name);

    @Get()
    getHealth() {
        this.logger.log(`[HealthController]: ok`)
        return { status: 'ok', timestamp: new Date().toISOString() };
    }
}