function mapImportDeclarationSectionAToApiPayload(sectionA) {
  return {
    import_declaration_type: sectionA.declarationType || null,
    owner_name: sectionA.ownerName || null,
    owner_id: sectionA.ownerId || null,
    owner_reference: sectionA.ownerReference || null,
    aqis_inspection_location: sectionA.biosecurityLocation || null,
    contact_details: {
      home: sectionA.contactHome || null,
      work: sectionA.contactWork || null,
      mobile: sectionA.contactMobile || null,
      fax: sectionA.ownerFax || null,
      email: sectionA.ownerEmail || null
    },
    destination_port_code: sectionA.destinationPortCode || null,
    invoice_term_type: sectionA.invoiceTermType || null,
    valuation_date: sectionA.valuationDate || null,
    header_valuation_advice_number: sectionA.headerValuationAdviceNumber || null,
    valuation_elements: {
      invoice_total: sectionA.valuation?.invoiceTotal || null,
      overseas_freight: sectionA.valuation?.overseasFreight || null,
      overseas_insurance: sectionA.valuation?.overseasInsurance || null,
      packing_costs: sectionA.valuation?.packingCosts || null,
      foreign_inland_freight: sectionA.valuation?.foreignInlandFreight || null,
      landing_charges: sectionA.valuation?.landingCharges || null,
      transport_and_insurance: sectionA.valuation?.transportAndInsurance || null,
      free_on_board: sectionA.valuation?.freeOnBoard || null,
      cost_insurance_freight: sectionA.valuation?.costInsuranceFreight || null,
      currency: sectionA.valuation?.currency || "AUD"
    },
    fob_or_cif: sectionA.invoiceTermType || null,
    paid_under_protest: sectionA.paidUnderProtest ? "Yes" : "No",
    amber_statement_reason: sectionA.amberStatement || null,
    declaration_signature: sectionA.declarationSigner || null
  };
}

export default mapImportDeclarationSectionAToApiPayload;
