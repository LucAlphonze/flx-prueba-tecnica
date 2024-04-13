import { Space, Table, Tag, Button, Row, Col, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import ModalComponent from "../modal/modal.jsx";
import { v4 as uuid } from "uuid";
import qs from "qs";

const { Search } = Input;
const getPages = (params) => ({
  _per_page: params.pagination?.pageSize,
  _page: params.pagination?.current,
  ...params,
});

function Tabla() {
  const [dataSource, setDataSource] = useState([]);
  const endPoint = "http://localhost:4000/users";
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    name: "",
    lastname: "",
    status: "",
    age: "",
    id: "",
    title: "",
    edit: false,
    delete: false,
  });
  const [id, setId] = useState();

  useEffect(() => {
    const query = `${endPoint}?${qs.stringify(getPages(tableParams))}`;
    fetchData(query);
  }, [JSON.stringify(tableParams)]);

  const fetchData = async (query) => {
    const fecthQuery = `${endPoint}?${qs.stringify(getPages(tableParams))}`;
    setLoading(true);
    const result = await fetch(query ? query : fecthQuery).then((res) =>
      res.json()
    );
    setDataSource([...result]);
    console.log("fetchData:", result, "query: ", query);
    setLoading(false);
    const total = await fetch(`${endPoint}`).then((res) => res.json());
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: total.length,
      },
    });
  };

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    if (formValues.edit === true) {
      await fetch(`${endPoint}/${formValues.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => setOpen(false))
        .then(() => {
          const foundIndex = dataSource.findIndex((e) => e.id === values.id);
          dataSource[foundIndex] = values;
          setDataSource([...dataSource]);
        });
    } else {
      await fetch(endPoint, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => setOpen(false))
        .then(() => {
          fetchData();
        });
    }
  };

  const onDelete = async () => {
    console.log(`endpoint : ${endPoint}/${id}`);
    await fetch(`${endPoint}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => setOpen(false))
      .then(async () => {
        const dataFiltrada = dataSource.filter((e) => e.id !== id);
        setDataSource([...dataFiltrada]);
        console.log("dataFiltrada", dataFiltrada);
        if (dataFiltrada.length === 0) {
          const previousTableParams = {
            pagination: {
              current: tableParams.pagination.current - 1,
              pageSize: 10,
            },
          };
          const query = `${endPoint}?${qs.stringify(
            getPages(previousTableParams)
          )}`;
          const result = await fetch(query).then((res) => res.json());
          setDataSource([...result]);
          setTableParams({
            ...tableParams,
            pagination: previousTableParams.pagination,
          });
        }
        setId("");
      });
  };

  const handleTableChange = (pagination, filters, sorter, extra) => {
    console.log(pagination, filters, sorter, "extra: ", extra);
    setFilterStatus(filters);
    setTableParams({
      pagination,
      ...sorter,
    });

    // // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   fetchData();
    // }
  };

  const handleDelete = (record) => {
    setOpen(true);
    setFormValues({
      username: record.username,
      email: record.email,
      name: record.name,
      lastname: record.lastname,
      status: record.status,
      age: record.age,
      id: record.id,
      title: "Eliminar usuario",
      edit: false,
      delete: true,
    });
    setId(record.id);
  };
  const handleAdd = () => {
    let idTemp = uuid();
    let uniqueId = idTemp.slice(0, 8);
    setFormValues({
      username: "",
      email: "",
      name: "",
      lastname: "",
      status: "",
      age: "",
      title: "",
      id: uniqueId,
      edit: false,
      delete: false,
    });
    setOpen(true);
  };
  const handleonClick = (record) => {
    setOpen(true);
    setFormValues({
      username: record.username,
      email: record.email,
      name: record.name,
      lastname: record.lastname,
      status: record.status,
      age: record.age,
      id: record.id,
      title: "Editar usuario",
      edit: true,
      delete: false,
    });
    // console.log("formValues: ", record);
  };

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          // console.log("value: ", value, "record", record),
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.lastname).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Estado",
      key: "status",
      align: "center",
      dataIndex: "status",
      filters: [
        { text: "ACTIVE", value: "Active" },
        { text: "INACTIVE", value: "inactive" },
      ],
      filteredValue: filterStatus.status || null,
      onFilter: (value, record) => String(record.status).includes(value),

      render: (_, { status }) => (
        <>
          {[status].map((status) => {
            let color = "green";
            if (status === "inactive") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Acciones",
      align: "center",
      colSpan: 1,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            key={`edit${record.id}`}
            onClick={() => handleonClick(record)}
          >
            Editar {record.name}
          </Button>
          <Button
            type="link"
            key={`delete${record.id}`}
            onClick={() => {
              handleDelete(record);
            }}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Space size="middle">
          <Col span={4}>
            <Search
              key={"search_input"}
              placeholder="input search text"
              onSearch={(value) => {
                setSearchText(value);
              }}
              style={{
                width: 200,
              }}
            />
          </Col>
          <Col span={4}>
            {/* <Select
              style={{
                width: 200,
              }}
              onChange={(e) => {
                console.log("filter: ", e);
                setFilterStatus(e);
              }}
              options={[
                { value: "inactive", label: "Inactive" },
                { value: "active", label: "Active" },
              ]}
            /> */}
          </Col>

          <Col span={4}>
            <Button type="primary" className="boton_end" onClick={handleAdd}>
              Agregar usuarios
            </Button>
          </Col>
        </Space>
      </Row>
      <Col span={24}>
        {dataSource && dataSource.length > 0 ? (
          <Table
            dataSource={dataSource}
            RowKey={(record) => record.id}
            columns={columns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        ) : (
          <p>no hay datos</p>
        )}
      </Col>

      <ModalComponent
        open={open}
        onCreate={onCreate}
        onDelete={onDelete}
        onCancel={() => setOpen(false)}
        formValues={formValues}
      />
    </div>
  );
}

export default Tabla;
