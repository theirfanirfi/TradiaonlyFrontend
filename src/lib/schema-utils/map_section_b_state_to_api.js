function reverseMapSectionB(SECTIONB) {
  let section_b = {
    // SEA specific
    vessel_id: SECTIONB.vesselId || "",
    cargo_type: SECTIONB.cargoType || "",
    line_number: SECTIONB.lineNumber || "",
    vessel_name: SECTIONB.vesselName || "",
    gross_weight: SECTIONB.grossWeight || "",
    loading_port: SECTIONB.loadingPort || "",
    voyage_number: SECTIONB.voyageNumber || "",
    discharge_port: SECTIONB.dischargePort || "",
    container_number: SECTIONB.containerNumber || "",
    gross_weight_unit: SECTIONB.grossWeightUnit
      ? SECTIONB.grossWeightUnit.toLowerCase()
      : "kg",
    mode_of_transport: SECTIONB.modeOfTransport || "OTHER",
    first_arrival_date: SECTIONB.firstArrivalDate || "",
    first_arrival_port: SECTIONB.firstArrivalPort || "",
    number_of_packages: SECTIONB.numberOfPackages || "",
    house_bill_of_lading_no: SECTIONB.houseBillOfLading || "",
    ocean_bill_of_lading_no: SECTIONB.oceanBillOfLading || "",
    marks_numbers_description: SECTIONB.marksNumbersDescription || "",
  };

  // AIR specific
  if (SECTIONB.modeOfTransport === "AIR") {
    section_b.airline_code = SECTIONB.airlineCode || "";
    section_b.master_air_waybill = SECTIONB.masterAirWaybill || "";
    section_b.house_air_waybill = SECTIONB.houseAirWaybill || "";
  }

  // POST specific
  if (SECTIONB.modeOfTransport === "POST") {
    section_b.parcel_post_card_numbers =
      SECTIONB.parcelPostCardNumbers || "";
  }

  // OTHER specific
  if (SECTIONB.modeOfTransport === "OTHER") {
    section_b.department_receipt_for_goods_number =
      SECTIONB.departmentReceiptForGoodsNumber || "";
  }

  return section_b;
}

export default reverseMapSectionB;