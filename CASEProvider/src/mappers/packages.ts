import { mapAssociation } from "./associations";
import { mapAssociationGrouping, mapConcept, mapItemType, mapLicense, mapSubject } from "./definitions";
import { mapDocument } from "./documents";
import { mapItem } from "./items";
import { mapRubric } from "./rubrics";

export function mapPackage(record: any) {
    return {
        CFDocument: mapDocument(record.document),
        CFItems: record.document.cfItems.map(mapItem),
        CFAssociations: record.document.cfAssociations.map(mapAssociation),
        CFDefinitions: {
            CFConcepts: record.cfConcepts.map(mapConcept),
            CFSubjects: record.cfSubjects.map(mapSubject),
            CFLicenses: record.cfLicenses.map(mapLicense),
            CFItemTypes: record.cfItemTypes.map(mapItemType),
            CFAssociationGroupings: record.cfAssociationGroupings.map(mapAssociationGrouping)
        },
        CFRubrics: record.cfRubrics.map(mapRubric),
    }
}