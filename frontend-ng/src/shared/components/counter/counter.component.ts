import { Component } from "@angular/core";

@Component({
    selector: "app-counter",
    template: `
        <button (click)="change(-delta)">-{{delta}}</button>
        <h3>{{value}}</h3>
        <button (click)="change(delta)">+{{delta}}</button>
    `
})
export class Counter{
    value:number = 10;
    delta:number = 1;
    change(delta:number){
        this.value += delta;
    };  
}