/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import  {Helmet, HelmetProvider}  from 'react-helmet-async'


const Title = ({title="Chat App", description="this is the chat app called chatu"}) => {
  return (
    <HelmetProvider>
<Helmet>
 
 <title>{title}</title>
 <meta name="description" content={description} />
 </Helmet>
    </HelmetProvider>
  )
}

export default Title