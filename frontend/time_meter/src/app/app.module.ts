import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';


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
import { WeekPickerComponent } from './components/week-picker/week-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ActiveCalendarsComponent,
    TimelineComponent,
    GoalPreviewComponent,
    HeaderComponent,
    WeekPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    InputSwitchModule,
    NgApexchartsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
