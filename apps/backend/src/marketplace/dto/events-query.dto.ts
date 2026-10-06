import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class EventsQueryDto {
  @IsIn(['all', 'openstack', 'blockchain'])
  source: 'all' | 'openstack' | 'blockchain' = 'all';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 25;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  cursor?: string;
}
