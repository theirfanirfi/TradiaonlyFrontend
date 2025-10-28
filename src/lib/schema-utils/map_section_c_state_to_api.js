function reverseMapSectionC(payload) {
  return {
    quantity: payload.quantity || "",
    cif_value: payload.priceType === "CIF" ? payload.priceAmount : "",
    fob_value: payload.priceType === "FOB" ? payload.priceAmount : "",
    customs_value: payload.priceType === "CUSTOMS" ? payload.priceAmount : "",
    unit_of_measure: payload.unit || "",
    country_of_origin: payload.originCountry || "",
    goods_description: payload.goodsDescription || "",
    tariff_instrument: payload.instrumentType1 || "",
    origin_country_code: payload.preferenceOriginCountry || "",
    preference_rule_type: payload.preferenceRuleType || "",
    tariff_classification: payload.tariffClassificationNumber || null,
    additional_information: payload.additionalInformation || "",
    preference_scheme_type: payload.preferenceSchemeType || null,
    tariff_classification_code: payload.tariffClassificationNumber || "",
    // keeping the extra fields from payload as passthrough
    supplier_id: payload.supplierId || "",
    supplier_name: payload.supplierName || "",
    vendor_id: payload.vendorId || "",
    stat_code: payload.statCode || "",
    valuation_basis_type: payload.valuationBasisType || "",
    treatment_code: payload.treatmentCode || "",
    gst_exemption_code: payload.gstExemptionCode || "",
    establishment_code: payload.establishmentCode || "",
    price_type: payload.priceType || "",
    price_amount: payload.priceAmount || "",
    price_currency: payload.priceCurrency || "",
    permit_number: payload.permitNumber || "",
    preference_origin_country: payload.preferenceOriginCountry || "",
    instrument_type1: payload.instrumentType1 || "",
    instrument_number1: payload.instrumentNumber1 || "",
    instrument_type2: payload.instrumentType2 || "",
    instrument_number2: payload.instrumentNumber2 || "",
    producer_code: payload.producerCode || ""
  };
}


export default reverseMapSectionC;