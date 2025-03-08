import LoanApplication from "../models/loanapply.model.js";

const applyLoan = async (req, res) => {
  try {
    const {
        fullName, phoneNumber, email, aadharNumber, panNumber, accountNumber, ifscCode, loanType, duration, loanAmount, bankName
    } = req.body;

    if (!fullName || !phoneNumber || !email || !aadharNumber || !panNumber || !accountNumber || !ifscCode || !loanType || !duration || !loanAmount || !bankName) {
      return res.status(400).json({ error: "All fields are required." });
    }

    console.log(req.body)


    const application = new LoanApplication({
        fullName,
        phoneNumber,
        email,
        aadharNumber,
        panNumber,
        accountNumber,
        ifscCode,
        loanType,
        duration,
        loanAmount,
        bankName,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Error during applying loan application:", err);
    res.status(500).json({ error: "Failed to submit loan application. Please try again later." });
  }
};

const listApplications = async (req, res) => {
    try {
      // Fetch all the bank data from the database
      const applications = await LoanApplication.find({});
      res.json({ success: true, applications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const updateLoanApplication = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Find the application and update it
      const updatedApplication = await LoanApplication.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedApplication) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      res.status(200).json({ success: true, message: "Application updated successfully", application: updatedApplication });
    } catch (error) {
      console.error("Error updating loan application:", error);
      res.status(500).json({ success: false, message: "Failed to update application. Please try again." });
    }
  };

  const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ error: "Status is required." });
      }
  
      const application = await LoanApplication.findById(id);
      if (!application) {
        return res.status(404).json({ error: "Application not found." });
      }
  
      // Update the loanStatus field
      application.loanStatus = status;
      await application.save();
  
      return res.status(200).json({ 
        success: true, 
        message: "Status updated successfully",
        application 
      });
  
    } catch (err) {
      console.error("Error updating loan application status:", err);
      res.status(500).json({ error: "Failed to update loan application status. Please try again later." });
    }
  };
  
  const getApplicationsByPhone = async (req, res) => {
    try {
      console.log("entered")
      console.log(req.body)
      const { phoneNumber } = req.body;
  
      if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number is required." });
      }
  
      const applications = await LoanApplication.find({ phoneNumber
       });
  
      if (applications.length === 0) {
        return res.status(404).json({ error: "No applications found for this phone number." });
      }

      console.log(applications)
  
      res.status(200).json({ success: true, applications });
    } catch (error) {
      console.error("Error fetching applications by phone number:", error);
      res.status(500).json({ error: "Failed to fetch applications. Please try again later." });
    }
  };

  const updateFeeStatus = async (req, res) => {
    const { id } = req.params;
    const { agreementFeePaid, processingFeePaid, transferChargePaid, serviceChargePaid } = req.body;
  
    try {
      const application = await LoanApplication.findById(id);
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      // Update the fields based on the provided data
      if (agreementFeePaid !== undefined) {
        application.agreementFeePaid = agreementFeePaid;
      }
      if (processingFeePaid !== undefined) {
        application.processingFeePaid = processingFeePaid;
      }
      if (transferChargePaid !== undefined) {
        application.transferChargePaid = transferChargePaid;
      }
      if (serviceChargePaid !== undefined) {
        application.serviceChargePaid = serviceChargePaid;
      }
  
      await application.save();
      res.status(200).json({ success: true, message: "Fee status updated successfully" });
    } catch (error) {
      console.error("Error updating fee status:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  const showPayments = async (req, res) => {
    const { id } = req.params;
    const { showAgreementPayment, showProcessingPayment, showTransferPayment, showServicePayment } = req.body;
  
    try {
      const application = await LoanApplication.findById(id);
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      // Update the fields based on the provided data
      if (showAgreementPayment !== undefined) {
        application.showAgreementPayment = showAgreementPayment;
      }
      if (showProcessingPayment !== undefined) {
        application.showProcessingPayment = showProcessingPayment;
      }
      if (showTransferPayment !== undefined) {
        application.showTransferPayment = showTransferPayment;
      }
      if (showServicePayment !== undefined) {
        application.showServicePayment = showServicePayment;
      }
  
      await application.save();
      res.status(200).json({ success: true, message: "Payment shown successfully" });
    } catch (error) {
      console.error("Error updating fee status:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };



const deleteLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await LoanApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting loan application:", error);
    res.status(500).json({ error: "Failed to delete loan application. Please try again later." });
  }
};
  



export { applyLoan, listApplications, updateLoanApplication, updateStatus ,getApplicationsByPhone, updateFeeStatus, deleteLoanApplication, showPayments };
