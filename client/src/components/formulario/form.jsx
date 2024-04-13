import React, { useEffect } from "react";
import { Form, Input, Row, Col, Select } from "antd";

const FormComponent = ({ initialValues, onFormInstanceReady, formValues }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, [form, onFormInstanceReady]);

  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Usuario"
            name="username"
            style={{
              fontWeight: 600,
            }}
            rules={[
              {
                required: true,
                message: "Por favor introduzca su nombre de usuario!",
              },
            ]}
            initialValue={formValues.username}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Por favor introduzca su email!",
              },
            ]}
            initialValue={formValues.email}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor introduzca su nombre!",
              },
            ]}
            initialValue={formValues.name}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Apellido"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Por favor introduzca su apellido!",
              },
            ]}
            initialValue={formValues.lastname}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Estado"
            name="status"
            rules={[
              {
                required: true,
                message: "Por favor introduzca su estado!",
              },
            ]}
            initialValue={formValues.status}
          >
            <Select
              options={[
                { value: "inactive", label: "Inactive" },
                { value: "Active", label: "Active" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Edad"
            name="age"
            rules={[
              {
                required: true,
                message: "Por favor introduzca su edad!",
              },
            ]}
            initialValue={formValues.age}
          >
            <Input />
          </Form.Item>
        </Col>
        <Form.Item
          label="Id"
          name="id"
          rules={[
            {
              required: true,
              message: "Por favor introduzca su id!",
            },
          ]}
          hidden
          initialValue={formValues.id}
        >
          <Input />
        </Form.Item>
      </Row>
    </Form>
  );
};

export default FormComponent;
