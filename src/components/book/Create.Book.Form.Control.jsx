import "./Create.Book.Form.Control.Module.css";
import { useState } from "react";
import { notification, Modal, Input, InputNumber, Select } from "antd";
import { createBookAPI, hanldeUploadFileAPI } from "../../services/api.service";

const CreateBookFormControl = ({ isCreateOpen, setIsCreateOpen, loadBook }) => {
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error",
        description: "Please upload thumbnail image",
      });

      return;
    }

    //step 1: upload file
    const responseUpload = await hanldeUploadFileAPI(selectedFile, "book");

    if (responseUpload.data) {
      //success
      const newThumbnail = responseUpload.data.fileUploaded;
      //step 2: creat book
      const responseBook = await createBookAPI(
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
          description: "Create a new book successfully!",
        });
      } else {
        notification.error({
          message: "Error",
          description: JSON.stringify(responseBook.message),
        });
      }
    } else {
      // failed
      notification.error({
        message: "Error",
        description: JSON.stringify(responseUpload.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
    setIsCreateOpen(false);
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
        title="Create Book"
        open={isCreateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        onText={"Create"}
      >
        <div className="form-content-wrapper">
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

export default CreateBookFormControl;
