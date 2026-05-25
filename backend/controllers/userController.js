import User from "../models/User.js";
import bcrypt from "bcryptjs";


// ===============================
// 👤 GET PROFILE
// ===============================
export const getProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found ❌",
      });
    }

    return res.status(200).json({

      success: true,

      user,
    });

  } catch (error) {

    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error ❌",
    });
  }
};



// ===============================
// ✏️ UPDATE PROFILE
// ===============================
export const updateProfile = async (
  req,
  res
) => {

  try {

    const {

      name,
      phone,

      bio,
      skills,
      experience,

      profileImage,

      linkedin,
      github,
      portfolio,

    } = req.body;


    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found ❌",
      });
    }


    // ================= BASIC =================
    if (name !== undefined)
      user.name = name;

    if (phone !== undefined)
      user.phone = phone;


    // ================= PROFESSIONAL =================
    if (bio !== undefined)
      user.bio = bio;

    if (skills !== undefined)
      user.skills = skills;

    if (experience !== undefined)
      user.experience = experience;

    if (profileImage !== undefined)
      user.profileImage = profileImage;


    // ================= SOCIAL =================
    if (linkedin !== undefined)
      user.linkedin = linkedin;

    if (github !== undefined)
      user.github = github;

    if (portfolio !== undefined)
      user.portfolio = portfolio;


    await user.save();


    const updatedUser =
      await User.findById(
        user._id
      ).select("-password");


    return res.status(200).json({

      success: true,

      message:
        "Profile updated successfully ✅",

      user: updatedUser,
    });

  } catch (error) {

    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error ❌",
    });
  }
};



// ===============================
// 🔐 UPDATE PASSWORD
// ===============================
export const updatePassword = async (
  req,
  res
) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;


    if (
      !currentPassword ||
      !newPassword
    ) {

      return res.status(400).json({

        success: false,

        message:
          "All fields are required ❗",
      });
    }


    if (newPassword.length < 6) {

      return res.status(400).json({

        success: false,

        message:
          "Password must be at least 6 characters ❗",
      });
    }


    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found ❌",
      });
    }


    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );


    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
          "Current password is incorrect ❌",
      });
    }


    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await user.save();


    return res.status(200).json({

      success: true,

      message:
        "Password updated successfully 🔐",
    });

  } catch (error) {

    console.error(
      "UPDATE PASSWORD ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error ❌",
    });
  }
};



// ===============================
// 🧠 SAVE ONBOARDING
// ===============================
export const saveOnboarding = async (
  req,
  res
) => {

  try {

    console.log(
      "🔥 REQ BODY:",
      req.body
    );

    const {

      teaching,
      video,
      audience,

    } = req.body;


    // ================= VALIDATION =================
    if (
      !teaching ||
      !video ||
      !audience
    ) {

      return res.status(400).json({

        success: false,

        message:
          "All onboarding fields required ❗",
      });
    }


    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found ❌",
      });
    }


    // ================= SAVE =================
    user.onboarding = {

      teaching,

      video,

      audience,
    };


    // ================= COMPLETE =================
    user.onboardingCompleted = true;

    await user.save();


    const updatedUser =
      await User.findById(
        user._id
      ).select("-password");


    console.log(
      "✅ SAVED IN DB:",
      updatedUser.onboarding
    );


    return res.status(200).json({

      success: true,

      message:
        "Onboarding saved successfully 🎉",

      user: updatedUser,
    });

  } catch (error) {

    console.error(
      "❌ ONBOARDING ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error ❌",
    });
  }
};



// =======================================
// 👨‍🎓 GET ALL REGISTERED STUDENTS
// =======================================
export const getAllStudents = async (
  req,
  res
) => {

  try {

    const students =
      await User.find({
        role: "student",
      })

        .populate(
          "enrolledCourses",
          "title"
        )

        .select("-password");


    return res.status(200).json({

      success: true,

      students,
    });

  } catch (error) {

    console.error(
      "GET STUDENTS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error ❌",
    });
  }
};