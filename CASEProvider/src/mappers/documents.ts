export function mapDocuments(records: any[]) {
  return {
    CFDocuments: records.map(mapDocument),
  };
}

export function mapDocument(record: any) {
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
    CFPackage: {
      identifier: record.cfPackage?.identifier,
      uri: record.cfPackage?.uri,
      title: record.cfPackage?.title,
    },
  };
  if (record.cfLicense) {
    document.licenseURI = {
      identifier: record.cfLicense.identifier,
      uri: record.cfLicense.uri,
      title: record.cfLicense.title,
    };
  }
  if (record.subjects) {
    document.SubjectURI = record.subjects.map((subject: any) => ({
      identifier: subject.identifier,
      uri: subject.uri,
      title: subject.title,
    }));
  }
  return document;
}
