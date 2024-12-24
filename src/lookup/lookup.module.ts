import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupService } from './lookup.service';
import { LookupResolver } from './lookup.resolver';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { SchoolDistrict } from './entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State, SchoolDistrict])],
  providers: [LookupService, LookupResolver],
})
export class LookupModule {}
