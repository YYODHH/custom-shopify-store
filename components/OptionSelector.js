import React, { useState, useEffect } from 'react'

export default function OptionSelector({ name, values, selectedOptions, setOptions, productInventory, selectedVariant }) {
  
  return (
    <fieldset className="mt-3">
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {
          values.map(value => {
            const id = `option-${name}-${value}`
            const checked = selectedOptions[name] === value

            return (
              <label key={id} htmlFor={id}>
                <input
                  className="sr-only"
                  type="radio"
                  id={id}
                  name={`option-${name}`}
                  value={value}
                  checked={checked}
                  onChange={() => {
                    setOptions(name, value)
                  }}
                />
                <div className={`p-1 mt-3 mb-3 text-md rounded-md block cursor-pointer mr-3 ${checked ? "text-white bg-violet-700" : "text-gray-900 bg-gray-100"}`}>
                  <span className="px-2">{value}</span>
                </div>
              </label>
            )
          })
        }
      </div>
    </fieldset>
  )
}