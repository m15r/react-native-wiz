# React Native Wiz
A beautiful Wizard for React Native because every app needs a proper introduction.

![React Native Wiz Preview](example/wiz.gif)

**React Native Wiz is in early development stage and has been tested exclusively on iOS. Use at your own risk.**

Installation
--- 
* npm: `npm install react-native-wiz`
* yarn: `yarn add react-native-wiz`

Add to the top of each component accessing the Wiz library.

```jsx
import Wiz from 'react-native-wiz'
```
 
Usage
---

### 1. Creating the Provider
Wrap your wizard(s) or whole application inside the Wiz provider e.g. inside App.js
```jsx
<Wiz.Provider>
  <View style={{ flex: 1 }}>
    <Text>My Amazing App</Text>
  </View>
</Wiz.Provider>
```

### 2. Adding your actions
Start wrapping each of the elements you want to be part of the wizard inside a `Wiz.View`. Make sure to provide a unique ID for each view.
```jsx
<Wiz.View
  id="example"
  autoPlay={true}
  completed={false}>
  <TouchableOpacity>
    <Text>My Button</Text>
  </TouchableOpacity>
</Wiz.View>
```

### 3. Handling completion
In order to complete an action, all you have to do is change the `completed` prop to `true`. Alternatively, you can use the `complete()` method.

```jsx
export default function MyComponent() {

  const [ completed, setCompleted ] = React.useState(false)

  const handlePress = () => {
    // Do something here
    setCompleted(true)
  }

  return (
    <Wiz.View  
      id="example"
      completed={completed}>
      <TouchableOpacity onPress={handlePress}>
        <Text>My Button</Text>
      </TouchableOpacity>
    </Wiz.View>
  )

}
```

Props
---

Prop          | Description   |
------------- | ------------- |
wiz           | ID of the wizard this action belongs to (optional). Use when you need multiple wizards
id            | A unique ID, required for each action
enabled       | Enable or disable the action. Defaults to `true`
autoPlay      | Boolean determining whether or not the wizards should start by itself. Use with care and only on the first action in a wizard. Defaults to `false`
queue         | Position in queue. Use this to configure the playing order. Defaults to `0`
completed     | After setting this prop to true the next action will appear
text          | Text describing your action
textOffset    | Offset from component position (object) `{ x: int, y: int }`
textStyle     | Styling for `Text` component (object)
image         | Description image source (optional)
imageHeight   | Height of the image. Defaults to `100`
imageWidth    | Width of the image. Defaults to `100`
imageOffset   | Offset from component position (object) `{ x: int, y: int }`
customComponent | Custom component to render
customComponentOffset | Offset from component position (object) `{ x: int, y: int }`
delay         | Time in ms after which the action should appear. Defaults to `0`
onActive      | Function. Runs when the action becomes active
onComplete    | Function. Runs when the action has completed
style         | Inherited from `View` (object)

Methods
---

### show()
Shows the `Wiz.View`.

### complete()
Same funcionality as the `completed` prop. Running this method will mark the action as complete and show the next action in queue.
