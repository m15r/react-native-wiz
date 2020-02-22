# React Native Wiz
A beautiful Wizard for React Native, because every app needs a proper introduction.

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

#### 1. Creating the Provider
Wrap your wizard(s) or whole application inside the Wiz provider e.g. inside App.js
```jsx
<Wiz.Provider>
  <View style={{ flex: 1 }}>
    <Text>My Amazing App</Text>
  </View>
</Wiz.Provider>
```

#### 2. Adding your actions
Start wrapping each of the elements you want to be part of the wizard inside a `Wiz.View`. Make sure to provide a unique ID for each view.
```jsx
<Wiz.View
  wiz="default"
  id="example"
  enabled={true}
  autoPlay={true}
  completed={false}>
  <TouchableOpacity>
    <Text>My Button</Text>
  </TouchableOpacity>
</Wiz.View>
```

#### 3. Handling completion
You'll probably want your usual component action to mark the wizard action as completed. By default, actions are passed through along with the `Wiz.View`. This means all you have to do is change the `completed` prop to `true`, or use the `complete()` method.

Props
---

| Prop          | Description   |
| ------------- | ------------- |
| wiz           | The ID of the wizard this item belongs to (optional). Use this when you need multiple wizards |
| id            | A unique ID, required for each item |
| enabled       | Enable or disable the item. Defaults to `true` |
| autoPlay      | Boolean determining whether or not the wizards should start by itself. Use with care and only on the first item in a wizard. Defaults to `false` | 
| queue         | Position in queue. Use this to configure the playing order. Defaults to `0` |
| completed     | After setting this prop to true the next item will appear |
| text          | Text describing your action |
| textOffset    | Offset from component position (object) `{ x: int, y: int }` |
| textStyle     | Styling for `Text` component (object) |
| image         | Description image source (optional) |
| imageHeight   | Height of the image. Defaults to `100` |
| imageWidth    | Width of the image. Defaults to `100` |
| imageOffset   | Offset from component position (object) `{ x: int, y: int }` |
| customComponent | ... |
| customComponentOffset | ... |
| delay         | Time in ms after which in item should show. Defaults to `0` |
| onActive      | Function. Runs when the item becomes active |
| style         | Inherited from `View` (object) |

Methods
---

Methods can be accessed using a component ref.

```jsx
let myWizView = null

export default function MyComponent() {

  const doSomething = () => {
    if (myWizView !== null) {
      // Marking this action as complete
      myWizView.complete()
    }
  }

  return (
    <Wiz.View  
      id="example"
      ref={ref => myWizView = ref}>
      <TouchableOpacity onPress={doSomething}>
        <Text>My Button</Text>
      </TouchableOpacity>
    </Wiz.View>
  )

}
```

### show()
Shows the `Wiz.View`.

### complete()
Same funcionality as the `completed` prop. Running this method will mark the action as complete and show the first next action in queue. If there are no actions left, the `onWizComplete` prop will run on each `Wiz.View` component.
