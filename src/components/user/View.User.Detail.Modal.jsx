import "./View.User.Detail.Modal.Module.css";
import { Drawer, Button } from "antd";

const ViewUserDetailModal = ({
  isModalDetailOpen,
  setIsModalDetailOpen,
  dataDetail,
  setDataDetail,
}) => {
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
            <div className="user-avatar">
              <p>Avatar:</p>
              <img
                width={152}
                height={152}
                src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/202262001_2531109053701182_2072114303732310457_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHJpwsHoP513VDZ0ny_N0_lR-_UugVBbk5H79S6BUFuToAXJcmkEspmHAblcTD2SWB5LBxYYZYI_gEAkquLt_RY&_nc_ohc=qfviNuqvOr8Q7kNvgF7Ybwd&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AIFWPuaDMQnNgXazv_cnRUl&oh=00_AYAlV66kHILC6ZGyF0PEnDFmj-G6yPQH27LRpH-BDJN7lw&oe=6777273E"
              />
              {/* <img
                width={200}
                height={200}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  dataDetail.avatar
                }`}
              /> */}
              
              <label htmlFor="uploadBtn" className="upload-btn">Upload Avatar</label>
              <input
                type="file"
                id="uploadBtn"
                hidden
              />
            </div>
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
