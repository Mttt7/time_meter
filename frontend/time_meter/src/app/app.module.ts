import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ActiveCalendarsComponent } from './components/active-calendars/active-calendars.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { GoalPreviewComponent } from './components/goal-preview/goal-preview.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    ActiveCalendarsComponent,
    TimelineComponent,
    GoalPreviewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    InputSwitchModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
