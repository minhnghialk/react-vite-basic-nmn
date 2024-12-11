import "./User.Table.Module.css";
import { Table, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./Update.User.Modal";
import { useState } from "react";
import ViewUserDetailModal from "./View.User.Detail.Modal";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = ({
  loadUser,
  dataUsers,
  current,
  pageSize,
  total,
  setCurrent,
  setPageSize,
}) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] =
    useState(false);

  const handleDeleteUser = async (id) => {
    const response = await deleteUserAPI(id);

    if (response.data) {
      notification.success({
        message: "Success",
        description: "Delete user successfully",
      });

      await loadUser();
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(response.message),
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a
            href="#"
            onClick={() => {
              setDataDetail(record);
              setIsModalDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        </>
      ),
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
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
            title="Delete the user"
            description="Are you sure to delete this user?"
            open={isModalConfirmDeleteOpen}
            onConfirm={() => handleDeleteUser(record._id)}
            onCancel={() => setIsModalConfirmDeleteOpen(false)}
            okText="Delete"
            cancelText="Cancel"
            placement="topLeft"
          >
            <DeleteOutlined
              className="action-icon delete-icon"
              onClick={() => setIsModalConfirmDeleteOpen(true)}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    // Nếu thay đổi trang: current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }

    // Nếu thay đổi tổng số phần tử: pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  return (
    <>
      <h1 className="user-table-title">User List Table</h1>

      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: 1,
          pageSize: 5,
          showSizeChanger: true,
          total: 99,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} on {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
        // pagination={{
        //   current: current,
        //   pageSize: pageSize,
        //   showSizeChanger: true,
        //   total: total,
        //   showTotal: (total, range) => {
        //     return (
        //       <div>
        //         {" "}
        //         {range[0]}-{range[1]} on {total} rows
        //       </div>
        //     );
        //   },
        // }}
      />

      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      <ViewUserDetailModal
        isModalDetailOpen={isModalDetailOpen}
        setIsModalDetailOpen={setIsModalDetailOpen}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
