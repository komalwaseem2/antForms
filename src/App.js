import logo from './logo.svg';
import './App.css';
import { Form, Input, Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

function App() {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: 'Please enter a valid email!',
      number: '${label} is not a valid number!',
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
   // alert(`Success: ${JSON.stringify(values)}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
   // alert(`Failed: ${JSON.stringify(errorInfo)}`);
  };

  const validatePassword=(_,str)=>{
    const hasAlphabet = /[a-zA-Z]/.test(str);
    const hasNumber = /[0-9]/.test(str);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>//]/.test(str);
  
    if(!str || ( hasAlphabet && hasNumber && hasSpecialChar))
      return Promise.resolve();

   return Promise.reject(new Error('Password must contain at least one number, one alphabet and one special character!'));
  }

  const confirmPassword=(_,str)=>{  
    if( str && str != form.getFieldValue("password"))
      return Promise.reject(new Error('Passwords do not match!'));
     
    return Promise.resolve();  
  }

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
          label="Username"
          name="username"
          rules={[
            { 
              required: true
            },
            { 
              min: 3,
              max: 20, 
              message: 'Please enter a username between 3 and 20 characters!' 
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { 
              required: true 
            },
            { 
              type: 'email'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
        name="gender" 
        label="Gender" 
        rules={[{ required: true }]}
        validateTrigger={['onChange', 'onBlur']}
        >
        <Select
          placeholder="Select gender"
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { 
              required: true, 
            },
            {
              validator: validatePassword
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { 
              required: true, 
            },
            {
              validator: confirmPassword
            }
          ]}
        >
          <Input.Password />
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
    </div>
  );
}

export default App;
