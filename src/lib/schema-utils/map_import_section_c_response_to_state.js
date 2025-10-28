function mapSectionC(section_c) {
  return {
    goodsDescription: section_c.goods_description || "",
    supplierId: "", // not in source
    supplierName: "", // not in source
    vendorId: "", // not in source
    tariffClassificationNumber: section_c.tariff_classification_code || section_c.tariff_classification || "",
    statCode: "", // not in source
    valuationBasisType: section_c.cif_value ? "CIF" : (section_c.fob_value ? "FOB" : ""),
    treatmentCode: "", // not in source
    gstExemptionCode: "", // not in source
    establishmentCode: "", // not in source
    priceType: section_c.cif_value ? "CIF" : (section_c.fob_value ? "FOB" : "CUSTOMS"),
    priceAmount: section_c.cif_value || section_c.fob_value || section_c.customs_value || "",
    priceCurrency: "AUD", // fixed
    quantity: section_c.quantity || "",
    unit: section_c.unit_of_measure || "",
    permitNumber: "", // not in source
    originCountry: section_c.country_of_origin || section_c.origin_country_code || "",
    preferenceOriginCountry: section_c.origin_country_code || "",
    preferenceSchemeType: section_c.preference_scheme_type || "",
    preferenceRuleType: section_c.preference_rule_type || "",
    instrumentType1: section_c.tariff_instrument || "",
    instrumentNumber1: "", // not in source
    instrumentType2: "", // not in source
    instrumentNumber2: "", // not in source
    additionalInformation: section_c.additional_information || "",
    producerCode: "", // not in source
  };
}

export default mapSectionC;