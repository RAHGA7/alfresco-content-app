import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aca-gva-search-result',
  templateUrl: './gva-search-result.component.html',
  styleUrls: ['./gva-search-result.component.scss']
})
export class GvaSearchResultComponent implements OnInit {
@Input() searchResults:any
  constructor() { }

  ngOnInit(): void {
  }

}
