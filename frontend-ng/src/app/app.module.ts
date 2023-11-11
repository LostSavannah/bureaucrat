import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/components/shared.module';
import { EmptyComponent } from './shared/components/empty/empty.component';
import { BasicComponent } from './shared/components/basic/basic.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    BasicComponent
  ],
  imports: [
    BrowserModule, SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
