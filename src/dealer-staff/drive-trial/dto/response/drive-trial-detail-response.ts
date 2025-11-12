import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { DriveTrailResponse } from './drive-trial-response';

class DriveTrialMotorbikeInfo extends PickType(MotorbikeResponseDto, [
  'model',
  'name',
  'makeFrom',
  'version',
]) {}

export class DriveTrialDetailResponse extends DriveTrailResponse {
  @ApiResponseProperty({ type: DriveTrialMotorbikeInfo })
  electricMotorbike: DriveTrialMotorbikeInfo;
}
