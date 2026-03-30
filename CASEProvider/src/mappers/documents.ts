export function mapDocuments(records: any[], selectedFields?: string[]) {
  return {
    CFDocuments: records.map(record => mapDocument(record, selectedFields)),
  };
}

export function mapDocument(record: any, selectedFields?: string[]) {
  if (!selectedFields || selectedFields.length === 0) {
    let document: any = {
      identifier: record.identifier,
      uri: record.uri,
      frameworkType: record.frameworkType,
      caseVersion: record.caseVersion,
      creator: record.creator,
      title: record.title,
      lastChangeDateTime: record.lastChangeDateTime.toISOString(),
      officialSourceUrl: record.officialSourceUrl,
      publisher: record.publisher,
      description: record.description,
      subject: record.subject,
      language: record.language,
      version: record.version,
      adoptionStatus: record.adoptionStatus,
      statusStartDate: record.statusStartDate
        ? record.statusStartDate.toISOString()
        : null,
      statusEndDate: record.statusEndDate
        ? record.statusEndDate.toISOString()
        : null,
      notes: record.notes,
      CFPackageURI: {
        identifier: record.packageUri?.identifier,
        uri: record.packageUri?.uri,
        title: record.packageUri?.title,
      },
    };
    if (record.cfLicense) {
      document.licenseURI = {
        identifier: record.cfLicense.identifier,
        uri: record.cfLicense.uri,
        title: record.cfLicense.title,
      };
    }
    if (record.subjects && record.subjects.length > 0) {
      document.SubjectURI = record.subjects.map((subject: any) => ({
        identifier: subject.identifier,
        uri: subject.uri,
        title: subject.title,
      }));
    }
    return document;
  } else {
    const document: any = {};
    if (selectedFields.includes('identifier')) {
      document.identifier = record.identifier;
    }
    if (selectedFields.includes('uri')) {
      document.uri = record.uri;
    }
    if (selectedFields.includes('frameworkType')) {
      document.frameworkType = record.frameworkType;
    }
    if (selectedFields.includes('caseVersion')) {
      document.caseVersion = record.caseVersion;
    }
    if (selectedFields.includes('creator')) {
      document.creator = record.creator;
    }
    if (selectedFields.includes('title')) {
      document.title = record.title;
    }
    if (selectedFields.includes('lastChangeDateTime')) {
      document.lastChangeDateTime = record.lastChangeDateTime.toISOString();
    }
    if (selectedFields.includes('officialSourceUrl')) {
      document.officialSourceUrl = record.officialSourceUrl;
    }
    if (selectedFields.includes('publisher')) {
      document.publisher = record.publisher;
    }
    if (selectedFields.includes('description')) {
      document.description = record.description;
    }
    if (selectedFields.includes('subject')) {
      document.subject = record.subject;
    }
    if (selectedFields.includes('language')) {
      document.language = record.language;
    }
    if (selectedFields.includes('version')) {
      document.version = record.version;
    }
    if (selectedFields.includes('adoptionStatus')) {
      document.adoptionStatus = record.adoptionStatus;
    }
    if (selectedFields.includes('statusStartDate')) {
      document.statusStartDate = record.statusStartDate
        ? record.statusStartDate.toISOString()
        : null;
    }
    if (selectedFields.includes('statusEndDate')) {
      document.statusEndDate = record.statusEndDate
        ? record.statusEndDate.toISOString()
        : null;
    }
    if (selectedFields.includes('notes')) {
      document.notes = record.notes;
    }
    if (selectedFields.includes('CFPackageURI')) {
      document.CFPackageURI = {
        identifier: record.packageUri?.identifier,
        uri: record.packageUri?.uri,
        title: record.packageUri?.title,
      };
    }
    if (selectedFields.includes('licenseURI') && record.cfLicense) {
      document.licenseURI = {
        identifier: record.cfLicense.identifier,
        uri: record.cfLicense.uri,
        title: record.cfLicense.title,
      };
    }
    if (selectedFields.includes('SubjectURI') && record.subjects && record.subjects.length > 0) {
      document.SubjectURI = record.subjects.map((subject: any) => ({
        identifier: subject.identifier,
        uri: subject.uri,
        title: subject.title,
      }));
    }
    return document;
  }
}
