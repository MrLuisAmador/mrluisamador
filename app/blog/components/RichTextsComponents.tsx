import Image from  'next/image'
import urlFor from '../../../sanity/lib/urlFor'

export const RichTextsComponents = {
    types: {
        image: ({value}: any ) => {
            return (
                <div className="text-center pb-10">
                    <Image className="inline" src={urlFor(value).url()} alt="Blog Image" width={650} height={700} />
                </div>
            )
        }
    },
    block: {
        h2: ({children}: any) => {
            return (
                <h1 className="mb-[2px] text-2xl">{children}</h1>
            )
        },
        blockquote: ({children}: any) => {
            return (
                <blockquote className="">{children}</blockquote>
            )
        },
        normal: ({children}: any) => {
            return (
                <p className="mb-5 text-lg">{children}</p>
            )
        }
    },
    list: {
        number: ({children}: any) => {
            return (
                <ol className="mb-5 list-decimal pl-12">{children}</ol>
            )
        },
        bullet: ({children}: any) => {
            return (
                <ul className="mb-5 list-disc pl-12">{children}</ul>
            )
        }
    },  
    listItem: {
        number: ({children}: any) => {
            return (
                <li className="pb-4">{children}</li>
            )
        },
        bullet: ({children}: any) => {
            return (
                <li className="pb-4">{children}</li>
            )
        }
    },
    marks: {
        link: ({value, children}: any) => {
            // const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
            //   <a className="underline decoration-solid" href={value?.href} target={target} rel={target === '_blank' && 'noindex nofollow'}>
            //     {children}
            //   </a>
               <a className="underline decoration-solid" href={value?.href} target="_blank">{children}</a>
            )
          },
    }         
}
  