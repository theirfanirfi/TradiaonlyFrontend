function mapSectionB(section_b) {
  // Base common mapping
  let mapped = {
    modeOfTransport: section_b.mode_of_transport || "OTHER",
    lineNumber: section_b.line_number || "",

    // Common
    loadingPort: section_b.loading_port || "",
    firstArrivalPort: section_b.first_arrival_port || "",
    dischargePort: section_b.discharge_port || "",
    firstArrivalDate: section_b.first_arrival_date || "",
    grossWeight: section_b.gross_weight || "",
    grossWeightUnit: section_b.gross_weight_unit
      ? section_b.gross_weight_unit.toUpperCase()
      : "KG",
    numberOfPackages: section_b.number_of_packages || "",
    marksNumbersDescription: section_b.marks_numbers_description || "",

    // Delivery address (default/empty)
    deliveryName: "",
    deliveryAddress: "",
    deliveryLocality: "",
    deliveryState: "",
    deliveryCountry: "AUSTRALIA",
    deliveryPostcode: "",
    deliveryContactPhone: "",
  };

  // SEA specific
  if (section_b.mode_of_transport === "SEA") {
    return {
      ...mapped,
      vesselName: section_b.vessel_name || "",
      vesselId: section_b.vessel_id || "",
      voyageNumber: section_b.voyage_number || "",
      cargoType: section_b.cargo_type || "",
      containerNumber: section_b.container_number || "",
      oceanBillOfLading:
        section_b.ocean_bill_of_lading_no && section_b.ocean_bill_of_lading_no !== "NULL"
          ? section_b.ocean_bill_of_lading_no
          : "",
      houseBillOfLading: section_b.house_bill_of_lading_no || "",
    };
  }

  // AIR specific
  if (section_b.mode_of_transport === "AIR") {
    return {
      ...mapped,
      airlineCode: section_b.airline_code || "",
      masterAirWaybill: section_b.master_air_waybill || "",
      houseAirWaybill: section_b.house_air_waybill || "",
    };
  }

  // POST specific
  if (section_b.mode_of_transport === "POST") {
    return {
      ...mapped,
      parcelPostCardNumbers: section_b.parcel_post_card_numbers || "",
    };
  }

  // OTHER specific
  return {
    ...mapped,
    departmentReceiptForGoodsNumber:
      section_b.department_receipt_for_goods_number || "",
  };
}

export default mapSectionB;