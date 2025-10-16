import { Module } from '@nestjs/common';
import { AgencyContractController } from './agency-contract.controller';
import { AgencyContractService } from './agency-contract.service';

@Module({
  controllers: [AgencyContractController],
  providers: [AgencyContractService]
})
export class AgencyContractModule {}
