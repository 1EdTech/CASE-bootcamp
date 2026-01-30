-- CreateTable
CREATE TABLE "cf_associations" (
    "identifier" TEXT NOT NULL,
    "associationType" TEXT NOT NULL,
    "sequenceNumber" INTEGER,
    "uri" TEXT NOT NULL,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "originNodeIdentifier" TEXT NOT NULL,
    "destinationNodeIdentifier" TEXT NOT NULL,
    "cfAssociationGroupingIdentifier" TEXT,
    "notes" TEXT,
    "cfDocumentIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_associations_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_association_groupings" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "cfPackageIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_association_groupings_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_concepts" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "keywords" TEXT[],
    "hierarchyCode" TEXT NOT NULL,
    "description" TEXT,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "cfPackageIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_concepts_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_documents" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "frameworkType" TEXT,
    "caseVersion" TEXT,
    "creator" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "officialSourceURL" TEXT,
    "publisher" TEXT,
    "description" TEXT,
    "subject" TEXT[],
    "language" TEXT,
    "version" TEXT,
    "adoptionStatus" TEXT,
    "statusStartDate" TIMESTAMP(3),
    "statusEndDate" TIMESTAMP(3),
    "licenseIdentifier" TEXT,
    "notes" TEXT,
    "cfPackageIdentifier" TEXT NOT NULL,
    "cfPackageUriIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_documents_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_items" (
    "identifier" TEXT NOT NULL,
    "fullStatement" TEXT NOT NULL,
    "alternativeLabel" TEXT,
    "cfItemType" TEXT,
    "uri" TEXT NOT NULL,
    "humanCodingScheme" TEXT,
    "listEnumeration" TEXT,
    "abbreviatedStatement" TEXT,
    "conceptKeywords" TEXT[],
    "notes" TEXT,
    "subject" TEXT[],
    "language" TEXT,
    "educationLevel" TEXT[],
    "statusStartDate" TIMESTAMP(3),
    "statusEndDate" TIMESTAMP(3),
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "licenseURIIdentifier" TEXT,
    "cfItemTypeURIIdentifier" TEXT,
    "cfDocumentIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_items_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_item_types" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hierarchyCode" TEXT NOT NULL,
    "typeCode" TEXT,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "cfPackageIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_item_types_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_licenses" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "licenseText" TEXT NOT NULL,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "cfPackageIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_licenses_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_packages" (
    "identifier" TEXT NOT NULL,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cf_packages_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_rubrics" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "cfPackageIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_rubrics_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_rubric_criteria" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "cfItemIdentifier" TEXT,
    "weight" DOUBLE PRECISION,
    "position" INTEGER,
    "cfRubricIdentifier" TEXT NOT NULL,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cf_rubric_criteria_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_rubric_criterion_levels" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "description" TEXT,
    "quality" TEXT,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,
    "position" INTEGER,
    "rubricCriterionId" TEXT NOT NULL,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cf_rubric_criterion_levels_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_subjects" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hierarchyCode" TEXT NOT NULL,
    "description" TEXT,
    "lastChangeDateTime" TIMESTAMP(3) NOT NULL,
    "cfPackageIdentifier" TEXT NOT NULL,

    CONSTRAINT "cf_subjects_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_link_gen_uris" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetType" TEXT,

    CONSTRAINT "cf_link_gen_uris_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "cf_link_uris" (
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subjectDocumentId" TEXT,
    "keywordItemId" TEXT,
    "licenseItemId" TEXT,
    "subjectItemId" TEXT,

    CONSTRAINT "cf_link_uris_pkey" PRIMARY KEY ("identifier")
);

-- CreateIndex
CREATE UNIQUE INDEX "cf_associations_uri_key" ON "cf_associations"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_association_groupings_uri_key" ON "cf_association_groupings"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_concepts_uri_key" ON "cf_concepts"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_documents_uri_key" ON "cf_documents"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_documents_cfPackageIdentifier_key" ON "cf_documents"("cfPackageIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "cf_documents_cfPackageUriIdentifier_key" ON "cf_documents"("cfPackageUriIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "cf_items_uri_key" ON "cf_items"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_items_cfItemTypeURIIdentifier_key" ON "cf_items"("cfItemTypeURIIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "cf_item_types_uri_key" ON "cf_item_types"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_licenses_uri_key" ON "cf_licenses"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_rubrics_uri_key" ON "cf_rubrics"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_rubric_criteria_uri_key" ON "cf_rubric_criteria"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_rubric_criterion_levels_uri_key" ON "cf_rubric_criterion_levels"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_subjects_uri_key" ON "cf_subjects"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_link_gen_uris_uri_key" ON "cf_link_gen_uris"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "cf_link_uris_uri_key" ON "cf_link_uris"("uri");

-- AddForeignKey
ALTER TABLE "cf_associations" ADD CONSTRAINT "cf_associations_originNodeIdentifier_fkey" FOREIGN KEY ("originNodeIdentifier") REFERENCES "cf_link_gen_uris"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_associations" ADD CONSTRAINT "cf_associations_destinationNodeIdentifier_fkey" FOREIGN KEY ("destinationNodeIdentifier") REFERENCES "cf_link_gen_uris"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_associations" ADD CONSTRAINT "cf_associations_cfAssociationGroupingIdentifier_fkey" FOREIGN KEY ("cfAssociationGroupingIdentifier") REFERENCES "cf_association_groupings"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_associations" ADD CONSTRAINT "cf_associations_cfDocumentIdentifier_fkey" FOREIGN KEY ("cfDocumentIdentifier") REFERENCES "cf_documents"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_association_groupings" ADD CONSTRAINT "cf_association_groupings_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_concepts" ADD CONSTRAINT "cf_concepts_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_documents" ADD CONSTRAINT "cf_documents_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_documents" ADD CONSTRAINT "cf_documents_licenseIdentifier_fkey" FOREIGN KEY ("licenseIdentifier") REFERENCES "cf_licenses"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_documents" ADD CONSTRAINT "cf_documents_cfPackageUriIdentifier_fkey" FOREIGN KEY ("cfPackageUriIdentifier") REFERENCES "cf_link_uris"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_items" ADD CONSTRAINT "cf_items_cfDocumentIdentifier_fkey" FOREIGN KEY ("cfDocumentIdentifier") REFERENCES "cf_documents"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_items" ADD CONSTRAINT "cf_items_licenseURIIdentifier_fkey" FOREIGN KEY ("licenseURIIdentifier") REFERENCES "cf_link_uris"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_items" ADD CONSTRAINT "cf_items_cfItemTypeURIIdentifier_fkey" FOREIGN KEY ("cfItemTypeURIIdentifier") REFERENCES "cf_link_uris"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_item_types" ADD CONSTRAINT "cf_item_types_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_licenses" ADD CONSTRAINT "cf_licenses_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_rubrics" ADD CONSTRAINT "cf_rubrics_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_rubric_criteria" ADD CONSTRAINT "cf_rubric_criteria_cfRubricIdentifier_fkey" FOREIGN KEY ("cfRubricIdentifier") REFERENCES "cf_rubrics"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_rubric_criteria" ADD CONSTRAINT "cf_rubric_criteria_cfItemIdentifier_fkey" FOREIGN KEY ("cfItemIdentifier") REFERENCES "cf_items"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_rubric_criterion_levels" ADD CONSTRAINT "cf_rubric_criterion_levels_rubricCriterionId_fkey" FOREIGN KEY ("rubricCriterionId") REFERENCES "cf_rubric_criteria"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_subjects" ADD CONSTRAINT "cf_subjects_cfPackageIdentifier_fkey" FOREIGN KEY ("cfPackageIdentifier") REFERENCES "cf_packages"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_link_uris" ADD CONSTRAINT "cf_link_uris_subjectDocumentId_fkey" FOREIGN KEY ("subjectDocumentId") REFERENCES "cf_documents"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_link_uris" ADD CONSTRAINT "fk_cf_link_uris_subject_item" FOREIGN KEY ("subjectItemId") REFERENCES "cf_items"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_link_uris" ADD CONSTRAINT "fk_cf_link_uris_keyword_item" FOREIGN KEY ("keywordItemId") REFERENCES "cf_items"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;
