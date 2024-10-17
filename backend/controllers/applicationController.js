import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

// applay job
export const applayJob = async (req, res) => {
  try {
    // get user id and job id from request parameters
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Invalid job id",
        success: false,
      });
    }
    // check if the user is already applyed
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    // check is the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    // add the application id to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "Application submitted successfully",
      application: newApplication,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get applied for jobs
export const getAppliedJobs = async (req, res) => {
  try {
    // get user id from request parameters
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!application) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }
    return res.status(200).json({
      message: "Applications fetched successfully",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// find applicants
export const getApplicants = async (req, res) => {
  try {
    // getApplicants
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Applicants fetched successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//aplication status
export const updateStatus = async (req, res) => {
  try {
    // get the status from request body and application id from request parameters
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Invalid status", success: false });
    }
    // find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    // update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Application status updated successfully",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
