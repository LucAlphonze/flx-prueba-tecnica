import React, { useState } from "react";
import { Modal } from "antd";
import FormComponent from "../formulario/form";

const ModalComponent = ({
  open,
  onCreate,
  onDelete,
  onCancel,
  initialValues,
  formValues,
}) => {
  const [formInstance, setFormInstance] = useState();
  if (formValues.delete === true) {
    return (
      <Modal
        open={open}
        title={formValues.title}
        okText="Eliminar"
        cancelText="Cancelar"
        onCancel={onCancel}
        destroyOnClose
        onOk={async () => {
          onDelete(formValues.id);
        }}
        okButtonProps={{
          danger: true,
        }}
      >
        <p>
          ¿Está seguro que queres borrar a{" "}
          <span
            style={{
              color: "#E23336",
            }}
          >
            {formValues.username}
          </span>{" "}
          ?
        </p>
      </Modal>
    );
  } else {
    return (
      <Modal
        open={open}
        title={formValues.title ? formValues.title : "Agregar usuario"}
        okText={formValues.title ? formValues.title : "Crear usuario"}
        cancelText="Cancelar"
        okButtonProps={{
          autoFocus: true,
        }}
        onCancel={onCancel}
        destroyOnClose
        onOk={async () => {
          try {
            const values = await formInstance?.validateFields();
            formInstance?.resetFields();
            onCreate(values);
            console.log("values", values);
          } catch (error) {
            console.log("Failed:", error);
          }
        }}
      >
        <FormComponent
          initialValues={initialValues}
          formValues={formValues}
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          }}
        />
      </Modal>
    );
  }
};

export default ModalComponent;
