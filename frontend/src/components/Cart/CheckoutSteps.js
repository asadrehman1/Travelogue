import React, { Fragment } from "react";
import { Stepper, Step, StepLabel, Typography } from "@material-ui/core";
import CheckIcon from '@mui/icons-material/Check';
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css"

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Booking Details</Typography>,
      icon: <CheckIcon />,
    },
    {
      label: <Typography>Confirm Booking</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel style={{
                color : activeStep >= index ? "#0067a5" : "gray"
              }} icon={item.icon}>{item.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Fragment>

  );
};

export default CheckoutSteps;
