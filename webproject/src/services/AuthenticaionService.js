import Api from "./Api";

export default {
  testing(dataStuff) {
    return Api().post("api/findpicture", dataStuff);
  },
  getStoryCategory(categoryName) {
    return Api().get(`api/category/${categoryName}`);
  },
  getCategory() {
    return Api().get("api/category");
  },
  readStory(id) {
    return Api().put(`api/read/${id}`);
  },
  readHistory() {
    return Api().get("api/history");
  },
  removeHistory(id) {
    return Api().put(`api/history/${id}`);
  },
  searchStory(search) {
    return Api().get(`api/search/${search}`, search);
  },
  loginFunc(user) {
    return Api().post("api/login", user);
  },
  getUsers() {
    return Api().get("api/user");
  },
  getUserGoogle(authGoogleID) {
    return Api().get(`api/google/${authGoogleID}`);
  },
  deleteUser(id) {
    return Api().delete(`api/user/${id}`);
  },
  registerFunc(user) {
    return Api().post("api/register", user);
  },
  // ================== Image ==================
  uploadImage(uploadImages) {
    return Api().post("api/upload", uploadImages);
  },
  // ================== Story ==================
  addNewStory(story) {
    return Api().post("api/story", story);
  },
  showStories() {
    return Api().get("api/story");
  },
  getEditStory(id) {
    return Api().get(`api/story/${id}`);
  },
  updateStory(id, body) {
    return Api().put(`api/story/${id}`, body);
  },
  deleteStory(id) {
    return Api().delete(`api/story/${id}`);
  },
  addStoryChapter(id, chapter) {
    return Api().post(`api/story/${id}/chapter`, chapter);
  },
  getStoryChapter(id) {
    return Api().get(`api/story/${id}/chapter`);
  },
  deleteStoryChapter(id) {
    return Api().delete(`api/story/${id}/chapter`);
  },
  uploadChapterImg(uploadImages) {
    return Api().post(`api/uploadChuongImg`, uploadImages);
  },
  saveChapterImgToDB(chapterid, data) {
    return Api().post(`api/chapter/${chapterid}`, data);
  },
  getChapterImgs(chapterid) {
    return Api().get(`api/chapter/${chapterid}`);
  },
  deleteChapterImgs(chapterid, imageName) {
    return Api().delete(`api/chapter/${chapterid}/${imageName}`);
  },
  // ================== Author ==================
  addNewAuthor(author) {
    return Api().post("api/author", author);
  },
  showAuthors() {
    return Api().get("api/author");
  },
  getEditAuthor(id) {
    return Api().get(`api/author/${id}`);
  },
  updateAuthor(id, body) {
    return Api().put(`api/author/${id}`, body);
  },
  deleteAuthor(id) {
    return Api().delete(`api/author/${id}`);
  },
};
