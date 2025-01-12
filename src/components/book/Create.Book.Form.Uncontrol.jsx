import "./Create.Book.Form.Uncontrol.Module.css";
import { Modal, Form, Input, InputNumber, Select, notification } from "antd";
import { useState } from "react";
import { createBookAPI, hanldeUploadFileAPI } from "../../services/api.service";

const CreateBookFormUncontrol = ({
  isCreateOpen,
  setIsCreateOpen,
  loadBook,
}) => {
  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async (values) => {
    console.log(values);

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
      const { mainText, author, price, quantity, category } = values;

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
    form.resetFields();
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
        onOk={() => form.submit()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        onText={"Create"}
      >
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={handleSubmitBtn}
        >
          <div className="form-content-wrapper">
            <Form.Item
              name="mainText"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Title can't be empty!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="author"
              label="Author"
              rules={[
                {
                  required: true,
                  message: "Author can't be empty!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price can't be empty!",
                },
              ]}
            >
              <InputNumber className="input-number-full" addonAfter={" đ"} />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Quantity can't be empty!",
                },
              ]}
            >
              <InputNumber className="input-number-full" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Category can't be empty!",
                },
              ]}
            >
              <Select
                className="select-full"
                options={[
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
            </Form.Item>

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
        </Form>
      </Modal>
    </>
  );
};

export default CreateBookFormUncontrol;
