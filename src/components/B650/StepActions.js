import {
  Box,
  Button,
} from "@mui/material";

  const StepActions = ({activeStep, steps, back, saveDraft,next}) => (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 3 }}>
      <Box>
        <Button variant="outlined" onClick={back} disabled={activeStep === 0}>Back</Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" color="secondary" onClick={saveDraft}>Save Draft</Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={next}>Next</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={saveDraft}>Finish</Button>
        )}
      </Box>
    </Box>
  );

  export default StepActions;