import {Button, Form, Input} from 'antd';
import {useEffect} from "react";

const CreateForm = ({updateData, handleActions}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (updateData) {
            form.setFieldsValue({
                name: updateData.name,
                properties: JSON.stringify(updateData.properties, null, 2)
            })
        }
        return () => form.resetFields();
    }, [form, updateData, updateData?.id, updateData?.name, updateData?.properties])

    const onFinish = async (data) => {
        if (updateData) {
            handleActions({action: 'update', data: {id: updateData.id, name: data.name, properties: JSON.parse(data.properties)}})
            form.resetFields();
        } else {
            handleActions({action: 'create', data})
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={updateData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input name',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="properties"
                    name="properties"
                    rules={[
                        {
                            required: true,
                            message: 'Please input properties',
                        },
                        {
                            validator: async (_, value) => {
                                try {
                                    JSON.parse(value)
                                } catch (e) {
                                    throw new Error('Please enter valid JSON');
                                }
                            },
                        },
                    ]}
                >
                    <Input.TextArea autoSize={{minRows: 8}}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default CreateForm;