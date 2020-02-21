# React Native Wiz
A beautiful Wizard for React Native

__This package is in early development and experimental. Use at your own risk.__
 
Installation
--- 
* npm: `npm install react-native-wiz`
* yarn: `yarn add react-native-wiz`

```jsx
import Wiz from 'react-native-wiz'
```
 
Usage
---

1. Wrap your wizard(s) or whole application inside the Wiz provider e.g. inside App.js
```jsx
<Wiz.Provider>
 <View style={{ flex: 1 }}>
  <Text>My Amazing App</Text>
 </View>
</Wiz.Provider>
```

2. Start wrapping each of the elements you want to be highlighted inside a `<Wiz.Item>`. Make sure to provide a unique ID for each new item.
```jsx
<Wiz.Item
 id="exampleItem">
 <TouchableOpacity>
  <Text>My Button</Text>
 </TouchableOpacity>
</Wiz.Item>
```

3. Add Wiz controls anywhere in your application, inside the `<Wiz.Provider`.
```jsx
<Wiz.Controls
 id="exampleWizard"
 items={[ 'exampleItem' ]}
 autoPlay={true}
 onComplete={/* function to run upon wizard completion */} />
```

Controls Props
---

| Prop          | Description |
| ------------- | ------------- |
| id            | A unique ID required for each new wizard |
| items         | Array containing item ids. Adding these will create the wizard |
| autoPlay      | Start playing directly after creation (boolean). Default value is `false` |
| onComplete    | Function, runs when last item is complete. Use this to implement your own logic, such as storing a parameter preventing the wizard from playing the next time the app starts. |

Item Props
---

| Prop          | Description   |
| ------------- | ------------- |
| id            | A unique ID required for each item |
| image         | Description image URI |
| imageOffset   | Image offset from item pos (object) `{ x: int, y: int }` |
