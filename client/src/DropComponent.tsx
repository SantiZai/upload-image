import { useState, useEffect, useRef } from 'react'
import illustration from './assets/image.svg'
import './app.css'

const DropComponent = () => {
    const [hasImage, setHasImage] = useState(false)
    const [imageSrc, setImageSrc] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileButtonClick = () => {
        if(fileInputRef.current) fileInputRef.current.click()
    }

    const preventDefaults = (e: any) => {
        e.preventDefault()
    }

    const handleImg = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (hasImage) return
        let file
        if (e.type == 'drop') {
            file = e.dataTransfer.files[0]
        } else {
            file = e.target.files[0]
        }
        if (file && file.type.startsWith('image/')) {
            const imageURL = URL.createObjectURL(file)
            setImageSrc(imageURL)
            setHasImage(true)
        }
    }

    useEffect(() => {
        const eventTypes: string[] = ['dragenter', 'dragover', 'dragleave', 'drop']
        const dropArea: HTMLElement = document.getElementById('drop-area')!

        eventTypes.forEach(evn => dropArea.addEventListener(evn, preventDefaults))

        return () => {
            eventTypes.forEach(evn => dropArea.removeEventListener(evn, preventDefaults))
        }
    }, [hasImage])

    const copyImage = () => {
        if (hasImage) {
            navigator.clipboard.writeText(imageSrc)
        }
    }

    return (
        <div id='container-all'>
            <div id='shadow'>
                <div id='container'>
                    <h4>Upload your image</h4>
                    <span>File should be jpeg, png...</span>
                    <div id='drop-area' onDrop={handleImg}>
                        {
                            hasImage ?
                                (
                                    <div id='container-img'>
                                        <img src={imageSrc} alt='Selected image' id='img-selected' />
                                        <button onClick={copyImage}>Copy image to clipboard</button>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <img id='illustration' src={illustration} />
                                        <p>Drag & Drop your image here</p>
                                    </>
                                )
                        }
                    </div>
                </div>
                <>
                    <p>Or</p>
                    <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImg} accept='.jpeg, .jpg, .png' />
                    <button id='button-file' onClick={handleFileButtonClick}>Choose a file</button>
                </>
            </div>
        </div>
    )
}

export default DropComponent