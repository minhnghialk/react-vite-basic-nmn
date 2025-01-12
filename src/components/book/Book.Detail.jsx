import { Drawer } from "antd";

const BookDetail = ({
  dataDetail,
  setDataDetail,
  isDetailOpen,
  setIsDetailOpen,
}) => {
  return (
    <Drawer
      width={"40vw"}
      title="Book Details"
      onClose={() => {
        setDataDetail(null);
        setIsDetailOpen(false);
      }}
      open={isDetailOpen}
    >
      {dataDetail ? (
        <>
          <div className="book-detail-wrapper">
            <p>ID: {dataDetail._id}</p>
            <br />
            <p>Title: {dataDetail.mainText}</p>
            <br />
            <p>Author: {dataDetail.author}</p>
            <br />
            <p>Category: {dataDetail.category}</p>
            <br />
            <p>
              Price:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataDetail.price)}
            </p>
            <br />
            <p>Quantity: {dataDetail.quantity}</p>
            <br />
            <p>Sold: {dataDetail.sold}</p>
            <br />
            <p>Thumbnail:</p>
            <div
              style={{
                width: "150px",
                height: "100px",
                border: "1px solid #ccc",
                marginTop: "10px",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/books/${
                  dataDetail.thumbnail
                }`}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <p>No data to display</p>
        </>
      )}
    </Drawer>
  );
};

export default BookDetail;
