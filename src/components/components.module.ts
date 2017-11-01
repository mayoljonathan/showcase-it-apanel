import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasonryModule } from 'angular2-masonry';
import { StarRatingModule } from 'angular-star-rating';

import { PipesModule } from '../shared/pipes/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';

import { AppListTableComponent } from './app-list-table/app-list-table';
import { StarComponent } from './star/star';
import { ReviewComponent } from './review/review';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards';

@NgModule({
	declarations: [
		AppListTableComponent,
    	StarComponent,
		ReviewComponent,
		DashboardCardsComponent,
	],
	imports: [
		PipesModule,
		MaterialIconsModule,
		MasonryModule,
		StarRatingModule.forRoot(),
		IonicPageModule.forChild(ComponentsModule)
	],
	exports: [
		AppListTableComponent,
    	StarComponent,
		ReviewComponent,
		DashboardCardsComponent,
	]
})
export class ComponentsModule {}
