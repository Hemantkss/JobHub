import Job from "../models/jobModel.js";

// post jobs
export const postJob = async (req, res) => {
  try {
    // create
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // check if company already exists
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "Job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get all jobs
export const getAllJobs = async (req, res) => {
  try {
   
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
      ],
    };
    // filter by company id if provided
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get job by id
export const getJobById = async (req, res) => {
  try {
    // get job
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Job fetched successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// admin job creted
export const getAdminJob = async (req, res) => {
  try {
    // get admin
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    })
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
