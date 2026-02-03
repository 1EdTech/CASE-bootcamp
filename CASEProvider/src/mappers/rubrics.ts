export function mapRubric(record: any) {
    return {
        identifier: record.identifier,
        uri: record.uri,
        title: record.title,
        description: record.description,
        lastChangeDateTime: record.lastChangeDateTime.toISOString(),
        CFRubricCriteria: record.cfRubricCriteria.map(mapRubricCriteria),
    }
}

export function mapRubricCriteria(record: any) {
    let rubricCriteria: any = {
        identifier: record.identifier,
        uri: record.uri,
        title: record.title,
        description: record.description,
        weight: record.weight,
        position: record.position,
        rubricId: record.cfRubric.identifier,
        lastChangeDateTime: record.lastChangeDateTime.toISOString(),
        CFRubricCriterionLevels: record.CFRubricCriterionLevels.map(mapRubricCriterionLevel)
    }

    if (record.cfItem) {
        rubricCriteria.CFItemURI = {
            identifier: record.cfItem.identifier,
            uri: record.cfItem.uri,
            title: record.cfItem.title,
        }
    }
    return rubricCriteria;
}


export function mapRubricCriterionLevel(record: any) {
}