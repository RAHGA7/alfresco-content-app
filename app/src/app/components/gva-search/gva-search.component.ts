/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageComponent } from '../page.component';
import { AppExtensionService } from '@alfresco/aca-shared';
import { AppStore } from '@alfresco/aca-shared/store';
import { ContentManagementService } from '../../services/content-management.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from "@alfresco/adf-core";
import { QueryBody } from '@alfresco/js-api';

@Component({
  templateUrl: './gva-search.component.html',
  styleUrls : ['./gva-search.component.scss']
})
export class GvaSearchComponent extends PageComponent  implements OnInit, OnDestroy {
  searchResults = null;
  SearchTypes:any;
  searchForm:FormGroup;
  selectedOptions:string;
  searchContext: string;
  constructor(
    private searchService: SearchService,
    store: Store<AppStore>,
    extensions: AppExtensionService,
    content: ContentManagementService,
   ) {
    super(store, extensions, content);
  }

  ngOnInit() {
    this.generateForm();
    this.SearchTypes=[{key:'Form', value:'Form'},
                      {key:'GAC', value:'GAC'},
                      {key:'Participant', value:'Participant'},
                      {key:'Plan', value:'Plan'},
                      {key:'System', value:'System'}]
  }


  generateForm(){
      this.searchForm = new FormGroup({
      searchType: new FormControl(),
      formName: new FormControl(),
      formNum: new FormControl(),
      gacNum: new FormControl(),
      gacName: new FormControl(),
      gacDocType: new FormControl(),
      lastName: new FormControl(),
      SSN: new FormControl(),
      employerID: new FormControl(),
      planName: new FormControl(),
      planNum: new FormControl(),
      jobNum: new FormControl(),

      })
  }
  changeSearchType(event: any){
this.selectedOptions = event.target.value;
this.searchContext="";
  }

  Submit(){
    this.searchContext="";

    let  searchTypeValue = this.searchForm.get('searchType').value;
    this.searchContext +="rps:docClassName:'"+searchTypeValue+"'";
   // let  searchQuery =`rps:docClassName:'Form' AND rps:formName:'form name' AND rps:formNum:'12345'` ;

    if(this.selectedOptions =='Form'){

    let  formNumberValue = this.searchForm.get('formNum').value;
    let formNameValue = this.searchForm.get('formName').value;
    this.searchContext +=" AND rps:formName:'"+ formNameValue+"' AND rps:formNum:'"+ formNumberValue+"'" ;
    } else if(this.selectedOptions =='GAC'){

        let gacNum =this.searchForm.get('gacNum').value;
      let  gacName = this.searchForm.get('gacName').value;
       let gacDocType = this.searchForm.get('gacDocType').value;
       this.searchContext +=" AND rps:gacName:'"+ gacName+"' AND rps:gacNum:'"+ gacNum+"' AND rps:gacDocType:'"+ gacDocType+"'" ;

    }  else if(this.selectedOptions =='Participant'){

       let lastName = this.searchForm.get('lastName').value;
      let  SSN = this.searchForm.get('SSN').value;

      this.searchContext +=" AND lfg:lastName:'"+ lastName+"' AND lfg:SSN:'"+ SSN+"'" ;
    } else if(this.selectedOptions =='Plan'){

       let employerID = this.searchForm.get('employerID').value;
       let planName = this.searchForm.get('planName').value;
       let planNum = this.searchForm.get('planNum').value;

       this.searchContext +=" AND rps:employerID:'"+ employerID+"' AND rps:planName:'"+ planName+"' AND rps:planNum:'"+ planNum+"'" ;
    } else if(this.selectedOptions =='System'){
       let jobNumber = this.searchForm.get('jobNumber').value
      this.searchContext +=" AND rps:jobNumber:'"+ jobNumber+"'" ;
    }
this.getSearchData();
  }

  resetForm(){
    this.selectedOptions="";
    this.searchForm.reset();
    this.searchResults=[];
  }
  getSearchData() {
    let  query =`cm:name:'Sample text%'`;
    const requestBody: QueryBody = {
      query: {
        query: query,
        language: "afts",
      },
      include: ["path", "properties", "allowableOperations"],
      paging: {
        maxItems: 500
      },
    };

    this.searchService.searchByQueryBody(requestBody).subscribe(
      (response) => {
        this.searchResults = [];
        for (var entry of response.list.entries) {
          this.searchResults.push({
            id: entry.entry.id,
            name: entry.entry.name,
            createdAt: entry.entry.createdAt,
            createdByUser: entry.entry.createdByUser,
            modifiedAt: entry.entry.modifiedAt,
            modifiedByUser: entry.entry.modifiedByUser,
          });
        }
        }
    );
  }

  ngOnDestroy() {
    this.searchContext="";
    this.searchForm.reset();

  }


}


