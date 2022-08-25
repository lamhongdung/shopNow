import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    collapsed = true;

    constructor() { }

    ngOnInit(): void {

    }

    // show menu when click on the 3-dash button
    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
}
