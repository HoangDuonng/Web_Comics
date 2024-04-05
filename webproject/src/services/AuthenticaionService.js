import Api from "./Api";

export default {
  testing(dataStuff) {
    return Api().post("findpicture", dataStuff);
  },
  getStoryCategory(categoryName) {
    return Api().get(`category/${categoryName}`);
  },
  getCategory() {
    return Api().get("category");
  },
  readStory(id) {
    return Api().put(`read/${id}`);
  },
  readHistory() {
    return Api().get("history");
  },
  removeHistory(id) {
    return Api().put(`history/${id}`);
  },
  searchStory(search) {
    return Api().get(`search/${search}`, search);
  },
  loginFunc(user) {
    return Api().post("login", user);
  },
  getUsers() {
    return Api().get("user");
  },
  getUserGoogle(authGoogleID) {
    return Api().get(`/google/${authGoogleID}`);
  },
  deleteUser(id) {
    return Api().delete(`user/${id}`);
  },
  registerFunc(user) {
    return Api().post("register", user);
  },
  // ================== Image ==================
  uploadImage(uploadImages) {
    return Api().post("upload", uploadImages);
  },
  // ================== Story ==================
  addNewStory(story) {
    return Api().post("story", story);
  },
  showStories() {
    return Api().get("story");
  },
  getEditStory(id) {
    return Api().get(`story/${id}`);
  },
  updateStory(id, body) {
    return Api().put(`story/${id}`, body);
  },
  deleteStory(id) {
    return Api().delete(`story/${id}`);
  },
  addStoryChapter(id, chapter) {
    return Api().post(`story/${id}/chapter`, chapter);
  },
  getStoryChapter(id) {
    return Api().get(`story/${id}/chapter`);
  },
  deleteStoryChapter(id) {
    return Api().delete(`story/${id}/chapter`);
  },
  uploadChapterImg(uploadImages) {
    return Api().post(`/uploadChuongImg`, uploadImages);
  },
  saveChapterImgToDB(chapterid, data) {
    return Api().post(`chapter/${chapterid}`, data);
  },
  getChapterImgs(chapterid) {
    return Api().get(`chapter/${chapterid}`);
  },
  deleteChapterImgs(chapterid, imageName) {
    return Api().delete(`chapter/${chapterid}/${imageName}`);
  },
  // ================== Author ==================
  addNewAuthor(author) {
    return Api().post("author", author);
  },
  showAuthors() {
    return Api().get("author");
  },
  getEditAuthor(id) {
    return Api().get(`author/${id}`);
  },
  updateAuthor(id, body) {
    return Api().put(`author/${id}`, body);
  },
  deleteAuthor(id) {
    return Api().delete(`author/${id}`);
  },
};
