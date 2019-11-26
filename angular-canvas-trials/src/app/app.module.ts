import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PZDirective } from './directive/pz.directive';
import { ScaleImageUsingMouseComponent } from './scale-image-using-mouse/scale-image-using-mouse.component';
import { ShapeDrawingComponent } from './shape-drawing/shape-drawing.component';
import { ShapeRendererDirective } from './directive/shape-renderer.directive';
import { ImageRendererDirective } from './directive/image-renderer.directive';
import { FabricRendererDirective } from './directive/fabric-renderer.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScaleImageUsingMouseComponent,
    PZDirective,
    ShapeDrawingComponent,
    ShapeRendererDirective,
    ImageRendererDirective,
    FabricRendererDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
