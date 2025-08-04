# Form Components

This directory contains reusable form components that integrate with React Hook Form.

## Input Component

The `Input` component is a flexible form input that works with React Hook Form's `Controller` component to provide form validation and state management.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | Field name to register with React Hook Form |
| control | Control | Yes | React Hook Form's control object |
| rules | object | No | Validation rules for the field |
| styles | object | No | Custom styles for container, input, and error message |
| rightItem | ReactNode | No | Component to display on the right side of the input |
| children | ReactElement | No | Custom input component to use instead of TextInput |
| ...restProps | TextInputProps | No | Any additional props for TextInput |

### Basic Usage

```tsx
import { useForm } from 'react-hook-form';
import Input from '@components/ui/forms/Input';
import { View, Button } from 'react-native';

function LoginForm() {
  const { control, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View>
      <Input
        name="username"
        control={control}
        placeholder="Username"
        rules={{ required: 'Username is required' }}
      />
      
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

### Custom Styling

```tsx
import { useForm } from 'react-hook-form';
import Input from '@components/ui/forms/Input';
import { View } from 'react-native';

function StyledForm() {
  const { control } = useForm();
  
  return (
    <View>
      <Input
        name="email"
        control={control}
        placeholder="Email"
        styles={{
          container: { marginBottom: 16 },
          input: { borderRadius: 8, backgroundColor: '#f5f5f5' },
          error: { color: 'red', fontWeight: 'bold' }
        }}
        rules={{ required: 'Email is required' }}
      />
    </View>
  );
}
```

### With Right Item

```tsx
import { useForm } from 'react-hook-form';
import Input from '@components/ui/forms/Input';
import { View, TouchableOpacity, Text } from 'react-native';

function PasswordInput() {
  const { control } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View>
      <Input
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry={!showPassword}
        rightItem={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        }
        rules={{ required: 'Password is required' }}
      />
    </View>
  );
}
```

### With Custom Child Component

```tsx
import { useForm } from 'react-hook-form';
import Input from '@components/ui/forms/Input';
import { View, TextInput } from 'react-native';

function CustomInputExample() {
  const { control } = useForm();
  
  return (
    <View>
      <Input
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
      >
        <TextInput 
          style={{ height: 100, textAlignVertical: 'top' }}
          multiline
          placeholder="Enter description here..."
        />
      </Input>
    </View>
  );
}
```

### Default vs Custom Child Component

The Input component can be used in two ways:

1. **Default Mode**: Uses the standard TextInput component
   ```tsx
   <Input
     name="email"
     control={control}
     placeholder="Email"
     keyboardType="email-address"
   />
   ```

2. **Custom Child Mode**: Uses a custom component you provide
   ```tsx
   <Input
     name="message"
     control={control}
   >
     <TextInput
       multiline
       numberOfLines={4}
       placeholder="Enter your message"
       textAlignVertical="top"
     />
   </Input>
   ```

The component automatically detects whether you've provided a child component and renders accordingly, while still maintaining form integration.