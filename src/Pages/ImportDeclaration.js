import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  MenuItem,
  Divider,
  IconButton,
  Paper,
  FormControlLabel,
  Checkbox,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { createAppTheme } from "../theme/theme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { DeclarationAPI } from "../lib/api";
import mapImportDeclarationSectionAToApiPayload from "../lib/schema-utils/map_import_declaration_section_a";
import mapSectionAResponseToState from "../lib/schema-utils/mapping_section_a_response";
import mapSectionB from "../lib/schema-utils/map_section_b_import_declaration";
import reverseMapSectionB from "../lib/schema-utils/map_section_b_state_to_api";
import SectionAForm from "../components/B650/SectionAForm";
import mapSectionC from "../lib/schema-utils/map_import_section_c_response_to_state";
import reverseMapSectionC from "../lib/schema-utils/map_section_c_state_to_api";

/**
 * ImportDeclarationForm
 * Multi-step form that mirrors the PDF structure (Sections A, B, C) with Save & Next navigation.
 * This page follows the layout/styling of the existing `Process` page (Sidebar, TopBar, Container, theme, etc.).
 *
 * ROUTE SUGGESTION:
 *   /processes/:processId/declaration
 */

const DEFAULT_LINE = {
  goodsDescription: "",
  supplierId: "",
  supplierName: "",
  vendorId: "",
  tariffClassificationNumber: "",
  statCode: "",
  valuationBasisType: "",
  treatmentCode: "",
  gstExemptionCode: "",
  establishmentCode: "",
  priceType: "",
  priceAmount: "",
  priceCurrency: "AUD",
  quantity: "",
  unit: "",
  permitNumber: "",
  originCountry: "",
  preferenceOriginCountry: "",
  preferenceSchemeType: "",
  preferenceRuleType: "",
  instrumentType1: "",
  instrumentNumber1: "",
  instrumentType2: "",
  instrumentNumber2: "",
  additionalInformation: "",
  producerCode: "",
};

