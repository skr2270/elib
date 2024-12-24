import { Resolver, Query, Args } from '@nestjs/graphql';
import { LookupService } from './lookup.service';
import { CountryDto, StateDto, SchoolDistrictDto } from './lookup.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class LookupResolver {
  constructor(private readonly lookupService: LookupService) {}

  @Query(() => [CountryDto])
  async getCountries(): Promise<CountryDto[]> {
    try {
      return await this.lookupService.getCountries();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Query(() => [StateDto])
  async getStates(@Args('countryId') countryId: number): Promise<StateDto[]> {
    try {
      return await this.lookupService.getStates(countryId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Query(() => [SchoolDistrictDto])
  async getSchoolDistricts(): Promise<SchoolDistrictDto[]> {
    try {
      return await this.lookupService.getSchoolDistricts();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
