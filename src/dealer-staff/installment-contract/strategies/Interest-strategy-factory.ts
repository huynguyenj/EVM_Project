import { BadRequestException } from '@nestjs/common';
import { DecliningInterestStrategy } from './declining-interest-payment.strategy';
import { FlatInterestStrategy } from './flat-interest-payment.strategy';

//Factory return an instance of interest strategy class
export class InterestPaymentStrategyFactory {
  static getInterestStrategy(type: string) {
    switch (type.toUpperCase()) {
      case 'FLAT':
        return new FlatInterestStrategy();
      case 'DECLINING':
        return new DecliningInterestStrategy();
      default:
        throw new BadRequestException('This type of interest is not available');
    }
  }
}
