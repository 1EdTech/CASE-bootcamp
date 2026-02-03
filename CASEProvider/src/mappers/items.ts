export function mapItem(record: any) {
    let item : any = {
        identifier: record.identifier,
        uri: record.uri,
        fullStatement: record.fullStatement,
        alternativeLabel: record.alternativeLabel,
        CFItemType: record.CFItemType,
        humanCodingScheme: record.humanCodingScheme,
        listEnumeration: record.listEnumeration,
        abbreviatedStatement: record.abbreviatedStatement,
        conceptKeywords: record.conceptKeywords,
        notes: record.notes,
        subject: record.subject,
        language: record.language,
        educationalLevel: record.educationalLevel,
        statusStartDate: record.statusStartDate ? record.statusStartDate.toISOString() : null,
        statusEndDate: record.statusEndDate ? record.statusEndDate.toISOString() : null,
        lastChangeDateTime: record.lastChangeDateTime.toISOString(),
        CFDocumentURI: {
            identifier: record.cfDocument?.identifier,
            uri: record.cfDocument?.uri,
            title: record.cfDocument?.title,
        }
    };

    if (record.subjectURI) {
        item.subjectURI = record.subjectURI.map((subj: any) => ({
            identifier: subj.identifier,
            uri: subj.uri,
            title: subj.title,
        }));
    }

    if (record.conceptKeywordsURI) {
        item.conceptKeywordsURI = record.conceptKeywordsURI.map((subj: any) => ({
            identifier: subj.identifier,
            uri: subj.uri,
            title: subj.title,
        }));
    }

    if (record.cfItemTypeUri) {
        item.CFItemTypeURI = {
            identifier: record.cfItemTypeUri.identifier,
            uri: record.cfItemTypeUri.uri,
            title: record.cfItemTypeUri.title,
        };
    }

    if (record.licenseURI) {
        item.licenseURI = {
            identifier: record.licenseURI.identifier,
            uri: record.licenseURI.uri,
            title: record.licenseURI.title,
        };
    }

    return item;
}