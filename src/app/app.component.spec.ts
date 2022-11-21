import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReplacementDefinition} from "./replacement-definition";

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NoopAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatDividerModule,
        MatButtonModule,
        MatTableModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Tag Replacer');
  });

  describe('Replacing Tag Logic', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    })

    it("should replace text of the assertment task", () => {
      const inputText = "This text contains some {foo} tags that will be replaced. It supports \\{escaping} and it ignores {unknown} tags. A literal backslash can be written as well: \\\\\n" +
        "Wild \\backslashes are removed. Even in front of a \\\\\\\\{tag}";
      const expectedOutput = "This text contains some bar tags that will be replaced. It supports {escaping} and it ignores {unknown} tags. A literal backslash can be written as well: \\\n" +
        "Wild backslashes are removed. Even in front of a \\\\{tag}";

      component.form.controls["inputText"].setValue(inputText);
      component.onReplace();

      expect(component.form.controls["outputText"].value).toBe(expectedOutput);
    })

    it("should replace multiple occurrences of same tag", () => {
      const inputText = "{foo} {foo} {foo}";
      const expectedOutput = "bar bar bar";

      component.form.controls["inputText"].setValue(inputText);
      component.onReplace();

      expect(component.form.controls["outputText"].value).toBe(expectedOutput);
    })

    it("should remove wild backslashes", () => {
      const inputText = "\\text \\ text\\ text\\text \\ \\";
      const expectedOutput = "text  text texttext  ";

      component.form.controls["inputText"].setValue(inputText);
      component.onReplace();

      expect(component.form.controls["outputText"].value).toBe(expectedOutput);
    })

    it("should escape backslashes in front of tags", () => {
      const inputText = "\\{escaping} \\\\{escaping}";
      const expectedOutput = "{escaping} \\ERROR";

      component.form.controls["inputText"].setValue(inputText);
      component.onReplace();

      expect(component.form.controls["outputText"].value).toBe(expectedOutput);
    })

    it('should log no error when tags are empty', () => {
      const inputText = 'Some text\\\\';
      const expectedOutput = 'Some text\\';
      const emptyTags: ReplacementDefinition[] = [];

      component.form.controls['inputText'].setValue(inputText);
      component.tableData = emptyTags;
      component.onReplace();

      expect(component.form.controls['outputText'].value).toBe(expectedOutput);
    })
  })
})


// tests für add row
// remove rows - disbale remove button when no rows enabled
// only enabled rows replace
// validation
// checkAllCheckbox checked wenn alle Checkboxen checked
