import { useState } from 'react'

const DropComponent = () => {
    const [hasImage, setHasImage] = useState(false)
    const [imageSrc, setImageSrc] = useState('')

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const copyImage = () => {

    }

    return (
        <>
            <div onDrop={handleDrop} 
            onDragEnter={e => e.preventDefault()} 
            onDragOver={e => e.preventDefault()}>
                {
                    hasImage ?
                    (
                        <>
                            <img src={imageSrc} alt='Dropped image' />
                            <button onClick={copyImage}>Copy image to clipboard</button>
                        </>
                    )
                    :
                    (
                        <>
                            <input type='file' />
                        </>
                    )
                }
            </div>
        </>
    )
}

export default DropComponent