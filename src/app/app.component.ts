import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {ReplacementDefinition} from "./replacement-definition";
import {MatTable} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {ReplacementService} from "./replacement.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  @ViewChild(MatTable) table!: MatTable<ReplacementDefinition>;
  @ViewChild('form') form!: NgForm;

  columnsToDisplay = ['enabled', 'tag', 'replacement'];

  tableData: ReplacementDefinition[] = [
    {enabled: true, tag: 'foo', replacement: 'bar'},
    {enabled: true, tag: 'escaping', replacement: 'ERROR'},
    {enabled: true, tag: 'tag', replacement: '{tag}'}
  ];

  constructor(private replacementService: ReplacementService) {}

  onAddRow() {
    this.tableData = [...this.tableData, {enabled: false, tag: '', replacement: ''}];
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
    if (this.areAllRowsEnabled()) {
      this.tableData = this.setTableRows({enabled: false});
    } else if (!this.areAllRowsEnabled() || this.areOnlySomeRowsEnabled()) {
      this.tableData = this.setTableRows({enabled: true});
    }
  }

  areAllRowsEnabled(): boolean {
    return this.tableData?.every(value => value.enabled === true);
  }

  areOnlySomeRowsEnabled(): boolean {
    return this.tableData?.some(value => value.enabled) && this.tableData?.some(value => !value.enabled);
  }

  areAnyRowsEnabled(): boolean {
    return this.tableData?.some(value => value.enabled);
  }

  private setTableRows(update: Partial<ReplacementDefinition>) {
    return this.tableData.map(row => ({...row, ...update}));
  }
}

