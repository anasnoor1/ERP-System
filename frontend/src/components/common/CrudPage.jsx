import { useState } from 'react';
import { Typography, Button, Table, Space, Modal, Form, Popconfirm, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import useCrud from '../../hooks/useCrud';

export default function CrudPage({ title, endpoint, columns, formFields, searchPlaceholder = 'Search...' }) {
  const { data, loading, pagination, fetchData, create, update, remove, handleTableChange } = useCrud(endpoint);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editing) await update(editing._id, values);
    else await create(values);
    setModalOpen(false);
    form.resetFields();
    setEditing(null);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const actionColumn = {
    title: 'Actions', key: 'actions', width: 120,
    render: (_, record) => (
      <Space>
        <Button type="link" icon={<EditOutlined />} onClick={() => openEdit(record)} />
        <Popconfirm title="Delete this record?" onConfirm={() => remove(record._id)}>
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>{title}</Typography.Title>
        <Space>
          <Input.Search placeholder={searchPlaceholder} allowClear onSearch={(v) => fetchData({ search: v })}
            style={{ width: 250 }} prefix={<SearchOutlined />} />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>
            Add New
          </Button>
        </Space>
      </div>
      <Table dataSource={data} columns={[...columns, actionColumn]} loading={loading} rowKey="_id"
        pagination={{ ...pagination, showSizeChanger: true, showTotal: (t) => `Total: ${t}` }}
        onChange={handleTableChange} scroll={{ x: 800 }} />
      <Modal title={editing ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}
        open={modalOpen} onOk={handleSubmit} onCancel={() => { setModalOpen(false); setEditing(null); }}
        destroyOnClose width={600}>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          {formFields}
        </Form>
      </Modal>
    </div>
  );
}
