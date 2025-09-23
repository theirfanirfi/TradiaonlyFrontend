import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Divider,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import StepActions from "./StepActions";

  const SectionAForm = ({sectionA, setSectionA, theme, activeStep, steps, back, saveDraft, next}) => (
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

  export default SectionAForm;
