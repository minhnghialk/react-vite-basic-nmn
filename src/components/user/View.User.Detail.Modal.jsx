import "./View.User.Detail.Modal.Module.css";
import { Drawer, Button, notification } from "antd";
import { useState } from "react";
import {
  hanldeUploadFileAPI,
  updateUserAvatarAPI,
} from "../../services/api.service";

const ViewUserDetailModal = ({
  isModalDetailOpen,
  setIsModalDetailOpen,
  dataDetail,
  setDataDetail,
  loadUser,
}) => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState(undefined);

  const handleOnChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      setPreview(undefined);
      return;
    }

    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUserAvatar = async () => {
    const responseUpload = await hanldeUploadFileAPI(selectedFile, "avatar");
    if (responseUpload.data) {
      const newAvatar = responseUpload.data.fileUploaded;

      const responseUpdateAvatar = await updateUserAvatarAPI(
        dataDetail._id,
        newAvatar
      );

      if (responseUpdateAvatar.data) {
        setIsModalDetailOpen(false);
        setSelectedFile(undefined);
        setPreview(undefined);
        await loadUser();

        notification.success({
          message: "Success",
          description: "Avatar changed successfully",
        });
      } else {
        notification.error({
          message: "Error",
          description: JSON.stringify(responseUpdateAvatar.message),
        });
      }

      notification.success({
        message: "Success",
        description: "File uploaded successfully",
      });
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(responseUpload.message),
      });
    }
  };

  return (
    <Drawer
      width={"40vw"}
      title="User Details"
      onClose={() => {
        setDataDetail(null);
        setIsModalDetailOpen(false);
      }}
      open={isModalDetailOpen}
    >
      {dataDetail ? (
        <>
          <div className="user-detail-wrapper">
            <p>ID: {dataDetail._id}</p>
            <p>Avatar:</p>
            <div className="user-avatar-wrapper">
              <div>
                {preview && (
                  <div className="preview-wrapper">
                    <p>Preview:</p>
                    <div className="user-avatar">
                      <img src={preview} />
                    </div>
                    <Button
                      className="save-image-btn"
                      onClick={handleUpdateUserAvatar}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
              <div className="user-avatar">
                <img src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/202262001_2531109053701182_2072114303732310457_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHJpwsHoP513VDZ0ny_N0_lR-_UugVBbk5H79S6BUFuToAXJcmkEspmHAblcTD2SWB5LBxYYZYI_gEAkquLt_RY&_nc_ohc=qfviNuqvOr8Q7kNvgF7Ybwd&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AIFWPuaDMQnNgXazv_cnRUl&oh=00_AYAlV66kHILC6ZGyF0PEnDFmj-G6yPQH27LRpH-BDJN7lw&oe=6777273E" />
                {/* <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  dataDetail.avatar
                }`}
              /> */}
              </div>
            </div>

            <label htmlFor="uploadBtn" className="upload-btn">
              Upload Avatar
            </label>
            <input
              type="file"
              id="uploadBtn"
              accept="image/png, image/jpeg"
              onChange={handleOnChangeFile}
              hidden
            />

            <p>Full name: {dataDetail.fullName}</p>
            <p>Email: {dataDetail.email}</p>
            <p>Phone number: {dataDetail.phone}</p>
          </div>
        </>
      ) : (
        <>
          <p>No data to displayÏ</p>
        </>
      )}
    </Drawer>
  );
};

export default ViewUserDetailModal;
