function mapSectionAResponseToState(sectiona){
         const mapped = {
            declarationType: sectiona.import_declaration_type, // "B650"
            destinationPortCode: sectiona.destination_port_code, // "BRISBANE"
            ownerName: sectiona.owner_name, // "YANTAI RIMA MACHINERY CO., LTD."
            ownerId: sectiona.owner_id, // "Xibeiyu Industry Zone..."
            ownerReference: sectiona.owner_reference, // null
            biosecurityLocation: sectiona.aqis_inspection_location, // null
            contactHome: sectiona.contact_details?.home || "",
            contactWork: sectiona.contact_details?.work || "",
            contactMobile: sectiona.contact_details?.mobile || "",
            ownerFax: sectiona.contact_details?.fax || "",
            ownerEmail: sectiona.contact_details?.email || "",
            invoiceTermType: sectiona.invoice_term_type, // "FOB"
            valuationDate: sectiona.valuation_date, // "2025-03-05"
            headerValuationAdviceNumber: sectiona.header_valuation_advice_number, // null
            eftPayment: "NO", // hardcoded since not in source
            valuation: {
              invoiceTotal: sectiona.valuation_elements?.invoice_total || "",
              overseasFreight: sectiona.valuation_elements?.overseas_freight || "",
              overseasInsurance: sectiona.valuation_elements?.overseas_insurance || "",
              packingCosts: sectiona.valuation_elements?.packing_costs || "",
              foreignInlandFreight: sectiona.valuation_elements?.foreign_inland_freight || "",
              landingCharges: sectiona.valuation_elements?.landing_charges || "",
              transportAndInsurance: sectiona.valuation_elements?.transport_and_insurance || "",
              freeOnBoard: sectiona.valuation_elements?.free_on_board || "",
              costInsuranceFreight: sectiona.valuation_elements?.cost_insurance_freight || "",
              currency: "AUD", // fixed as per target schema
            },
            paidUnderProtest: sectiona.paid_under_protest === "Yes",
            protestReason: sectiona.amber_statement_reason || "",
            amberStatement: sectiona.amber_statement_reason || "",
            declarationSigner: sectiona.declaration_signature, // "BRADLEY THOMAS"
            declarationDate: sectiona.valuation_date, // mapped to same date unless another field exists
          }
        return mapped;
}

export default mapSectionAResponseToState;