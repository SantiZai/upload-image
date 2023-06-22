import { useState, useEffect } from 'react'

function App() {
  const [hasImage, setHasImage] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  const eventTypes: string[] = ['dragenter', 'dragover', 'dragleave', 'drop']

  const preventDefaults = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    const dropArea: HTMLElement = document.getElementById('drop-area')!
    const imageContainer: HTMLElement = document.getElementById('image-container')!

    const handleImg = (e: any) => {
      if (hasImage) return
      const file = e.dataTransfer.files[0]
      console.log(file)
      if (file && file.type.startsWith('image/')) {
        const imageURL = URL.createObjectURL(file)
        const imageElement = document.createElement('img')
        imageElement.src = imageURL
        imageElement.style.height = '100px'
        imageContainer.appendChild(imageElement)
        setImageSrc(imageURL)
        setHasImage(true)
      }
    }

    const copyImage = () => {
      if (hasImage) {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': imageSrc })
        ])
      }
    }

    eventTypes.forEach(evn => dropArea.addEventListener(evn, preventDefaults))
    dropArea.addEventListener('drop', handleImg)

    return () => {
      eventTypes.forEach(evn => dropArea.removeEventListener(evn, preventDefaults))
      dropArea.removeEventListener('drop', handleImg)
    }
  }, [hasImage]);

  return (
    <>
      <div id="drop-area" style={{ width: '500px', height: '500px', backgroundColor: 'gray' }}>
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <p>Upload a file</p>
          <input type="file" id="file" accept="image/*"></input>
          {
            hasImage ? (
              <>
                <button id='copy-button' style={{ visibility: 'hidden' }}>copy image</button>
              </>
            )
              : (
                <p>...or drop an image here</p>
              )
          }
          <div id='image-container'></div>
        </form>
      </div>
    </>
  )
}

export default App
