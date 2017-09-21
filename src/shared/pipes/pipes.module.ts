import { NgModule } from '@angular/core';

import { FilterPipe } from './filter/filter';
import { FileSize } from './file-size/file-size';
import { TimeFromNow,ToDate,ToFullDateAndTime } from './moment/moment';
@NgModule({
	declarations: [TimeFromNow,ToDate,ToFullDateAndTime,FileSize,FilterPipe],
	imports: [],
	exports: [TimeFromNow,ToDate,ToFullDateAndTime,FileSize,FilterPipe]
})
export class PipesModule {}
