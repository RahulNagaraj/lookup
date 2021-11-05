import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, DialogContent } from "@mui/material";

import BootstrapDialog, {
    BootstrapDialogTitle,
} from "../../common/BootstrapDialog";

const OrderConfirmationModal = (props) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const serviceDate = new Date(props.orderDetails.serviceDate);
    const formatedDate = serviceDate.toLocaleDateString("en-US", options);
    return (
        <BootstrapDialog
            onClose={props.handleOrderConfirmationModal}
            aria-labelledby="book-now-title"
            open={props.orderConfirmationModalOpen}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <BootstrapDialogTitle
                id="book-now-title"
                onClose={props.handleOrderConfirmationModal}
            >
                Order Confirmation
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box>
                    <Typography variant="h5">
                        Your order has been confirmed
                    </Typography>
                    <Typography variant="body1">
                        {`Your order id is ${props.orderDetails.orderId}`}
                    </Typography>
                    <Typography variant="body1">
                        {`Your service is scheduled for ${formatedDate} 
                        from ${props.orderDetails.address}`}
                    </Typography>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

OrderConfirmationModal.propTypes = {
    handleOrderConfirmationModal: PropTypes.func.isRequired,
    orderConfirmationModalOpen: PropTypes.bool.isRequired,
    orderDetails: PropTypes.object.isRequired,
};

export default OrderConfirmationModal;
