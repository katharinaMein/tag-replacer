import {Component} from '@angular/core';
import {ReplacementDefinition} from "./replacement-definition";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'tag-replacer';
  replacementDefinitions: ReplacementDefinition[] = [
    {enabled: true, tag: 'foo', replacement: 'bar'},
    {enabled: true, tag: 'escaping', replacement: 'ERROR'},
    {enabled: true, tag: 'tag', replacement: '{tag}'},
    {enabled: false, tag: 'invalid tags', replacement: 'ERROR'},
  ];

  columnsToDisplay = ['enabled', 'tag', 'replacement'];

  formGroup = new FormGroup({
    inputText: new FormControl(),
    replacementDefinitions: new FormArray([]),
    outputText: new FormControl(),
  });

  constructor() {}

}