function ImportDeclarationForm() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });
  const theme = useMemo(() => createAppTheme(darkMode ? "dark" : "light"), [darkMode]);

  const navigate = useNavigate();
  const { processId } = useParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const steps = ["Section A – Owner & Valuation", "Section B – Transport & Delivery", "Section C – Tariff Lines"];

  // SECTION A
  const [sectionA, setSectionA] = useState({
    declarationType: "s71A", // s71A or S70(7)
    destinationPortCode: "",
    ownerName: "",
    ownerId: "",
    ownerReference: "",
    biosecurityLocation: "",
    contactHome: "",
    contactWork: "",
    contactMobile: "",
    ownerFax: "",
    ownerEmail: "",
    invoiceTermType: "",
    valuationDate: "",
    headerValuationAdviceNumber: "",
    eftPayment: "NO", // YES/NO
    valuation: {
      invoiceTotal: "",
      overseasFreight: "",
      overseasInsurance: "",
      packingCosts: "",
      foreignInlandFreight: "",
      landingCharges: "",
      transportAndInsurance: "",
      freeOnBoard: "",
      costInsuranceFreight: "",
      currency: "AUD",
    },
    paidUnderProtest: false,
    protestReason: "",
    amberStatement: "",
    declarationSigner: "",
    declarationDate: "",
  });

  // SECTION B
  const [sectionB, setSectionB] = useState({
    modeOfTransport: "AIR", // AIR | SEA | POST | OTHER
    lineNumber: "",
    // Common
    loadingPort: "",
    firstArrivalPort: "",
    dischargePort: "",
    firstArrivalDate: "",
    grossWeight: "",
    grossWeightUnit: "KG",
    numberOfPackages: "",
    marksNumbersDescription: "",
    // AIR specific
    airlineCode: "",
    masterAirWaybill: "",
    houseAirWaybill: "",
    // SEA specific
    vesselName: "",
    vesselId: "",
    voyageNumber: "",
    cargoType: "",
    containerNumber: "",
    oceanBillOfLading: "",
    houseBillOfLading: "",
    // POST specific
    parcelPostCardNumbers: "",
    // OTHER specific
    departmentReceiptForGoodsNumber: "",
    // Delivery address
    deliveryName: "",
    deliveryAddress: "",
    deliveryLocality: "",
    deliveryState: "",
    deliveryCountry: "AUSTRALIA",
    deliveryPostcode: "",
    deliveryContactPhone: "",
  });

  // SECTION C – multiple lines
  const [lines, setLines] = useState({ ...DEFAULT_LINE });

  // Simulate auto-filling process
  useEffect(() => {
    const autoFillData = async () => {
      // Simulate API call or data processing delay
      // await new Promise(resolve => setTimeout(resolve, 3000));
      // let declaration= await DeclarationAPI.get(processId);
      // console.log('declaration', declaration)

      DeclarationAPI.get(processId).then(res => {
        if (Object.keys(res.import_declaration_section_a).length > 0) {
          let sectiona = res.import_declaration_section_a
          let mapped = mapSectionAResponseToState(sectiona);
          setSectionA(mapped)
          setIsLoading(false);
          console.log('section a is not null');
        }

             if (Object.keys(res.import_declaration_section_b).length > 0) {
              let sectionb = res.import_declaration_section_b
              let mappedSectionB = mapSectionB(sectionb)
              setSectionB(mappedSectionB);
        }

             if (Object.keys(res.import_declaration_section_c).length > 0) {
              let sectionc = res.import_declaration_section_c
              let mappedSectionC = mapSectionC(sectionc)
              setLines({...mappedSectionC})
        }
        console.log('res', res)
      }).catch(c => console.log('catch', c));

      //   if(declaration.import_declaration_section_a.length > 0){
      // setIsLoading(false);
      //   }
      // Here you would typically fetch and populate data
      // For now, we'll just hide the loading modal
    };

    autoFillData();
  }, []);

  useEffect(()=>{
    console.log(activeStep)
  },[activeStep])

  // local draft persistence by processId
  useEffect(() => {

  }, [processId, isLoading]);

  const saveDraft = async () => {
    if(activeStep == 0){
      let payload = mapImportDeclarationSectionAToApiPayload(sectionA)
      let sectionUpdate = await DeclarationAPI.update(processId, payload, 'section_a')
      console.log('sectionUpdate', sectionUpdate)
      let mapped = mapSectionAResponseToState(sectionUpdate.import_declaration_section_a)
      setSectionA(mapped)
    }else if(activeStep == 1){
      let payload = reverseMapSectionB(sectionB);
      let sectionBUpdate = await DeclarationAPI.update(processId, payload, 'section_b')
      let sectionb = sectionBUpdate.import_declaration_section_b
      let mappedSectionB = mapSectionB(sectionb);
      setSectionB(mappedSectionB)
    }
    else if(activeStep == 2){
      let payload = reverseMapSectionC(lines)
      console.log('payload', payload)
      let sectionBUpdate = await DeclarationAPI.update(processId, payload, 'section_c')
      let sectionc = sectionBUpdate.import_declaration_section_c
      let mappedSectionC = reverseMapSectionC(sectionc)
      setLines({...mappedSectionC})
    }
    // localStorage.setItem(key, JSON.stringify(payload));
  };

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    sessionStorage.setItem("themeMode", newMode ? "dark" : "light");
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const next = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const updateLine = (field, value) => {
    setLines({
      ...lines,
      [field]: value
    });
  };

  const StepActions = () => (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 3 }}>
      <Box>
        <Button variant="outlined" onClick={back} disabled={activeStep === 0}>Back</Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" color="secondary" onClick={saveDraft}>Save Draft</Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={next}>Next</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={()=>{
            DeclarationAPI.generatePdf(processId)
          }}>Finish</Button>
        )}
      </Box>
    </Box>
  );

  const LoadingModal = () => (
    <Modal
      open={isLoading}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          minWidth: 400,
          bgcolor: 'background.paper',
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            mb: 3,
            color: theme.palette.primary.main
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Auto-filling Form
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We are automatically filling the form for you. Once the data is ready, you will be able to review and edit.
        </Typography>
      </Paper>
    </Modal>
  );

  const AForm = () => (
    <Box component={Paper} elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Section A – Owner details & Valuation</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField select label="Declaration type" fullWidth value={sectionA.declarationType}
            onChange={(e) => setSectionA({ ...sectionA, declarationType: e.target.value })}>
            <MenuItem value="s71A">Import declaration (s71A)</MenuItem>
            <MenuItem value="S70(7)">Return – special clearance (S70(7))</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Destination port code" fullWidth value={sectionA.destinationPortCode}
            onChange={(e) => setSectionA({ ...sectionA, destinationPortCode: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Owner name" fullWidth value={sectionA.ownerName}
            onChange={(e) => setSectionA({ ...sectionA, ownerName: e.target.value })} />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField label="Owner ID (ABN/ABN-CAC/CCID)" fullWidth value={sectionA.ownerId}
            onChange={(e) => setSectionA({ ...sectionA, ownerId: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Owner reference" fullWidth value={sectionA.ownerReference}
            onChange={(e) => setSectionA({ ...sectionA, ownerReference: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Biosecurity inspection location" fullWidth value={sectionA.biosecurityLocation}
            onChange={(e) => setSectionA({ ...sectionA, biosecurityLocation: e.target.value })} />
        </Grid>

        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={12} md={3}><TextField label="Home phone" fullWidth value={sectionA.contactHome} onChange={(e) => setSectionA({ ...sectionA, contactHome: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Work phone" fullWidth value={sectionA.contactWork} onChange={(e) => setSectionA({ ...sectionA, contactWork: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Mobile" fullWidth value={sectionA.contactMobile} onChange={(e) => setSectionA({ ...sectionA, contactMobile: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Owner fax" fullWidth value={sectionA.ownerFax} onChange={(e) => setSectionA({ ...sectionA, ownerFax: e.target.value })} /></Grid>
        <Grid item xs={12} md={6}><TextField label="Owner email" fullWidth value={sectionA.ownerEmail} onChange={(e) => setSectionA({ ...sectionA, ownerEmail: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Invoice term type" fullWidth value={sectionA.invoiceTermType} onChange={(e) => setSectionA({ ...sectionA, invoiceTermType: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField type="date" label="Valuation date" InputLabelProps={{ shrink: true }} fullWidth value={sectionA.valuationDate} onChange={(e) => setSectionA({ ...sectionA, valuationDate: e.target.value })} /></Grid>
        <Grid item xs={12} md={6}><TextField label="Header valuation advice number" fullWidth value={sectionA.headerValuationAdviceNumber} onChange={(e) => setSectionA({ ...sectionA, headerValuationAdviceNumber: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}>
          <TextField select label="EFT payment indicator" fullWidth value={sectionA.eftPayment}
            onChange={(e) => setSectionA({ ...sectionA, eftPayment: e.target.value })}>
            <MenuItem value="YES">YES</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
        <Grid item xs={12}><Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Valuation elements</Typography></Grid>
        {[
          ["invoiceTotal", "Invoice total"],
          ["overseasFreight", "Overseas freight"],
          ["overseasInsurance", "Overseas insurance"],
          ["packingCosts", "Packing costs"],
          ["foreignInlandFreight", "Foreign inland freight"],
          ["landingCharges", "Landing charges"],
          ["transportAndInsurance", "Transport & Insurance"],
          ["freeOnBoard", "Free on board"],
          ["costInsuranceFreight", "Cost insurance and freight"],
        ].map(([key, label]) => (
          <Grid item xs={12} md={4} key={key}>
            <TextField
              label={label}
              fullWidth
              type="number"
              value={sectionA.valuation[key]}
              onChange={(e) => setSectionA({ ...sectionA, valuation: { ...sectionA.valuation, [key]: e.target.value } })}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <TextField select label="Currency" fullWidth value={sectionA.valuation.currency}
            onChange={(e) => setSectionA({ ...sectionA, valuation: { ...sectionA.valuation, currency: e.target.value } })}
          >
            {["AUD", "USD", "EUR", "GBP", "JPY", "CNY"].map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
          </TextField>
        </Grid>

        <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel control={<Checkbox checked={sectionA.paidUnderProtest} onChange={(e) => setSectionA({ ...sectionA, paidUnderProtest: e.target.checked })} />} label="Paid under protest" />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField label="Protest reason (if applicable)" fullWidth value={sectionA.protestReason} onChange={(e) => setSectionA({ ...sectionA, protestReason: e.target.value })} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="AMBER statement / reason" fullWidth multiline minRows={2} value={sectionA.amberStatement} onChange={(e) => setSectionA({ ...sectionA, amberStatement: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}><TextField label="Declaration signer" fullWidth value={sectionA.declarationSigner} onChange={(e) => setSectionA({ ...sectionA, declarationSigner: e.target.value })} /></Grid>
        <Grid item xs={12} md={6}><TextField type="date" label="Declaration date" InputLabelProps={{ shrink: true }} fullWidth value={sectionA.declarationDate} onChange={(e) => setSectionA({ ...sectionA, declarationDate: e.target.value })} /></Grid>
      </Grid>
      <StepActions />
    </Box>
  );

  const BForm = () => (
    <Box component={Paper} elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Section B – Transport details & Delivery address</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField select label="Mode of transport" fullWidth value={sectionB.modeOfTransport}
            onChange={(e) => setSectionB({ ...sectionB, modeOfTransport: e.target.value })}
          >
            {["AIR", "SEA", "POST", "OTHER"].map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}><TextField label="Line number" fullWidth value={sectionB.lineNumber} onChange={(e) => setSectionB({ ...sectionB, lineNumber: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Loading port" fullWidth value={sectionB.loadingPort} onChange={(e) => setSectionB({ ...sectionB, loadingPort: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="First arrival port" fullWidth value={sectionB.firstArrivalPort} onChange={(e) => setSectionB({ ...sectionB, firstArrivalPort: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Discharge port" fullWidth value={sectionB.dischargePort} onChange={(e) => setSectionB({ ...sectionB, dischargePort: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField type="date" label="First arrival date" InputLabelProps={{ shrink: true }} fullWidth value={sectionB.firstArrivalDate} onChange={(e) => setSectionB({ ...sectionB, firstArrivalDate: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Gross weight" fullWidth value={sectionB.grossWeight} onChange={(e) => setSectionB({ ...sectionB, grossWeight: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}>
          <TextField select label="Weight unit" fullWidth value={sectionB.grossWeightUnit} onChange={(e) => setSectionB({ ...sectionB, grossWeightUnit: e.target.value })}>
            {["KG", "LB", "TON"].map((u) => (<MenuItem key={u} value={u}>{u}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}><TextField label="Packages" fullWidth value={sectionB.numberOfPackages} onChange={(e) => setSectionB({ ...sectionB, numberOfPackages: e.target.value })} /></Grid>
        <Grid item xs={12} md={9}><TextField label="Marks & numbers description" fullWidth value={sectionB.marksNumbersDescription} onChange={(e) => setSectionB({ ...sectionB, marksNumbersDescription: e.target.value })} /></Grid>

        {/* AIR */}
        {sectionB.modeOfTransport === "AIR" && (
          <>
            <Grid item xs={12} md={3}><TextField label="Airline code" fullWidth value={sectionB.airlineCode} onChange={(e) => setSectionB({ ...sectionB, airlineCode: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Master Air Waybill #" fullWidth value={sectionB.masterAirWaybill} onChange={(e) => setSectionB({ ...sectionB, masterAirWaybill: e.target.value })} /></Grid>
            <Grid item xs={12} md={5}><TextField label="House Air Waybill #" fullWidth value={sectionB.houseAirWaybill} onChange={(e) => setSectionB({ ...sectionB, houseAirWaybill: e.target.value })} /></Grid>
          </>
        )}

        {/* SEA */}
        {sectionB.modeOfTransport === "SEA" && (
          <>
            <Grid item xs={12} md={4}><TextField label="Vessel name" fullWidth value={sectionB.vesselName} onChange={(e) => setSectionB({ ...sectionB, vesselName: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Vessel ID" fullWidth value={sectionB.vesselId} onChange={(e) => setSectionB({ ...sectionB, vesselId: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Voyage number" fullWidth value={sectionB.voyageNumber} onChange={(e) => setSectionB({ ...sectionB, voyageNumber: e.target.value })} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Cargo type" fullWidth value={sectionB.cargoType} onChange={(e) => setSectionB({ ...sectionB, cargoType: e.target.value })} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Container number" fullWidth value={sectionB.containerNumber} onChange={(e) => setSectionB({ ...sectionB, containerNumber: e.target.value })} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Ocean B/L #" fullWidth value={sectionB.oceanBillOfLading} onChange={(e) => setSectionB({ ...sectionB, oceanBillOfLading: e.target.value })} /></Grid>
            <Grid item xs={12} md={3}><TextField label="House B/L #" fullWidth value={sectionB.houseBillOfLading} onChange={(e) => setSectionB({ ...sectionB, houseBillOfLading: e.target.value })} /></Grid>
          </>
        )}

        {/* POST */}
        {sectionB.modeOfTransport === "POST" && (
          <Grid item xs={12} md={6}><TextField label="Parcel post card number(s)" fullWidth value={sectionB.parcelPostCardNumbers} onChange={(e) => setSectionB({ ...sectionB, parcelPostCardNumbers: e.target.value })} /></Grid>
        )}

        {/* OTHER */}
        {sectionB.modeOfTransport === "OTHER" && (
          <Grid item xs={12} md={6}><TextField label="Department receipt for goods number" fullWidth value={sectionB.departmentReceiptForGoodsNumber} onChange={(e) => setSectionB({ ...sectionB, departmentReceiptForGoodsNumber: e.target.value })} /></Grid>
        )}

        <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
        <Grid item xs={12}><Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Delivery address</Typography></Grid>
        <Grid item xs={12} md={6}><TextField label="Name" fullWidth value={sectionB.deliveryName} onChange={(e) => setSectionB({ ...sectionB, deliveryName: e.target.value })} /></Grid>
        <Grid item xs={12}><TextField label="Address" fullWidth value={sectionB.deliveryAddress} onChange={(e) => setSectionB({ ...sectionB, deliveryAddress: e.target.value })} /></Grid>
        <Grid item xs={12} md={4}><TextField label="Locality" fullWidth value={sectionB.deliveryLocality} onChange={(e) => setSectionB({ ...sectionB, deliveryLocality: e.target.value })} /></Grid>
        <Grid item xs={12} md={2}><TextField label="State" fullWidth value={sectionB.deliveryState} onChange={(e) => setSectionB({ ...sectionB, deliveryState: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Postcode" fullWidth value={sectionB.deliveryPostcode} onChange={(e) => setSectionB({ ...sectionB, deliveryPostcode: e.target.value })} /></Grid>
        <Grid item xs={12} md={3}><TextField label="Country" fullWidth value={sectionB.deliveryCountry} onChange={(e) => setSectionB({ ...sectionB, deliveryCountry: e.target.value })} /></Grid>
        <Grid item xs={12} md={4}><TextField label="Contact phone" fullWidth value={sectionB.deliveryContactPhone} onChange={(e) => setSectionB({ ...sectionB, deliveryContactPhone: e.target.value })} /></Grid>
      </Grid>
      <StepActions />
    </Box>
  );

  const CForm = () => (
    <Box component={Paper} elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Section C – Tariff details</Typography>
     
        <Paper key={lines.priceAmount} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Goods description" fullWidth value={lines.goodsDescription} onChange={(e) => updateLine( 'goodsDescription', e.target.value)} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Supplier ID (CCID/ABN)" fullWidth value={lines.supplierId} onChange={(e) => updateLine( 'supplierId', e.target.value)} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Supplier name" fullWidth value={lines.supplierName} onChange={(e) => updateLine( 'supplierName', e.target.value)} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Vendor ID (ABN/ARN)" fullWidth value={lines.vendorId} onChange={(e) => updateLine( 'vendorId', e.target.value)} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Tariff classification number" fullWidth value={lines.tariffClassificationNumber} onChange={(e) => updateLine( 'tariffClassificationNumber', e.target.value)} /></Grid>
            <Grid item xs={12} md={2}><TextField label="Stat. code" fullWidth value={lines.statCode} onChange={(e) => updateLine( 'statCode', e.target.value)} /></Grid>

            <Grid item xs={12} md={3}><TextField label="Valuation basis type" fullWidth value={lines.valuationBasisType} onChange={(e) => updateLine( 'valuationBasisType', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Treatment code" fullWidth value={lines.treatmentCode} onChange={(e) => updateLine( 'treatmentCode', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="GST exemption code" fullWidth value={lines.gstExemptionCode} onChange={(e) => updateLine( 'gstExemptionCode', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Establishment code" fullWidth value={lines.establishmentCode} onChange={(e) => updateLine( 'establishmentCode', e.target.value)} /></Grid>

            <Grid item xs={12}><Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Price / Quantity</Typography></Grid>
            <Grid item xs={12} md={3}><TextField label="Type" fullWidth value={lines.priceType} onChange={(e) => updateLine( 'priceType', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Amount" type="number" fullWidth value={lines.priceAmount} onChange={(e) => updateLine( 'priceAmount', e.target.value)} /></Grid>
            <Grid item xs={12} md={2}>
              <TextField select label="Currency" fullWidth value={lines.priceCurrency} onChange={(e) => updateLine( 'priceCurrency', e.target.value)}>
                {["AUD", "USD", "EUR", "GBP", "JPY", "CNY"].map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}><TextField label="Quantity" type="number" fullWidth value={lines.quantity} onChange={(e) => updateLine( 'quantity', e.target.value)} /></Grid>
            <Grid item xs={12} md={2}><TextField label="Unit" fullWidth value={lines.unit} onChange={(e) => updateLine( 'unit', e.target.value)} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Permit number" fullWidth value={lines.permitNumber} onChange={(e) => updateLine( 'permitNumber', e.target.value)} /></Grid>

            <Grid item xs={12}><Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Origin & preference</Typography></Grid>
            <Grid item xs={12} md={3}><TextField label="Origin country" fullWidth value={lines.originCountry} onChange={(e) => updateLine( 'originCountry', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Preference origin country" fullWidth value={lines.preferenceOriginCountry} onChange={(e) => updateLine( 'preferenceOriginCountry', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Preference scheme type" fullWidth value={lines.preferenceSchemeType} onChange={(e) => updateLine( 'preferenceSchemeType', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Preference rule type" fullWidth value={lines.preferenceRuleType} onChange={(e) => updateLine( 'preferenceRuleType', e.target.value)} /></Grid>

            <Grid item xs={12}><Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Treatment & tariff instruments</Typography></Grid>
            <Grid item xs={12} md={3}><TextField label="Instrument type" fullWidth value={lines.instrumentType1} onChange={(e) => updateLine( 'instrumentType1', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Instrument number" fullWidth value={lines.instrumentNumber1} onChange={(e) => updateLine( 'instrumentNumber1', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Instrument type" fullWidth value={lines.instrumentType2} onChange={(e) => updateLine( 'instrumentType2', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Instrument number" fullWidth value={lines.instrumentNumber2} onChange={(e) => updateLine( 'instrumentNumber2', e.target.value)} /></Grid>

            <Grid item xs={12}><TextField label="Additional information" fullWidth multiline minRows={2} value={lines.additionalInformation} onChange={(e) => updateLine( 'additionalInformation', e.target.value)} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Producer code" fullWidth value={lines.producerCode} onChange={(e) => updateLine( 'producerCode', e.target.value)} /></Grid>
          </Grid>
        </Paper>
      

      <StepActions />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingModal />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar theme={theme} isMobile={false} mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
          <TopBar theme={theme} isMobile={false} onDrawerToggle={handleDrawerToggle} onThemeToggle={handleThemeToggle} onLogout={() => navigate("/")} onNavigate={navigate} />

          <Container maxWidth="lg" sx={{ flex: 1, py: 3, overflow: "auto", backgroundColor: "#ffffff" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000" }}>Import declaration (N10)</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" onClick={() => navigate(`/processes/${processId}`)}>Back to process</Button>
                <Button variant="contained" color="secondary" onClick={saveDraft}>Save Draft</Button>
              </Box>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && <AForm />}
            {activeStep === 1 && <BForm />}
            {activeStep === 2 && <CForm />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ImportDeclarationForm;