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

#### 2. Adding your items
Start wrapping each of the elements you want to be highlighted inside a `<Wiz.Item>`. Make sure to provide a unique ID for each component.
```jsx
<Wiz.Item
  wiz="default"
  id="example"
  enabled={true}
  autoPlay={true}
  completed={false}>
  <TouchableOpacity>
    <Text>My Button</Text>
  </TouchableOpacity>
</Wiz.Item>
```

#### 3. Handling completion
You'll probably want your usual component action to complete the the wizard step. By default, actions are passed through along with the Wiz comonent. All you have to do is set the `completed` prop to true on `Wiz.Item` , or use the `complete()` method, in order to move on to the next step.

Props
---

| Prop          | Description   |
| ------------- | ------------- |
| wiz           | The ID of the wizard this item belongs to (optional). Use this when you need multiple wizards |
| id            | A unique ID, required for each item |
| enabled       | Enable or disable the item. Defaults to `true` |
| autoPlay      | Boolean determining whether or not the wizards hould start by itself. Use with care and only on the first item in a wizard. Defaults to `false` | 
| queue         | Position in queue. Use this to configure the playing order. Defaults to `0` |
| completed     | After setting this prop to true the next item will appear |
| image         | Description image source (optional) |
| imageOffset   | Image offset from item pos (object) `{ x: int, y: int }` |
| delay         | Time in ms after which in item should show. Defaults to `0` |
| onActive      | Function. Runs when the item becomes active |

Methods
---

Methods can be accesed through the component ref.

```jsx
onSomething() {
  myWizardItem.show()
}

return (
  <Wiz.Item  
    id="example"
    ref={ref => myWizardItem = ref}>
    ...
  </Wiz.Item>
)
```

### show()
Shows the item.

### complete()
Same funcionality as the `completed` prop. Running this method will mark the item as complete and show the first next item in queue. If there are no items left in the queue, the `onWizComplete` prop will run on each Item component.

Using multiple wizards
---

You can easily add multiple wizards.

1. Add a `wiz` prop to each item to attach it to the appropriate wizard like so:

```jsx
...
<Wiz.Item
  wiz="myWizardA"
  id="myAwesomeButton">
  ...
</Wiz.Item>
...
```

2. Next, determine the order/position in queue for each item using the `queue` prop in ascending order. Using the same queue position twice will result in unexpected behavior.

```jsx
...
<ComponentA>
 <Wiz.Item
   wiz="myWizardA"
   id="myAwesomeButton"
   queue={1}>
   ...
 </Wiz.Item>
 <Wiz.Item
   wiz="myWizardA"
   id="myAwesomeMenu"
   queue={2}>
   ...
 </Wiz.Item>
</ComponentA>
<ComponentB>
 <Wiz.Item
   wiz="myWizardB"
   id="myAwesomeMenu"
   queue={3}>
   ...
 </Wiz.Item>
</ComponentB>
...
```

This way, `myAwesomeMenu` will not appear until `myAwesomeButton` is completed.
