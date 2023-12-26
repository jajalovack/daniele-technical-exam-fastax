import React from 'react'

interface Props {
    type: string,
    placeholder: string,
    increment: number,
    minValue: number,
    maxValue: number,
    value: string,
    onChange: React.FormEventHandler
}

const TextInput = (props: Props) => {
  const buildTextBox = (type: string, placeholder: string, increment: number, minValue: number, maxValue: number, value: string, onChange: React.FormEventHandler) => {
    if (type && ['text', 'email', 'password', 'number', 'date', 'datetime-local', 'url', 'month', 'time', 'week', 'tel'].includes(type.toLowerCase()))
    {
      return <input type={type} id={placeholder.toLowerCase().replace(' ','_')} placeholder={placeholder} step={increment} min={minValue} max={maxValue} value={value} onChange={onChange} className='rounded flex duration-300 border-2'></input>
    }
    return <input type='text' placeholder={placeholder} value={value} onChange={onChange} className='rounded flex duration-300 border-2'></input>
  }
  return (buildTextBox(props.type,props.placeholder,props.increment,props.minValue,props.maxValue,props.value,props.onChange))
}

TextInput.defaultProps = {
    type: 'Text',
    placeholder: 'Field Name',
    increment: 1,
    minValue: -Infinity,
    maxValue: Infinity
}

export default TextInput