import { Icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";

export class GameChoice {
    constructor(public name: string, public imageUrl: string, public winsAgainst: string[], public losesTo: string[], public icon: IconDefinition) {}
    
}