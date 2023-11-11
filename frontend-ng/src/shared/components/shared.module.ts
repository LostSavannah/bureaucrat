import { NgModule } from "@angular/core";
import { Counter } from "./counter/counter.component";

@NgModule({
    declarations: [Counter],
    exports: [Counter],
    imports: [],
    providers: [],
    bootstrap: []
})
export class SharedModule{}