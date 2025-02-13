import LoanApplication from "../models/loanapply.model.js";

const applyLoan = async (req, res) => {
  try {
    const {
        fullName, phoneNumber, email, aadharNumber, panNumber, accountNumber, ifscCode, loanType, duration, loanAmount, bankName
    } = req.body;

    if (!fullName || !phoneNumber || !email || !aadharNumber || !panNumber || !accountNumber || !ifscCode || !loanType || !duration || !loanAmount || !bankName) {
      return res.status(400).json({ error: "All fields are required." });
    }


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
  

export { applyLoan, listApplications };
