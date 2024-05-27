import logo from './logo.svg';
import './App.css';
import { Form, Input, Button, Select, Checkbox, Radio, TreeSelect, Cascader, DatePicker, InputNumber, Switch, Slider, ColorPicker } from 'antd';
import { Option } from 'antd/es/mentions';
import { useWatch } from 'antd/es/form/Form';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useState } from 'react';
import { toBeRequired } from '@testing-library/jest-dom/matchers';
import TextArea from 'antd/es/input/TextArea';

function Form2() {
  const [form] = Form.useForm();


  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: 'Please enter a valid email!',
      number: 'Please enter a valid number!',
    }
  };

  const onFinish = (values) => {
    setMessage("Form submitted by "+fname+" "+lname)
    console.log('Success:', values);
   // alert(`Success: ${JSON.stringify(values)}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
   // alert(`Failed: ${JSON.stringify(errorInfo)}`);
  };

  const fname = useWatch("firstName",form);
  const lname = useWatch("lastName",form);

  const [message,setMessage] = useState();

  return (
    <div className="App">
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >

        <Form.Item
        label="First Name"First
        name="firstName"
        rules={[
            {
                required: true
            },
            {
                min:2,
                message:"Please enter a name with at least 2 characters."
            }
        ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
            {
                required: true
            },
            {
                min:2,
                message:"Please enter a name with at least 2 characters."
            }
        ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
         label="Location"
         name="location"
         rules={[
            {
                required:true
            }
         ]}
         >
          <TreeSelect
            treeData={[
              { title: 'Pakistan', value: 'pakistan', children: [{ title: 'Lahore', value: 'lahore' },{ title: 'Karachi', value: 'karachi' }] },
              { title: 'USA', value: 'usa', children: [{ title: 'New York', value: 'newyork' }] },
            ]}
          />
        </Form.Item>

        <Form.Item
         label="Location"
         name="location2"
         rules={[
            {
                required:true
            }
         ]}
         >
          <Cascader
            options={[
              {
                value: 'pakistan',
                label: 'Pakistan',
                children: [
                    {
                      value: 'punjab',
                      label: 'Punjab',
                      children:[
                        {
                            value: 'lahore',
                            label: 'Lahore',
                        }
                      ]
                    },
                    {
                      value: 'sindh',
                      label: 'Sindh',
                      children:[
                        {
                            value: 'karachi',
                            label: 'Karachi',
                        }
                      ]
                    },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item
         label="Gender"
         name="gender"
         rules={[{required:true}]}
         >
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Date"
        name="date"
        rules={[{required:true}]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Age"
        name="age"
        rules={[
            {
                required:true
            },
            {
                min: 0,
                max: 120,
                type: 'number',
                message: "Please enter a valid age!"
            }
        ]}>
            <InputNumber/>
        </Form.Item>

        <Form.Item label="Rating" name="rating" rules={[{required:true}]}>
          <Slider />
        </Form.Item>

        <Form.Item label="Color" name="colorpicker" rules={[{required:true}]}>
          <ColorPicker />
        </Form.Item>

        <Form.Item label="Comments"
        name="comments">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Show my comments" valuePropName="showCommentsSwitch">
          <Switch />
        </Form.Item>

        <Form.Item
            label="Terms and Conditions"
            name="checkbox"
            valuePropName="checked"
        >
            <Checkbox>I agree to the terms and conditions.</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={()=>form.resetFields()}>
            Reset
          </Button>
        </Form.Item>
      </Form>

      
      <label>{message}</label>
    </div>
  );
}

export default Form2;
