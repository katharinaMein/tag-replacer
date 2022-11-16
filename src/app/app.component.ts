import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReplacementDefinition} from "./replacement-definition";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'tag-replacer';

  tableData: ReplacementDefinition[] = [
    {enabled: true, tag: 'foo', replacement: 'bar'},
    {enabled: true, tag: 'escaping', replacement: 'ERROR'},
    {enabled: true, tag: 'tag', replacement: '{tag}'},
    {enabled: false, tag: 'invalid tags', replacement: 'ERROR'},
  ];

  columnsToDisplay = ['enabled', 'tag', 'replacement'];

  form = new FormGroup({
    inputText: new FormControl(),
    replacementDefinitions: new FormArray(this.tableData.map(val => new FormGroup({
      enabled: new FormControl(val.enabled),
      tag: new FormControl(val.tag),
      replacement: new FormControl(val.replacement),
    }))),
    outputText: new FormControl(),
  });

  constructor() {}

  pause() {
    debugger;
  }
}
