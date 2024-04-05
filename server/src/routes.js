const Truyen = require("./models/truyen");
const User = require("./models/users");
const Tacgia = require("./models/tacgia");
const Chuong = require("./models/chuong");
const ChuongHinhAnh = require("./models/chuong_hinhanh");
const mongoose = require("mongoose");
const tf = require('@tensorflow/tfjs')
const { v4: uuid } = require("uuid");
const { chuongImgUpload } = require("./helpers/multer_config");
const upload = require("./helpers/multer_config").upload;
const fs = require("fs");
const path = require("path");

mongoose
  .connect("mongodb://127.0.0.1:27017/TruyenVuiDB")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

module.exports = (app) => {
    app.post("/findpicture", async (req, res) => {
      const newTruyen = new Truyen(req.body);
      await newTruyen.save();
      res.send("successfully");
    }),
    app.get("/category", async (req, res) => {
      try {
        const categories = await Truyen.find({}).distinct("theloai");
        const categoryObjects = categories.map(category => ({ name: category }));
        res.status(200).json({
          categoryObjects,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.get("/category/:categoryName", async (req, res) => {
      try {
        const categoryName = req.params.categoryName;
        const stories = await Truyen.find({ theloai: categoryName });
        res.status(200).json({
          stories,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    });    
    app.put("/read/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const truyen = await Truyen.findByIdAndUpdate(id, 
          { dadoc: 1 }, 
          { runValidators: true, new: true },
        );
        res.status(200).json({
          message: "Truyện đã được đọc",
        });
      } catch (err) {
        res.status(403).json({
          error: "can't find the story",
        });
      }
    }),
    app.get("/history",async (req, res) => {
      try {
        const truyens = await Truyen.find({ dadoc: 1 });
        if (!truyens || truyens.length === 0) {
          return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
        }
        return res.json(truyens);
      } catch (error) {
        return res.status(500).json({ message: "Lối rồi fix đê =))" });
      }
    }),
    app.put("/history/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const truyen = await Truyen.findByIdAndUpdate(id, 
          { dadoc: 0 }, 
          { runValidators: true, new: true },
        );
        res.status(200).json({
          message: "Truyện đã được xóa khỏi lịch sử",
        });
      } catch (err) {
        res.status(403).json({
          error: "can't find the story",
        });
      }
    }),
    app.get("/search/:search", async (req, res) => {
      const { search } = req.params;
      try {
        const story = await Truyen.find({
          tentruyen: { $regex: search, $options: "i" },
        });
        res.status(200).json({
          story,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.post("/login", async (req, res) => {
      try {
        const pageUser = req.body;
        const user = await User.findOne({ email: pageUser.email });
        if (!user) {
          return res.status(403).send({
            message: "The login information is incorrect",
            success: 0,
          });
        }
        if (pageUser.password !== user.password) {
          return res.status(403).send({
            message: "Wrong password please retry!",
            success: 0,
          });
        } else {
          if (user.level === "1") {
            res.status(200).json({
              message: "Login successfully! Thằng này là admin",
              success: 1,
              username: user.username,
            });
          } else {
            res.status(200).json({
              message: "Login successfully! Thằng này là user",
              success: 2,
              username: user.username,
            });
          }
        }
      } catch (err) {
        res.status(403).send({
          error: "This account has been in use",
        });
      }
    }),
    app.post("/register", async (req, res) => {
      try {
        const data = req.body;
        const resFindDupUser = await User.findOne({
          $or: [{ email: data.email }, { username: data.username }],
        });
        if (resFindDupUser) {
          res.status(403).json({
            success: 0,
            message:
              "email or username already existed please use another email!",
          });
        } else {
          const newUser = new User(data);
          let error = newUser.validateSync();
          if (error) {
            if (error.errors["email"]) {
              res.status(403).json({
                error: error.errors.email["message"],
              });
            } else if (error.errors["password"]) {
              res.status(403).json({
                error: error.errors.password["message"],
              });
            } else if (error.errors["username"]) {
              res.status(403).json({
                error: error.errors.username["message"],
              });
            }
          } else {
            await newUser.save();
            res.status(200).json({
              success: 1,
              message: "resgister successfully!",
            });
          }
        }
      } catch (error) {
        res.send({
          error,
        });
      }
    }),
    app.get("/user", async (req, res) => {
      try {
        const datalist = await User.find({});
        res.status(200).json({
          datalist,
        });
      } catch (error) {
        res.status(500).json({
          error,
        });
      }
    }),
    app.get("/google/:authGoogleID", async (req, res) => {
      try {
        const user = await User.findOne({
          authGoogleID: req.params.authGoogleID,
        });
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json({
          err,
        });
      }
    }),
    app.delete("/user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const resData = await User.findByIdAndDelete(id);
        res.status(200).json({
          message: "Delete user successfully!",
          success: 1,
        });
      } catch (err) {
        res.status(500).json({
          err,
        });
      }
    }),
    app.post("/upload", upload.array("imageUploads", 10), (req, res) => {
      const senderName = req.body.fromName;

      if (senderName == null || senderName == undefined) {
        res.status(500).json({ error: `No senderName sent.`, success: 0 });
        return;
      }

      if (req.files == null || req.files == undefined) {
        res.status(500).json({
          error: `${senderName} - Image uploads not found.`,
          success: 0,
        });
        return;
      } else if (req.files.length == 0) {
        res
          .status(500)
          .json({ error: `${senderName} - No images sent.`, success: 0 });
        return;
      } else {
        // res.send(req.files)
        res.status(200).json({
          success: 1,
          name: `${req.files[0].filename}`,
          message: "success",
        });
        return;
      }
    }),
    // ================== Story ==================
    app.post("/story", async (req, res) => {
      const book = req.body;
      const newTruyen = await Truyen(book);
      let error = newTruyen.validateSync();
      if (error) {
        if (error.errors["tentruyen"]) {
          res.status(403).json({
            error: error.errors.tentruyen["message"],
          });
        } else if (error.errors["tenphu"]) {
          res.status(403).json({
            error: error.errors.tenphu["message"],
          });
        } else if (error.errors["anhbia"]) {
          res.status(403).json({
            error: error.errors.anhbia["message"],
          });
        } else if (error.errors["noidung"]) {
          res.status(403).json({
            error: error.errors.tacgia["message"],
          });
        } else if (error.errors["tacgia"]) {
          res.status(403).json({
            error: error.errors.tacgia["message"],
          });
        } else if (error.errors["nxb"]) {
          res.status(403).json({
            error: error.errors.nxb["message"],
          });
        } else if (error.errors["theloai"]) {
          res.status(403).json({
            error: error.errors.theloai["message"],
          });
        }
      } else {
        await newTruyen.save();
        const respond = { success: 1 };
        res.send(respond);
      }
    }),
    app.get("/story", async (req, res) => {
      try {
        const books = await Truyen.find({});
        res.status(200).json(books);
      } catch (err) {
        console.log(err);
      }
    }),
    app.get("/story/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const truyen = await Truyen.findById(id);
        res.status(200).json(truyen);
      } catch (err) {
        res.status(403).json({
          error: "can't find the story",
        });
      }
    }),
    app.put("/story/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const truyen = await Truyen.findByIdAndUpdate(id, req.body, {
          runValidators: true,
          new: true,
        });
        res.status(200).json({
          success: 1,
        });
      } catch (err) {
        res.status(403).json({
          success: 0,
        });
      }
    }),
    app.delete("/story/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const truyen = await Truyen.findByIdAndDelete(id);
        res.status(200).json({
          success: 1,
        });
      } catch (err) {
        res.status(403).json({
          success: 0,
        });
      }
    }),
    // ================== Author ==================
    app.post("/author", async (req, res) => {
      const author = req.body;
      const newTacgia = new Tacgia(author);
      let error = newTacgia.validateSync();
      if (error) {
        if (error.errors["tentacgia"]) {
          res.status(403).json({
            error: error.errors.tentacgia["message"],
          });
        } else if (error.errors["gioithieu"]) {
          res.status(403).json({
            error: error.errors.gioithieu["message"],
          });
        }
      } else {
        await newTacgia.save();
        res.status(200).json({
          success: 1,
        });
      }
    }),
    app.get("/author", async (req, res) => {
      try {
        const authors = await Tacgia.find({});
        res.status(200).json({
          authors,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.get("/author/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const author = await Tacgia.findById(id);
        res.status(200).json({
          author,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.put("/author/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const author = await Tacgia.findOneAndUpdate(
          { matacgia: id },
          req.body,
          { runValidators: true, new: true }
        );
        // res.send(author)
        res.status(200).json({
          success: 1,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.delete("/author/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const author = await Tacgia.findOneAndDelete(id);
        res.status(200).json({
          success: 1,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    // ================== Story Chapter ==================
    app.post("/story/:id/chapter", async (req, res) => {
      const { id } = req.params;
      const chapter = req.body;
      chapter.matruyen = id;
      const newChapter = new Chuong(chapter);

      let error = newChapter.validateSync();
      if (error) {
        if (error.errors["chuong_so"]) {
          res.status(403).json({
            error: error.errors.chuong_so["message"],
          });
        } else if (error.errors["chuong_ten"]) {
          res.status(403).json({
            error: error.errors.chuong_ten["message"],
          });
        } else if (error.errors["matruyen"]) {
          res.status(403).json({
            error: error.errors.matruyen["message"],
          });
        }
      } else {
        await newChapter.save();
        res.status(200).json({
          success: 1,
        });
      }
    }),
    app.get("/story/:id/chapter", async (req, res) => {
      const { id } = req.params;
      try {
        const chapters = await Chuong.find({ matruyen: id });
        res.status(200).json({
          chapters,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.delete("/story/:id/chapter", async (req, res) => {
      try {
        const { id } = req.params;
        const resData = await Chuong.findByIdAndDelete(id);
        res.status(200).json({
          success: 1,
        });
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.post(
      "/uploadChuongImg",
      chuongImgUpload.array("imageUploads", 10),
      (req, res) => {
        const senderName = req.body.fromName;

        if (senderName == null || senderName == undefined) {
          res.status(500).json({ error: `No senderName sent.` });
          return;
        }

        if (req.files == null || req.files == undefined) {
          res
            .status(500)
            .json({ error: `${senderName} - Image uploads not found.` });
          return;
        } else if (req.files.length == 0) {
          res.status(500).json({ error: `${senderName} - No images sent.` });
          return;
        } else {
          // res.send(req.files)
          const imgArr = [];
          req.files.forEach((element) => {
            imgArr.push(element.filename);
          });
          res.status(200).json({
            message: `${senderName} - ${req.files.length} images saved.`,
            Images: imgArr,
            success: 1,
          });
          return;
        }
      }
    ),
    app.post("/chapter/:chapterid", async (req, res) => {
      const { chapterid } = req.params;
      const data = req.body;
      data.machuong = chapterid;
      try {
        const newHinhAnhChuong = await ChuongHinhAnh(data);
        const error = newHinhAnhChuong.validateSync();
        if (error) {
          if (error.errors["machuong"]) {
            res.status(403).json({
              error: error.errors.machuong["message"],
            });
          }
        } else {
          await newHinhAnhChuong.save();
          res.status(200).json({
            success: 1,
          });
        }
      } catch (err) {
        res.status(500).send({
          err,
        });
      }
    }),
    app.get("/chapter/:chapterid", async (req, res) => {
      const { chapterid } = req.params;
      try {
        const data = await ChuongHinhAnh.findOne({ machuong: chapterid });
        if (data.hinhanh.length === 0) {
          res.status(500).json({
            dataImg: "no images were found",
          });
        } else {
          let dataImages = [];
          for (let i = 0; i < data.hinhanh.length; i++) {
            dataImages.push(data.hinhanh[i]);
          }
          res.status(200).json({
            dataImg: dataImages,
          });
        }
      } catch (err) {
        res.status(500).json({
          error: err,
        });
      }
    }),
    app.delete("/chapter/:chapterid/:imagename", async (req, res) => {
      const { chapterid } = req.params;
      const { imagename } = req.params;
      const directoryPath = "images/chuongImgs/";
      // res.send(directoryPath+imagename)
      try {
        const resFind = await ChuongHinhAnh.findOne({ machuong: chapterid });
        // const a = resFind.hinhanh.findIndex( (element) => element === imagename )
        // console.log(a)
        // let dataImages = []
        // for(let i=0;i<resFind.hinhanh.length;i++){
        //     dataImages.push(resFind.hinhanh[i])
        // }
        // dataImages.splice(a,1)
        // console.log(dataImages)
        // res.status(200).json({dataImages})
        if (!resFind) {
          res.status(500).json({
            message: "error loi l",
          });
        } else {
          const findImageInChapter = resFind.hinhanh.findIndex(
            (element) => element === imagename
          );
          if (!findImageInChapter && findImageInChapter != 0) {
            res.status(200).json({
              message: `There are no images name ${imagename} in the database`,
            });
          } else {
            fs.unlink(directoryPath + imagename, (err) => {
              if (err) throw err;
              console.log(` ${imagename} was deleted`);
            });
            let dataImages = [];
            for (let i = 0; i < resFind.hinhanh.length; i++) {
              dataImages.push(resFind.hinhanh[i]);
            }
            dataImages.splice(findImageInChapter, 1);
            const resUpdate = await ChuongHinhAnh.findOneAndUpdate(
              { machuong: chapterid },
              { hinhanh: dataImages },
              { runValidators: true, new: true }
            );
            res.status(200).json({
              success: 1,
            });
          }
        }
      }catch(error){
        res.status(500).json({
          error
        })
      }
    })
    // app.get('/imagedetect', async (req,res) => {
    //     try{
    //         const model = await tf.loadLayersModel('./static/Manga_face_model_2.h5')
    //         console.log(model.summary())
    //         res.status(200).json({
    //             success: 1
    //         })
    //     }catch(error){
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // });
};
