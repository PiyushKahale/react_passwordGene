import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [ length, setLength ] = useState(8);
  const [ numberAllow, setNumberAllow ] = useState(false);
  const [ charAllow, setCharAllow ] = useState(false);
  const [ password, setPassword ] = useState("");

  // useRef hook - 
  const passwordRef = useRef(null)

  // useCallback(fn, dependncies) - dependncies = function executes on changing parameters
  const passwordGenerator = useCallback( () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllow) str += "0123456789";
      if(charAllow) str += "!@#$%^&*(){}[]~`";

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        // to get char at "char"(idx)
        pass += str.charAt(char);
      }
      setPassword(pass);

    }, // dependncies passed in Arrays
    // Passed "setPassword" coz - Memoization for optimizations(optional)
      [length, numberAllow, charAllow, setPassword]
  ) 
  
  // useEffect hook - Runnig function from here 'passwordGenerator'
  useEffect(() => {
      passwordGenerator()
      // Passed "setPassword" to Rerender the component if any change happens
    }, [length, numberAllow, charAllow, passwordGenerator]
  )

  const copyToClipBoard = useCallback(() => {
    // to give user effect - that text is selected or not
    passwordRef.current ?.select()
    passwordRef.current ?.setSelectionRange()
    // passwordRef.current ?.setSelectionRange(0, 4) - select in range
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-2 mx-2'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden text-center mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        {/* to link button with input field */}
        {/* useRef - Kisi bhi chiz ka reference lena hota hai to "useRef" use krte hai */}
        <button 
        id='copyBtn'
        className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0' 
        onClick={copyToClipBoard}>
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2 items-center '>
        <div className='flex items-center gap-x-1 text-sm'>
          <input 
              type="range"
              min={8}
              max={100}
              className='cursor-pointer'
              value={length}
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 text-sm'>
          <input 
              type="checkbox"
              defaultChecked={numberAllow}
              id='numInput'
              value={length}
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 text-sm'>
          <input 
              type="checkbox"
              defaultChecked={charAllow}
              id='charInp'
              value={length}
              onChange={() => {
                // prev value ka access ke liye callback fire krte hai
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
