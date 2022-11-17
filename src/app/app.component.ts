import {Component, ViewChild} from '@angular/core';
import {ReplacementDefinition} from "./replacement-definition";
import {MatTable} from "@angular/material/table";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  @ViewChild(MatTable) table!: MatTable<ReplacementDefinition>;

  title = 'tag-replacer';
  columnsToDisplay = ['enabled', 'tag', 'replacement'];
  @ViewChild('form') form!: NgForm;
  userInputText: string = '';
  checked: boolean = true;

  tableData: ReplacementDefinition[] = [
    {enabled: false, tag: 'eins', replacement: ''},
    {enabled: true, tag: 'zwei', replacement: ''},
    {enabled: false, tag: 'drei', replacement: ''},
    {enabled: false, tag: 'vier', replacement: ''},
  ];

  constructor() {
  }

  onPause() {
    debugger;
  }

  onAddRow() {
    this.tableData.push({
      enabled: false, tag: '', replacement: ''
    });
    this.table.renderRows();
  }

  onReplace(){
    this.userInputText = this.form.controls['inputText'].value;
  }

  onRemove(){
    this.tableData = this.tableData.filter(val => !val.enabled);
  }

  onToggleCheckAll(){
    if(!this.form.controls['checkAll'].value){
      this.tableData.forEach(element => {
        element.enabled = true;
      })
    }else{
      this.tableData.forEach(element => {
        element.enabled = false;
      })
    }
    this.table.renderRows();
  }

}
