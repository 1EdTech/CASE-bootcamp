import { mapAssociation } from "./associations";
import { mapAssociationGrouping, mapConcepts, mapItemTypes, mapSubjects } from "./definitions";
import { mapDocument } from "./documents";
import { mapItem } from "./items";

export function mapPackage(record: any) {
    return {
        CFDocument: mapDocument(record.cfDocument),
        CFItems: record.cfItems.map(mapItem),
        CFAssociations: record.cfAssociations.map(mapAssociation),
        CFDefinitions: {
            CFConcepts: mapConcepts(record.cfConcepts),
            CFSubjects: mapSubjects(record.cfSubjects),
            CFLicenses: mapSubjects(record.cfLicenses),
            CFItemTypes: mapItemTypes(record.cfItemTypes),
            CFAssociationGroupings: record.cfAssociationGroupings.map(mapAssociationGrouping)
        },
        CFRubrics: {

        }

    }
}