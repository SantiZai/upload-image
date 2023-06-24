import { useState, useEffect, useRef } from 'react'
import illustration from './assets/image.svg'
import check from './assets/check.svg'
import './app.css'

const DropComponent = () => {
    const [hasImage, setHasImage] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [link, setLink] = useState<string | undefined>('')
    const [loadingImage, setLoadingImage] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const preventDefaults = (e: any) => {
        e.preventDefault()
    }

    const shortText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            const short = text.slice(0, maxLength) + '...'
            return short
        }
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
            setLoadingImage(true)
            setTimeout(() => {
                setLoadingImage(false)
                setImageSrc(imageURL)
                setHasImage(true)
                setLink(shortText(imageURL, 30))
            }, 5000);
        }
    }

    useEffect(() => {
        const eventTypes: string[] = ['dragenter', 'dragover', 'dragleave', 'drop']
        const dropArea: HTMLElement = document.getElementById('drop-area')!

        if (dropArea) {
            eventTypes.forEach(evn => dropArea.addEventListener(evn, preventDefaults))
            return () => {
                eventTypes.forEach(evn => dropArea.removeEventListener(evn, preventDefaults))
            }
        }
    }, [hasImage])

    const copyImage = () => {
        if (hasImage) {
            navigator.clipboard.writeText(imageSrc)
        }
    }

    return (
        <div id='container-all'>

            {
                loadingImage ? (
                    <div id='container-loading'>
                        <h4>Uploading...</h4>
                        <div id='barra-cargando'>
                            <div id='progreso-barra'></div>
                        </div>
                    </div>
                )
                    :
                    (
                        hasImage ? (
                            <div id='shadow'>
                                <div id='container'>
                                    <div id='container-img'>
                                        <img src={check} style={{marginBottom: '-15px'}} />
                                        <h4>Uploaded Successfully!</h4>
                                        <img src={imageSrc} alt='Selected image' id='img-selected' />
                                        <div id='container-copy'>
                                            <label id='label-copy'>{link}</label>
                                            <button className='button' onClick={copyImage}>Copy link</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                            :
                            (
                                <div id='shadow'>
                                    <div id='container'>
                                        <h4>Upload your image</h4>
                                        <span>File should be jpeg, png...</span>
                                        <div id='drop-area' onDrop={handleImg}>
                                            <img id='illustration' src={illustration} />
                                            <p>Drag & Drop your image here</p>
                                        </div>
                                        <p>Or</p>
                                        <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImg} accept='.jpeg, .jpg, .png' />
                                        <button className='button' onClick={handleFileButtonClick}>Choose a file</button>
                                    </div>
                                </div>
                            )
                    )
            }
        </div>
    )
}

export default DropComponent