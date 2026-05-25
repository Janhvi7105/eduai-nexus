import Course from "../models/Course.js";


// ==========================
// ➕ CREATE COURSE
// ==========================
export const createCourse = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
    } = req.body;

    if (
      !title ||
      price === undefined
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Title and price are required ❌",
      });
    }

    const course =
      await Course.create({

        title,

        description,

        price,

        instructor:
          req.user._id,

        sections: [
          {
            title:
              "Module 1",

            lectures: [],
          },
        ],

        students: [],
      });

    res.status(201).json({

      success: true,

      message:
        "Course created successfully 🎉",

      course,
    });

  } catch (error) {

    console.error(
      "Create Course Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Server error ❌",
    });
  }
};


// ==========================
// 📚 GET ALL COURSES
// ==========================
export const getCourses = async (
  req,
  res
) => {

  try {

    const courses =
      await Course.find()

        .populate(
          "instructor",
          "name email"
        )

        .sort({
          createdAt: -1,
        });

    res.json({

      success: true,

      courses,
    });

  } catch (error) {

    console.error(
      "Get Courses Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Server error ❌",
    });
  }
};


// ==========================
// 📖 GET SINGLE COURSE
// ==========================
export const getSingleCourse = async (
  req,
  res
) => {

  try {

    const course =
      await Course.findById(
        req.params.id
      )

        .populate(
          "instructor",
          "name email"
        )

        .populate(
          "students",
          "name email"
        );

    if (!course) {

      return res.status(404).json({

        success: false,

        message:
          "Course not found ❌",
      });
    }

    res.json({

      success: true,

      course,
    });

  } catch (error) {

    console.error(
      "Get Course Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Server error ❌",
    });
  }
};


// ==========================
// ✏️ UPDATE COURSE
// ==========================
export const updateCourse = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const {
      title,
      description,
      price,
    } = req.body;


    // ================= FIND COURSE =================
    const course =
      await Course.findById(id);

    if (!course) {

      return res.status(404).json({

        success: false,

        message:
          "Course not found ❌",
      });
    }


    // ================= UPDATE =================
    course.title =
      title || course.title;

    course.description =
      description ||
      course.description;

    course.price =
      price || course.price;


    // ================= SAVE =================
    await course.save();


    // ================= RESPONSE =================
    res.status(200).json({

      success: true,

      message:
        "Course updated successfully ✅",

      course,
    });

  } catch (error) {

    console.error(
      "UPDATE COURSE ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to update course ❌",
    });
  }
};


// ==========================
// ➕ ADD MODULE
// ==========================
export const addSection = async (
  req,
  res
) => {

  try {

    const {
      courseId,
      title,
    } = req.body;

    if (
      !courseId ||
      !title
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Course ID & title required ❌",
      });
    }

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {

      return res.status(404).json({

        success: false,
      });
    }

    course.sections.push({

      title,

      lectures: [],
    });

    await course.save();

    res.json({

      success: true,

      sections:
        course.sections,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,
    });
  }
};


// ==========================
// 🗑️ DELETE MODULE
// ==========================
export const deleteSection = async (
  req,
  res
) => {

  try {

    const {
      courseId,
      sectionIndex,
    } = req.body;

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {

      return res.status(404).json({

        success: false,
      });
    }

    course.sections.splice(
      sectionIndex,
      1
    );

    await course.save();

    res.json({

      success: true,

      sections:
        course.sections,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,
    });
  }
};


// ==========================
// ➕ ADD LECTURE
// ==========================
export const addLecture = async (
  req,
  res
) => {

  try {

    let {
      courseId,
      sectionIndex,
      title,
      videoUrl,
    } = req.body;

    console.log(
      "📥 Incoming:",
      req.body
    );

    if (
      !courseId ||
      sectionIndex ===
        undefined ||
      !title ||
      !videoUrl
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Missing fields ❌",
      });
    }

    videoUrl =
      videoUrl.trim();


    // ✅ Accept ANY YouTube link
    if (
      !videoUrl.includes(
        "youtube.com"
      ) &&
      !videoUrl.includes(
        "youtu.be"
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid YouTube link ❌",
      });
    }


    // ✅ Convert watch → embed
    if (
      videoUrl.includes(
        "watch?v="
      )
    ) {

      videoUrl =
        videoUrl.replace(
          "watch?v=",
          "embed/"
        );
    }


    // ✅ Convert short URL
    if (
      videoUrl.includes(
        "youtu.be/"
      )
    ) {

      const id =
        videoUrl.split(
          "youtu.be/"
        )[1];

      videoUrl =
        `https://www.youtube.com/embed/${id}`;
    }

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {

      return res.status(404).json({

        success: false,

        message:
          "Course not found ❌",
      });
    }

    if (
      !course.sections[
        sectionIndex
      ]
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid module ❌",
      });
    }

    course.sections[
      sectionIndex
    ].lectures.push({

      title:
        title.trim(),

      videoUrl,

      duration:
        "10:00",

      isFree: false,
    });

    await course.save();

    res.json({

      success: true,

      message:
        "Lecture added ✅",

      sections:
        course.sections,
    });

  } catch (err) {

    console.error(
      "Add Lecture Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Server error ❌",
    });
  }
};


// ==========================
// ✏️ EDIT LECTURE
// ==========================
export const editLecture = async (
  req,
  res
) => {

  try {

    const {
      courseId,
      sectionIndex,
      lectureIndex,
      title,
    } = req.body;

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {

      return res.status(404).json({

        success: false,
      });
    }

    if (
      !course.sections[
        sectionIndex
      ]?.lectures[
        lectureIndex
      ]
    ) {

      return res.status(400).json({

        success: false,
      });
    }

    course.sections[
      sectionIndex
    ].lectures[
      lectureIndex
    ].title = title;

    await course.save();

    res.json({

      success: true,

      sections:
        course.sections,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,
    });
  }
};


// ==========================
// 🗑️ DELETE LECTURE
// ==========================
export const deleteLecture = async (
  req,
  res
) => {

  try {

    const {
      courseId,
      sectionIndex,
      lectureIndex,
    } = req.body;

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {

      return res.status(404).json({

        success: false,
      });
    }

    course.sections[
      sectionIndex
    ].lectures.splice(
      lectureIndex,
      1
    );

    await course.save();

    res.json({

      success: true,

      sections:
        course.sections,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,
    });
  }
};