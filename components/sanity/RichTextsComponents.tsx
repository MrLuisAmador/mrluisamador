import Image from  'next/image'
import urlFor from '../../sanity/lib/urlFor'

export const RichTextsComponents = {
    types: {
        image: ({value}: any ) => {
            return (
                <Image src={urlFor(value).url()} alt="Hello" width={100} height={200} />
            )
        }
      },
  }
  