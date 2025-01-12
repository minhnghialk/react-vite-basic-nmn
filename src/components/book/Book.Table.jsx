import "./Book.Table.Module.css";
import { Table, Popconfirm, Button, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { fetchAllBookAPI, deleteBookAPI } from "../../services/api.service";
import BookDetail from "../../components/book/Book.Detail";
import CreateBookFormUncontrol from "./Create.Book.Form.Uncontrol";
// import CreateBookFormControl from "./Create.Book.Form.Control";
import UpdateBookFormUncontrol from "./Update.Book.Form.Uncontrol";
// import UpdateBookFormControl from "./Update.Book.Form.Control";

const BookTable = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  const loadBook = async () => {
    const response = await fetchAllBookAPI(current, pageSize);

    if (response.data) {
      setDataBook(response.data.result);
      setCurrent(response.data.meta.current);
      setPageSize(response.data.meta.pageSize);
      setTotal(response.data.meta.total);
    }
  };

  const handleDeleteBook = async (id) => {
    const response = await deleteBookAPI(id);
    if (response.data) {
      notification.success({
        message: "Success",
        description: "Delete a book successfully!",
      });

      await loadBook();
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(response.message),
      });
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // setCurrent, setPageSize
    // nếu thay đổi trang: current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current); // "5" => 5
      }
    }

    // nếu thay đổi tổng số phần tử: pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize); // "5" => 5
      }
    }
  };

  const dataBooks = [
    {
      _id: "666972af95e4a81f9eebf61",
      mainText: "Sách Tư Duy Ngược Dịch Chuyển Thế Giới",
      price: 127000,
      quantity: 1000,
      author: "Adam Grant",
    },

    {
      _id: "666972af95e4a81f9eebf5a",
      mainText: "Tiền Đẻ Ra Tiền Đầu Tư Tài Chính Thông Minh",
      price: 80000,
      quantity: 1000,
      author: "Ducan Bannatyne",
    },

    {
      _id: "666972af95e4a81f9eebf5b",
      mainText:
        "Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn",
      price: 70000,
      quantity: 1000,
      author: "Jonathan Clements",
    },

    {
      _id: "666972af95e4a81f9eebf62",
      mainText: "Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu",
      price: 52000,
      quantity: 1000,
      author: "Nhà sách Nam Trung",
    },

    {
      _id: "666972af95e4a81f9eebf63",
      mainText: "Cẩm Nang Du Lịch - Mỹ",
      price: 292000,
      quantity: 1000,
      author: "Dorling Kindersley Limited",
    },
  ];

  const columns = [
    {
      title: "Numberical Order",
      render: (_, record, index) => <>{index + 1 + (current - 1) * pageSize}</>,
    },

    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a
            href="#"
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        </>
      ),
    },

    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record, index, action) => {
        if (text) {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <div className="action-wrapper">
          <EditOutlined
            className="action-icon edit-icon"
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
          />
          <Popconfirm
            title="Delete Book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined className="action-icon delete-icon" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="book-table-header">
        <h1 className="book-table-title">Book Table</h1>
        <Button type="primary" onClick={() => setIsCreateOpen(true)}>
          Create Book
        </Button>
      </div>

      <Table
        dataSource={dataBooks}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} on {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      <BookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />

      <CreateBookFormUncontrol
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        loadBook={loadBook}
      />

      {/* <CreateBookFormControl
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        loadBook={loadBook}
      /> */}

      <UpdateBookFormUncontrol
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      />

      {/* <UpdateBookFormControl
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      /> */}
    </>
  );
};

export default BookTable;
