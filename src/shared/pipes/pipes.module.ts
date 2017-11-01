import { NgModule } from '@angular/core';

import { FilterPipe } from './filter/filter';
import { FileSize } from './file-size/file-size';
import { TimeFromNow,ToDate,ToFullDateAndTime } from './moment/moment';
import { ObjectToArray } from './helper/objToArray';
import { Sort } from './helper/sort';
import { LinkifyPipe } from './helper/linkify';

@NgModule({
	declarations: [TimeFromNow,ToDate,ToFullDateAndTime,FileSize,FilterPipe,ObjectToArray,Sort,LinkifyPipe],
	imports: [],
	exports: [TimeFromNow,ToDate,ToFullDateAndTime,FileSize,FilterPipe,ObjectToArray,Sort,LinkifyPipe]
})
export class PipesModule {}
