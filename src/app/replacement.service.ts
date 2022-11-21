import {Injectable} from '@angular/core';
import {ReplacementDefinition} from "./replacement-definition";

@Injectable({
  providedIn: 'root'
})
export class ReplacementService {

  replace(userInputText: string, replacementDefinitions: ReplacementDefinition[] ){
    const tagsInRegex = replacementDefinitions
      .filter(replacementDefinition => replacementDefinition.enabled)
      .map(replacementDefinition => `{${replacementDefinition.tag}}`)
      .join("|");
    const tagsIfAny = tagsInRegex === "" ? "([])" : `(${tagsInRegex})`;
    const outputText = userInputText.replace(new RegExp( `([^\\\\])?${tagsIfAny}|(\\\\\\\\)|(\\\\[^\\\\]?)`, "g"),
      (match: string, cgOptionalCharBeforeTag = "", cgTag?: string, cgDoubleBackslash?: string, cgWildBackslash?: string) => {
        // cg = capture group
        if(match === "\\\\") {
          return "\\";
        }
        if(cgWildBackslash !== undefined) {
          return cgWildBackslash.replace(/\\/g, "");
        }

        const tagReplacement = replacementDefinitions.find(replacementDefinition => `{${replacementDefinition.tag}}` === cgTag)?.replacement;
        return cgOptionalCharBeforeTag + (tagReplacement ?? "");
      });

    return outputText;
  }
}


