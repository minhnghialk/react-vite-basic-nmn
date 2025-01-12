import "./Update.Book.Form.Uncontrol.Module.css";
import { Modal, Form, Input, InputNumber, Select, notification } from "antd";
import { useState, useEffect } from "react";
import { updateBookAPI, hanldeUploadFileAPI } from "../../services/api.service";

const UpdateBookFormUncontrol = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  dataUpdate,
  setDataUpdate,
  loadBook,
}) => {
  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const handleUpdateBook = async (newThumbnail, values) => {
    const { id, mainText, author, price, quantity, category } = values;

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

  const handleSubmitBtn = async (values) => {
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
      await handleUpdateBook(newThumbnail, values);
    }
  };

  const resetAndCloseModal = () => {
    form.resetFields();
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
        onOk={() => form.submit()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        onText={"Update"}
      >
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={handleSubmitBtn}
        >
          <div className="form-content-wrapper">
            <Form.Item
              name="id"
              label="Id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input defaultValue="6673f7e5e5158280277d8b4c" disabled />
            </Form.Item>

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

export default UpdateBookFormUncontrol;
