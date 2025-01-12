import "./Update.Book.Form.Control.Module.css";
import { Modal, Input, InputNumber, Select, notification } from "antd";
import { useState, useEffect } from "react";
import { updateBookAPI, hanldeUploadFileAPI } from "../../services/api.service";

const UpdateBookFormControl = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  dataUpdate,
  setDataUpdate,
  loadBook,
}) => {
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const handleUpdateBook = async (newThumbnail) => {
    const responseBook = await updateBookAPI(
      id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
    );

    if (responseBook.data) {
      resetAndCloseModal();

      await loadBook();

      notification.success({
        message: "Success",
        description: "Update a book successfully!",
      });
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(responseBook.message),
      });
    }
  };

  const handleSubmitBtn = async () => {
    // Không có file và không có ảnh preview => return
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error",
        description: "Please upload thumbnail image",
      });

      return;
    }

    let newThumbnail = "";

    // Không có file nhưng có ảnh preview  => không upload file
    if (!selectedFile && preview) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      // Có file và có ảnh preview => upload file

      //step 1: upload file
      const responseUpload = await hanldeUploadFileAPI(selectedFile, "book");

      if (responseUpload.data) {
        //success
        const newThumbnail = responseUpload.data.fileUploaded;
      } else {
        // failed
        notification.error({
          message: "Error",
          description: JSON.stringify(responseUpload.message),
        });

        return;
      }

      //step 2: update book
      await handleUpdateBook(newThumbnail);
    }
  };

  const resetAndCloseModal = () => {
    setId("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
    setDataUpdate(null);
    setIsModalUpdateOpen(false);
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // I have kept this example simple by using the first image instead of
    const file = event.target.file[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <Modal
        title="Update Book"
        open={isModalUpdateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        onText={"Update"}
      >
        <div className="form-content-wrapper">
          <div>
            <span>Id</span>
            <Input
              value="6673f7e5e5158280277d8b4c"
              // value={id}
              disabled
            />
          </div>

          <div>
            <span>Title</span>
            <Input
              value={mainText}
              onChange={(event) => {
                setMainText(event.target.value);
              }}
            />
          </div>

          <div>
            <span>Author</span>
            <Input
              value={author}
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
            />
          </div>

          <div>
            <div>Price</div>
            <InputNumber
              className="input-number-full"
              addonAfter={" đ"}
              value={price}
              onChange={(event) => {
                setPrice(event);
              }}
            />
          </div>

          <div>
            <div>Quantity</div>
            <InputNumber
              className="input-number-full"
              value={quantity}
              onChange={(event) => {
                setQuantity(event);
              }}
            />
          </div>

          <div>
            <div>Category</div>
            <Select
              className="select-full"
              value={category}
              onChange={(value) => {
                setCategory(value);
              }}
              option={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },
                { value: "Cooking", label: "Cooking" },
                { value: "Entertaiment", label: "Entertaiment" },
                { value: "History", label: "History" },
                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
            ></Select>
          </div>

          <div>
            <div>Thumbnail Image</div>
            <div>
              <label htmlFor="btnUpload" className="upload-btn">
                Upload
              </label>

              <input
                type="file"
                hidden
                id="btnUpload"
                onChange={(event) => handleOnChangeFile(event)}
                onClick={(event) => (event.target.value = null)}
              />
            </div>
          </div>

          {preview && (
            <>
              <div className="preview-wrapper">
                <img className="preview-image" src={preview} />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UpdateBookFormControl;
