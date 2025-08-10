import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const PageNotFound = () => {
    return (
        <div className='w-full h-screen relative'>
            <div className='absolutecenter w-full h-full'>
                <DotLottieReact
                    src="/404 error.lottie"
                    loop
                    autoplay
                    muted
                // className='w-full h-full '
                />
            </div>
        </div>
    )
}

export default PageNotFound