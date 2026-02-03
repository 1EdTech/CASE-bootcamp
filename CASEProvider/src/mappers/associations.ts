export function mapAssociation(record: any) {
    const association: any = {
        identifier: record.identifier,
        associationType: record.associationType,
        sequenceNumber: record.sequenceNumber,
        uri: record.uri,
        originNodeURI: {
            title: record.originNode.title,
            identifier: record.originNode.identifier,
            uri: record.originNode.uri,
            targetType: record.originNode.targetType,
        },
        destinationNodeURI: {
            title: record.destinationNode.title,
            identifier: record.destinationNode.identifier,
            uri: record.destinationNode.uri,
            targetType: record.destinationNode.targetType,
        },
        lastChangeDateTime: record.lastChangeDateTime.toISOString(),
        notes: record.notes,
    }

    if (record.cfAssociationGrouping) {
        association.CFAssociationGroupingURI = {
            title: record.cfAssociationGrouping.title,
            identifier: record.cfAssociationGrouping.identifier,
            uri: record.cfAssociationGrouping.uri,
        }
    }

    if (record.cfDocument) {
        association.CFDocumentURI = {
            title: record.cfDocument.title,
            identifier: record.cfDocument.identifier,
            uri: record.cfDocument.uri,
        }
    }

    return association;
}