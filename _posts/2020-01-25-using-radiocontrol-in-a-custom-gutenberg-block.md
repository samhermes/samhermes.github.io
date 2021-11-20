---
title: Using RadioControl in a custom Gutenberg block
date: 2020-01-25 21:52:00 Z
---

Why was this so complicated? So much of developing with Gutenberg is simply finding all of the necessary bits of information to bring it all together. The official documentation is a little sparse on the [RadioControl](https://developer.wordpress.org/block-editor/components/radio-control/) front. It seems directed more towards the core developers. Which, is fine, but I think it’s really cool and want to use it too.

The first question: how do we get this component added to our block? Here, the official documentation is helpful.

`import { RadioControl } from '@wordpress/components';`

Next, we need to add an attribute to the block to store the value of the RadioControl. Here, the documentation wasn’t very clear. What type of attribute should it be? What other arguments might it need?

Also, how is a default value set? The documentation stresses the need to have one. It is simply though the `default` argument, and then the slug of the radio option.

```js
attributes: {
  radio: {
    type: 'string',
    default: 'option-one',
  },
},
```

Very simple in hindsight, but hard to figure out when an example is hard to come by.

Now, on to actually adding the `RadioControl` to the block. Inside of the edit function, and inside of `InspectorControls`, we add a `RadioControl`.

```js
<RadioControl
  label={__('Radio control', 'textdomain')}
  help="Description of radio control"
  selected={ radio }
  options={ [
    { label: 'Option One', value: 'option-one' },
    { label: 'Option Two', value: 'option-two' },
  ] }
  onChange={ ( option ) => { setAttributes( { radio: option } ) } }
/>
```

In the component documentation, it uses `setState` to store the updated option. Here, I’m using `setAttributes`. In order to use `setAttributes` like this, it needs to be defined. At the top of the edit function, we can bring it in with the `radio` attribute we created.

`const { attributes: { radio }, setAttributes } = props;`

The last piece here is using the `radio` value in the block itself, both in the `edit` and `save` function. The attribute only stores the slug of the option selected, so we can check that value using a conditional statement.

```js
{ radio && radio === 'option-one' && (
  // set class name, include element, etc. here
)}
```

Strangely, most of this came together for me from reviewing the [InspectorControls component on GitHub](https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/inspector-controls). So, if you’re still missing a piece of this puzzle, or need a look at the bigger picture, that might be a good place to look.