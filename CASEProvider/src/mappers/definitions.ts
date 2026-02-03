export function mapAssociationGrouping(record: any) {
  return {
    identifier: record.identifier,
    uri: record.uri,
    title: record.title,
    description: record.description,
    lastChangeDateTime: record.lastChangeDateTime.toISOString(),
  };
}

export function mapConcepts(records: any[]) {
  return {
    CFConcepts: records.map(mapConcept),
  };
}

export function mapConcept(record: any) {
  return {
    identifier: record.identifier,
    uri: record.uri,
    title: record.title,
    keywords: record.keywords,
    hierarchyCode: record.hierarchyCode,
    description: record.description,
    lastChangeDateTime: record.lastChangeDateTime.toISOString(),
  };
}

export function mapSubjects(records: any[]) {
  return {
    CFSubjects: records.map(mapSubject),
  };
}

export function mapSubject(record: any) {
  return {
    identifier: record.identifier,
    uri: record.uri,
    title: record.title,
    hierarchyCode: record.hierarchyCode,
    description: record.description,
    lastChangeDateTime: record.lastChangeDateTime.toISOString(),
  };
}

export function mapLicense(record: any) {
  return {
    identifier: record.identifier,
    uri: record.uri,
    title: record.title,
    description: record.description,
    licenseText: record.licenseText,
    lastChangeDateTime: record.lastChangeDateTime.toISOString(),
  };
}

export function mapItemTypes(records: any[]) {
  return {
    CFItemTypes: records.map(mapItemType),
  };
}

export function mapItemType(record: any) {
  return {
    identifier: record.identifier,
    uri: record.uri,
    hierarchyCode: record.hierarchyCode,
    title: record.title,
    description: record.description,
    typeCode: record.typeCode,
    lastChangeDateTime: record.lastChangeDateTime.toISOString(),
  };
}
