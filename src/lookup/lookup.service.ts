import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { SchoolDistrict } from './entities/district.entity';
import { CountryDto, SchoolDistrictDto, StateDto } from './lookup.dto';

@Injectable()
export class LookupService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(SchoolDistrict)
    private schoolDistrictRepository: Repository<SchoolDistrict>,
  ) {}

  async getCountries(): Promise<CountryDto[]> {
    const countries = await this.countryRepository.find();
    if (!countries || countries.length === 0) {
      throw new NotFoundException('No countries found');
    }
    return countries;
  }

  async getStates(countryId: number): Promise<StateDto[]> {
    const states = await this.stateRepository.find({ where: { CountryId: countryId } });
    if (!states || states.length === 0) {
      throw new NotFoundException(`No states found for country ID ${countryId}`);
    }
    return states;
  }

  async getSchoolDistricts(): Promise<SchoolDistrictDto[]> {
    const schoolDistricts = await this.schoolDistrictRepository.find();
    if (!schoolDistricts || schoolDistricts.length === 0) {
      throw new NotFoundException('No school districts found');
    }
    return schoolDistricts;
  }
}
