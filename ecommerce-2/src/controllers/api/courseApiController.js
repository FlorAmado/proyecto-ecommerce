const {
  getAllCourses,
  getCourseById,
  storeCourse,
  updateCourse,
  deleteCourse,
} = require("../../services/coursesServices");

module.exports = {
  index: async (req, res) => {
    try {
      const { withPagination = "true", page = 1, limit = 6 } = req.query;  
      const { count, courses, pages } = await getAllCourses(req, {
        withPagination,
        page,
        limit: +limit,
      });

      let data = {
        count,
        courses,
      }

      if(withPagination === "true"){
        data = {
          ...data,
          pages,
          currentPage: +page
        }
      }

      return res.status(200).json({
        ok: true,
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  },
  detail: async (req, res) => {
    try {
      const course = await getCourseById(req, req.params.id);

      if (!course) {
        throw {
          status: 404,
          message: "Curso no encontrado",
        };
      }

      return res.status(200).json({
        ok: true,
        data: {
          course,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  },
  store : async (req,res) => {
    try {
      const course = await storeCourse(req);

      return res.status(200).json({
        ok : true,
        data : {
          course
        }
      })
      
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  },
  update : async (req,res) => {
    try {
      console.log(req.body)

      const course = await updateCourse(req);
      return res.status(200).json({
        ok : true,
        data : {
          course
        }
      })
      
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  },
  destroy : async (req,res) => {
    try {

      const result = await deleteCourse(req);

      return res.status(200).json({
        ok : true,
        data : {
          result
        }
      })
      
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  }
};
