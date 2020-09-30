import React,{ useState,useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hook/useLocalStorage'
function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setjs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 350)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    <div className ="pane top-pen">
      <Editor language="xml"
      displaytitle ="HTML" 
      value ={html} 
      onChange = {setHtml} 
      />
       <Editor language="css"
      displaytitle ="CSS" 
      value ={css} 
      onChange = {setCss} 
      />
       <Editor language="javascript"
      displaytitle ="JS" 
      value ={js} 
      onChange = {setjs} 
      />
    </div>
    <div className="pane">
        <iframe
         srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
