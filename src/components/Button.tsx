import React from 'react'

interface Props {
  children: React.ReactNode,
  style: string,
  onClick: React.MouseEventHandler
}

const Button = (props: Props) => {
    const buttonStyle = (style: string): string => {
        if (style && style.toLowerCase()=='primary')
        {
            return 'bg-[#113283] hover:bg-[#1172c3] text-white border-[#113283] border-2 hover:border-[#1172c3]';
        }
        if (style && style.toLowerCase()=='secondary')
        {
            return 'bg-white hover:bg-[#1172c3] text-[#113283] hover:text-white border-[#113283] border-2 hover:border-[#1172c3]'
        }
        if (style && style.toLowerCase()=='header')
        {
            return 'bg-white hover:bg-[#1172c3] text-[#113283] hover:text-white border-[#113283] border-2 hover:border-[#1172c3]'
        }

        return ''
    }
  
  return (
    <>
      <button onClick={props.onClick} className={`rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-150 ${buttonStyle(props.style)}`}>{props.children}</button>
    </>
  )
}

Button.defaultProps = {
    style: 'primary',
    onClick: function () { alert('Add your onClick function using the onClick prop.') },
    children: 'Add button text as a child.'
}

export default Button