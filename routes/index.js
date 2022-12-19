const express = require("express");
const router = express.Router();

router.get("/imk/", (req, res) => {
  res.render("home");
});

router.get("/imk/login", (req, res) => {
    res.render("auth/login", { layout: false });
  });
router.get("/imk/language_reg", (req, res) => {
    res.render("pages/language_reg", { layout: false });
  });

  router.get("/imk/register_pap", (req, res) => {
    res.render("auth/register_pap", { layout: false });
  });
  router.get("/imk/register_neth", (req, res) => {
    res.render("auth/register_neth", { layout: false });
  });

//admin portal
  router.get("/imk/portal_admin", (req, res) => {
    res.render("pages/admin/admin_home_p", { layout: false });
  });
  router.get("/imk/admin_student_neth", (req, res) => {
    res.render("pages/admin/admin_student_neth", { layout: false });
  });
  router.get("/imk/admin_student_cur", (req, res) => {
    res.render("pages/admin/admin_student_cur", { layout: false });
  });
  router.get("/imk/admin_nl_edit", (req, res) => {
    res.render("pages/admin/admin_nl_edit", { layout: false });
  });
  router.get("/imk/admin_cur_edit", (req, res) => {
    res.render("pages/admin/admin_cur_edit", { layout: false });
  });
  router.get("/imk/admin_classes", (req, res) => {
    res.render("pages/admin/admin_classes", { layout: false });
  });
  
  router.get("/imk/admin_add_materials", (req, res) => {
    res.render("pages/admin/admin_add_materials", { layout: false });
  });
  
  //student portal
  router.get("/imk/student_home_pap", (req, res) => {
    res.render("pages/student/student_home_pap", { layout: false });
  });
  router.get("/imk/student_audip_pap", (req, res) => {
    res.render("pages/student/student_audio_pap", { layout: false });
  });
  router.get("/imk/student_home_neth", (req, res) => {
    res.render("pages/student/student_home_neth", { layout: false });
  });
  router.get("/imk/student_audio_neth", (req, res) => {
    res.render("pages/student/student_audio_neth", { layout: false });
  });

  //email temp
  router.get("/imk/email_temp", (req, res) => {
    res.render("email", { layout: false });
  });
  router.get("/imk/tst", (req, res) => {
    res.render("tst", { layout: false });
  });


module.exports = router;