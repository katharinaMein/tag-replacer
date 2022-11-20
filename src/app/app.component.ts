import {Component, ViewChild} from '@angular/core';
import {ReplacementDefinition} from "./replacement-definition";
import {MatTable} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {ReplacementService} from "./replacement.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  @ViewChild(MatTable) table!: MatTable<ReplacementDefinition>;
  @ViewChild('form') form!: NgForm;

  title = 'tag-replacer';
  columnsToDisplay = ['enabled', 'tag', 'replacement'];

  tableData: ReplacementDefinition[] = [
    {enabled: true, tag: 'foo', replacement: 'bar'},
    {enabled: true, tag: 'escaping', replacement: 'ERROR'},
    {enabled: true, tag: 'tag', replacement: '{tag}'}
  ];

  constructor(private replacementService: ReplacementService) {
  }

  onAddRow() {
    this.tableData.push({
      enabled: false, tag: '', replacement: ''
    });
    this.table.renderRows();
  }

  onReplace() {
    const userInputText = this.form.controls['inputText'].value;
    const outputText = this.replacementService.replace(userInputText, this.tableData);
    this.form.controls["outputText"].setValue(outputText);
  }

  onRemove() {
    this.tableData = this.tableData.filter(val => !val.enabled);
  }

  onToggleCheckAll() {
    if (!this.form.controls['checkAll'].value) {
      this.tableData.forEach(element => {
        element.enabled = true;
      })
    } else {
      this.tableData.forEach(element => {
        element.enabled = false;
      })
    }
    this.table.renderRows();
  }
}

